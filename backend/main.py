# backend/main.py
from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse, JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, date
import os

# ===== 카카오 라우터 임포트 (패키지/단일파일 실행 모두 지원) =====
try:
    # 패키지 실행: uvicorn backend.main:app --reload
    from .auth_kakao import router as kakao_router  # type: ignore
except ImportError:
    # 디렉토리에서 직접 실행: (cd backend && uvicorn main:app --reload)
    from auth_kakao import router as kakao_router  # type: ignore

# ===== 프로젝트 내부 모듈 =====
try:
    from .chatbot_core import get_emotional_support_response  # type: ignore
    from .ocr_records import (  # type: ignore
        extract_text_from_pdf,
        parse_by_date,
        compare_changes_with_text,
        build_nursing_notes_json,
    )
except ImportError:
    # 단일파일 실행 경로 호환
    from chatbot_core import get_emotional_support_response
    from ocr_records import (
        extract_text_from_pdf,
        parse_by_date,
        compare_changes_with_text,
        build_nursing_notes_json,
    )

# ==============================
# FastAPI App
# ==============================
app = FastAPI(title="AI Care Backend", version="1.0.0")

# ----- CORS -----
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    # "http://127.0.0.1:3000",
    os.getenv("FRONTEND_ORIGIN", "").strip() or "",  # 배포 시 환경변수로 추가
]
ALLOWED_ORIGINS = [o for o in ALLOWED_ORIGINS if o]  # 빈 값 제거

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS or ["*"],  # 필요 시 제한
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- 카카오 로그인/로그아웃/연결해제 라우터 등록 -----
app.include_router(kakao_router)

# ==============================
# 모델 정의 (요청/응답 스키마)
# ==============================
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = None  # {"role":"user/assistant","content":"..."}

class AnalyzePdfRequest(BaseModel):
    pdf_path: str  # 백엔드 기준 상대/절대 경로

class ParseByDateRequest(BaseModel):
    text: str

class CompareChangesRequest(BaseModel):
    prev_text: str
    curr_text: str

# ==============================
# 공용 유틸/헬스체크
# ==============================
@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.now().isoformat()}

# 홈 리다이렉트(선택)
@app.get("/")
def root():
    # 필요 없으면 삭제해도 됨
    front = os.getenv("FRONTEND_REDIRECT_URL", "http://localhost:3000/")
    return RedirectResponse(front)

# ==============================
# 챗봇 엔드포인트
# ==============================
@app.post("/chat")
def chat(req: ChatRequest):
    """
    감정케어/일반 챗 응답
    """
    try:
        reply = get_emotional_support_response(req.message, history=req.history)
        return {"ok": True, "reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"chat failed: {e}")

# ==============================
# PDF 분석/간호기록 파싱 엔드포인트
# ==============================
@app.post("/analyze-pdf")
def analyze_pdf(req: AnalyzePdfRequest):
    """
    PDF -> 텍스트 -> 날짜별 파싱 결과 반환
    """
    try:
        text = extract_text_from_pdf(req.pdf_path)
        by_date = parse_by_date(text)
        notes_json = build_nursing_notes_json(by_date)
        return {"ok": True, "by_date": by_date, "notes": notes_json}
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"analyze-pdf failed: {e}")

@app.post("/parse-by-date")
def parse_by_date_api(req: ParseByDateRequest):
    """
    텍스트를 날짜별로 파싱
    """
    try:
        by_date = parse_by_date(req.text)
        return {"ok": True, "by_date": by_date}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"parse-by-date failed: {e}")

@app.post("/compare-changes")
def compare_changes_api(req: CompareChangesRequest):
    """
    전/후 텍스트 비교로 변화점 요약
    """
    try:
        diff_text = compare_changes_with_text(req.prev_text, req.curr_text)
        return {"ok": True, "diff": diff_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"compare-changes failed: {e}")
