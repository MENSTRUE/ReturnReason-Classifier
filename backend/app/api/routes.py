from fastapi import APIRouter, HTTPException
from ..schemas.prediction import PredictRequest, BatchRequest
from ..services.classifier import classify, status
router=APIRouter()
@router.get('/health')
def health(): return status()
@router.post('/predict')
def predict(payload:PredictRequest):
    try:return classify(payload.text)
    except ValueError as e:raise HTTPException(status_code=422,detail=str(e)) from e
    except (FileNotFoundError,ImportError,OSError) as e:raise HTTPException(status_code=503,detail=f'Model unavailable: {str(e)[:250]}') from e
@router.post('/batch')
def batch(payload:BatchRequest):
    if any(not t.strip() or len(t)>2500 for t in payload.texts):
        raise HTTPException(status_code=422,detail='Each text must contain 1–2500 non-whitespace characters.')
    try:return {'items':[classify(t) for t in payload.texts],'count':len(payload.texts)}
    except (FileNotFoundError,ImportError,OSError) as e:raise HTTPException(status_code=503,detail=f'Model unavailable: {str(e)[:250]}') from e
