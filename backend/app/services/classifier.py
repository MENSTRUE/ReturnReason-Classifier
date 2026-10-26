"""Real local IndoBERT inference. No fabricated predictions or calibrated probabilities."""
import json
from functools import lru_cache
from pathlib import Path
import threading
from ..core.settings import MODEL_DIR, MODEL_CONFIG, REVIEW_THRESHOLD, MAX_LENGTH

_lock = threading.Lock()
VALID = ('defect', 'late_delivery', 'missing_item', 'size', 'wrong_item')

def _runtime():
    import torch
    from transformers import AutoTokenizer, AutoModelForSequenceClassification
    return torch, AutoTokenizer, AutoModelForSequenceClassification

@lru_cache(maxsize=1)
def load_model():
    if not MODEL_DIR.joinpath('config.json').exists() or not MODEL_DIR.joinpath('model.safetensors').exists():
        raise FileNotFoundError(f'IndoBERT artifacts missing at {MODEL_DIR}. Copy Kaggle model into models/indobert.')
    if not MODEL_CONFIG.is_file():
        raise FileNotFoundError(f'Model config missing at {MODEL_CONFIG}')
    expected=json.loads(MODEL_CONFIG.read_text(encoding='utf-8'))['classes']
    if len(expected)!=5 or set(expected)!=set(VALID):
        raise ValueError(f'Unexpected project class schema: {expected}')
    torch, AutoTokenizer, AutoModelForSequenceClassification = _runtime()
    tokenizer=AutoTokenizer.from_pretrained(str(MODEL_DIR), local_files_only=True, use_fast=True)
    model=AutoModelForSequenceClassification.from_pretrained(str(MODEL_DIR), local_files_only=True, use_safetensors=True)
    model.eval()
    if model.config.num_labels != len(expected):
        raise ValueError('Checkpoint num_labels disagrees with model_config.json')
    # HF config id2label may be generic LABEL_0..4. Generic labels require
    # training label order evidence; never silently assume alphabetical order.
    labels=[str(model.config.id2label.get(i, '')) for i in range(len(expected))]
    if set(labels)==set(expected) and len(set(labels))==len(expected):
        classes=labels
    elif all(label==f'LABEL_{i}' for i,label in enumerate(labels)):
        # Notebook v3 writes explicit ordered project class list.
        # Review order against notebook before deploying a different checkpoint.
        classes=expected
    else:
        raise ValueError(f'Checkpoint labels {labels} differ from project labels {expected}. Verify mapping.')
    return torch,tokenizer,model,classes

def status():
    model_exists=MODEL_DIR.joinpath('model.safetensors').is_file()
    config_exists=MODEL_CONFIG.is_file()
    return {'status':'ok' if model_exists and config_exists else 'degraded',
            'model_available':bool(model_exists and config_exists),
            'model_loaded':load_model.cache_info().currsize>0,
            'model_name':'IndoBERT base p1',
            'inference':'local CPU compatible',
            'research_only':True}

def classify(text:str):
    clean=text.strip()
    if not clean:raise ValueError('Text must not be blank.')
    torch,tokenizer,model,classes=load_model()
    with _lock:
        encoded=tokenizer(clean,return_tensors='pt',truncation=True,max_length=MAX_LENGTH)
        with torch.inference_mode():
            logits=model(**encoded).logits[0]
            values=torch.softmax(logits,dim=-1).cpu().tolist()
    order=sorted(range(len(values)),key=lambda i:values[i],reverse=True)
    top=order[0]
    # Threshold is a provisional routing policy, NOT learned rejection.
    needs_review=values[top]<REVIEW_THRESHOLD
    return {'text':clean,'predicted_reason':classes[top],
            'display_label':classes[top].replace('_',' ').title(),
            'score':round(values[top],6),
            'scores':{classes[i]:round(float(values[i]),6) for i in range(len(classes))},
            'decision':'REVIEW' if needs_review else 'SUGGESTED',
            'manual_review_required':True,
            'review_reason':'low_top_score' if needs_review else 'human_confirmation_required',
            'confidence_is_calibrated':False,
            'disclaimer':'Scores are uncalibrated softmax outputs. Five-class synthetic-data research model; not validated on real customers. OTHER is not a trained class.'}
