from unittest.mock import AsyncMock, patch
from fastapi import HTTPException, status
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


@patch("app.fetch_rates", new_callable=AsyncMock)
def test_analytics_success(mock_fetch):
    mock_fetch.return_value = {"EUR": 0.9, "GBP": 0.8, "JPY": 150.0}

    response = client.get("/analytics?base=USD&symbols=EUR&symbols=GBP&symbols=JPY")

    assert response.status_code == 200
    data = response.json()
    assert data["base_currency"] == "USD"
    assert data["strongest"]["currency"] == "GBP"
    assert data["weakest"]["currency"] == "JPY"


def test_analytics_invalid_base():
    response = client.get("/analytics?base=INVALID")

    assert response.status_code == 422


@patch("app.fetch_rates", new_callable=AsyncMock)
def test_analytics_no_rates(mock_fetch):
    mock_fetch.return_value = {}

    response = client.get("/analytics?base=USD")

    assert response.status_code == 404
    assert response.json()["detail"] == "No rates returned"


@patch("app.fetch_rates", new_callable=AsyncMock)
def test_analytics_api_connection_error(mock_fetch):
    mock_fetch.side_effect = HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="Could not connect to the external API server.",
    )

    response = client.get("/analytics?base=USD")

    assert response.status_code == 502