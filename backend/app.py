import os
from dotenv import load_dotenv
from fastapi import FastAPI, Query, HTTPException, status
from pydantic import Field
from typing import List, Annotated
import httpx
import pandas as pd


load_dotenv()
app = FastAPI()

API_URL = os.getenv("API_URL", "https://api.frankfurter.dev/v1/latest")
CurrencyCode = Annotated[str, Field(min_length=3, max_length=3)]

async def fetch_rates(url):
  async with httpx.AsyncClient() as client:
    try:
      response = await client.get(url)
      response.raise_for_status()
      data = response.json()
      return data.get("rates", {})
    except httpx.HTTPStatusError as exc:
      raise HTTPException(
        status_code=exc.response.status_code,
        detail=f"External API error: {exc.response.text}"
      )
    except httpx.RequestError:
      raise HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="Could not connect to the external API server."
      )

@app.get("/analytics")
async def get_analytics(
  base: str = Query(default="USD", min_length=3, max_length=3),
  symbols: List[CurrencyCode] = Query(default=["EUR", "GBP", "CAD", "JPY"])
):
  symbols_str = ",".join(symbols).upper()
  request_url = f"{API_URL}?base={base.upper()}&symbols={symbols_str}"
  rates = await fetch_rates(request_url)

  if not rates:
    raise HTTPException(status_code=404, detail="No rates returned")
  
  series = pd.Series(rates).sort_values()

  return {
    "base_currency": base.upper(),
    "strongest": {"currency": series.idxmin(), "rate": float(series.min())},
    "weakest": {"currency": series.idxmax(), "rate": float(series.max())},
    "average_rate": float(series.mean()),
    "sorted_rates": series.to_dict()
  }

    





