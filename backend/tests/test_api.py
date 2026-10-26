import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from fastapi.testclient import TestClient
from app.main import app
from app.services import classifier
client=TestClient(app)
def test_health():
    r=client.get('/api/v1/health')
    assert r.status_code==200
    assert 'model_available' in r.json()
def test_empty_rejected():
    r=client.post('/api/v1/predict',json={'text':''})
    assert r.status_code==422
def test_batch_empty_rejected():
    assert client.post('/api/v1/batch',json={'texts':[]}).status_code==422
def test_prediction_contract(monkeypatch):
    monkeypatch.setattr(classifier,'classify',lambda text:{'text':text,'predicted_reason':'size','decision':'SUGGESTED','manual_review_required':True})
    r=client.post('/api/v1/predict',json={'text':'Sepatu ini kekecilan'})
    assert r.status_code==200
    assert r.json()['predicted_reason']=='size'
    assert r.json()['manual_review_required']
def test_batch_contract(monkeypatch):
    monkeypatch.setattr(classifier,'classify',lambda text:{'text':text,'manual_review_required':True})
    r=client.post('/api/v1/batch',json={'texts':['Barang rusak','Barang tertukar']})
    assert r.status_code==200 and r.json()['count']==2
