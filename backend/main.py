from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot_core import get_emotional_support_response

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 리액트 앱의 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "챗봇 API 정상 동작 중"}

class UserInput(BaseModel):
    session_id: str
    user_input: str

@app.post("/chat")
def chat_endpoint(data: UserInput):
    reply = get_emotional_support_response(
        session_id=data.session_id,
        user_input=data.user_input
    )
    return {"response": reply}