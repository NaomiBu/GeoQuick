import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
from typing import List, Optional


class Country(BaseModel):
    name: str
    languages: Optional[List[str]]  
    capital: Optional[str]  

app = FastAPI(debug=True)


origins = [
    "http://localhost:5173", 
    "https://geoquick.netlify.app", 
    "https://geoquick.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/countries/{country_name}", response_model=Country)
def get_country_info(country_name: str):
    try:
        
        url = f"https://restcountries.com/v3.1/name/{country_name}"
        response = requests.get(url)
        data = response.json()
        
        
        languages = list(data[0]["languages"].values()) if "languages" in data[0] else []
        capital = data[0].get("capital", ["Not available"])[0] 
        
        return Country(
            name=data[0]["name"]["common"],
            languages=languages,
            capital=capital
        )
    except Exception as e:
        return {"error": "Country not found or invalid name."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
