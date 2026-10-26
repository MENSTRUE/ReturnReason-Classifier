
"""Request validation schemas."""

from pydantic import BaseModel, Field, field_validator


class PredictRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=2500,
    )

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Text must not be blank.")

        return value


class BatchRequest(BaseModel):
    texts: list[str] = Field(
        min_length=1,
        max_length=20,
    )

    @field_validator("texts")
    @classmethod
    def validate_texts(cls, values: list[str]) -> list[str]:
        cleaned = []

        for value in values:
            text = value.strip()

            if not text:
                raise ValueError(
                    "Batch contains an empty message."
                )

            if len(text) > 2500:
                raise ValueError(
                    "Each message must be 2500 characters or fewer."
                )

            cleaned.append(text)

        return cleaned
