
"""API contract tests for ReturnReason Classifier.

These tests mock model inference to avoid loading the large IndoBERT
checkpoint. Real checkpoint inference must be tested separately.
"""

import sys
from pathlib import Path
from unittest.mock import patch

from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/api/v1/health")

    assert response.status_code == 200

    data = response.json()

    assert "status" in data
    assert "model_available" in data
    assert "model_loaded" in data
    assert "research_only" in data


def test_empty_rejected():
    response = client.post(
        "/api/v1/predict",
        json={"text": ""},
    )

    assert response.status_code == 422


def test_batch_empty_rejected():
    response = client.post(
        "/api/v1/batch",
        json={"texts": []},
    )

    assert response.status_code == 422


def test_prediction_contract():
    mock_result = {
        "text": "Sepatu ini kekecilan",
        "predicted_reason": "size",
        "display_label": "Size",
        "score": 0.95,
        "scores": {
            "defect": 0.01,
            "late_delivery": 0.01,
            "missing_item": 0.01,
            "size": 0.95,
            "wrong_item": 0.02,
        },
        "decision": "SUGGESTED",
        "manual_review_required": True,
        "review_reason": "human_confirmation_required",
        "confidence_is_calibrated": False,
    }

    with patch(
        "app.api.routes.classify",
        return_value=mock_result,
    ) as mock_classify:

        response = client.post(
            "/api/v1/predict",
            json={"text": "Sepatu ini kekecilan"},
        )

    assert response.status_code == 200

    data = response.json()

    assert data["predicted_reason"] == "size"
    assert data["manual_review_required"] is True
    assert data["confidence_is_calibrated"] is False
    assert data["decision"] == "SUGGESTED"

    mock_classify.assert_called_once_with(
        "Sepatu ini kekecilan"
    )


def test_batch_contract():
    def mock_inference(text):
        return {
            "text": text,
            "predicted_reason": "defect",
            "manual_review_required": True,
        }

    with patch(
        "app.api.routes.classify",
        side_effect=mock_inference,
    ) as mock_classify:

        response = client.post(
            "/api/v1/batch",
            json={
                "texts": [
                    "Barang rusak",
                    "Barang tertukar",
                ]
            },
        )

    assert response.status_code == 200

    data = response.json()

    assert data["count"] == 2
    assert len(data["items"]) == 2
    assert mock_classify.call_count == 2


def test_batch_limit_rejected():
    response = client.post(
        "/api/v1/batch",
        json={
            "texts": ["Barang rusak"] * 21
        },
    )

    assert response.status_code == 422


def test_whitespace_rejected():
    response = client.post(
        "/api/v1/predict",
        json={"text": "   "},
    )

    assert response.status_code == 422
