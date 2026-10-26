from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.settings import ALLOWED_ORIGINS
from .api.routes import router
app=FastAPI(title='ReturnReason Classifier',version='0.1.0',description='Experimental Indonesian returns-classification API. Not validated on real customers.')
app.add_middleware(CORSMiddleware,allow_origins=ALLOWED_ORIGINS,allow_methods=['GET','POST'],allow_headers=['*'])
app.include_router(router,prefix='/api/v1')
