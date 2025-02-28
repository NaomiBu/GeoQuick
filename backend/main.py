import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
from typing import List, Optional

# Model for Country
class Country(BaseModel):
    name: str
    languages: Optional[List[str]]  # List of languages spoken in the country
    capital: Optional[str]  # Capital city of the country

app = FastAPI(debug=True)

# Allow cross-origin requests from the front-end
origins = [
    "http://localhost:5173",  # Adjust this to match your front-end URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to get country info and languages from an external API
@app.get("/countries/{country_name}", response_model=Country)
def get_country_info(country_name: str):
    try:
        # Use REST Countries API to fetch country data
        url = f"https://restcountries.com/v3.1/name/{country_name}"
        response = requests.get(url)
        data = response.json()
        
        # Extract the languages, capital city, and country name
        languages = list(data[0]["languages"].values()) if "languages" in data[0] else []
        capital = data[0].get("capital", ["Not available"])[0]  # Handle cases where capital is not available
        
        return Country(
            name=data[0]["name"]["common"],
            languages=languages,
            capital=capital
        )
    except Exception as e:
        return {"error": "Country not found or invalid name."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
