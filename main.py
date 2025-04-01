from typing import Union
from fastapi import FastAPI
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
XAI_API_KEY = os.environ.get("API_KEY")

app = FastAPI()
client = OpenAI(base_url="https://api.x.ai/v1", api_key=XAI_API_KEY)

async def imageGenerate(query: str):
    response = client.images.generate(
    model="grok-2-image",
    prompt=query    
    )
    return response.data[0]

@app.get("/")
async def read_root():
    return {"hello": "world"}

@app.get("/genImage")
async def genImage(query: str):
    res = await imageGenerate(query)
    return res
