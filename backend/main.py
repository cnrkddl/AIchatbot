from fastapi import FastAPI
from pydantic import BaseModel
from chatbot_core import get_emotional_support_response

app = FastAPI()

class UserInput(BaseModel):
    user_input: str

@app.get("/")
def root():
    return {"message": "챗봇 API 정상 동작 중"}

@app.post("/chat")
def chat_endpoint(data: UserInput):
    reply = get_emotional_support_response(data.user_input)
    return {"response": reply}
