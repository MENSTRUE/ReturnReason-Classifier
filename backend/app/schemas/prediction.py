from pydantic import BaseModel, Field
class PredictRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2500)
class BatchRequest(BaseModel):
    texts: list[str] = Field(min_length=1, max_length=20)
