# backend/main.py
from fastapi import FastAPI, HTTPException, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union
from datetime import datetime
import importlib
import json
import os
import traceback
import inspect
import uuid


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
app = FastAPI(title="AI Care Backend", version="1.0.2")

# ----- CORS -----
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    os.getenv("FRONTEND_ORIGIN", "").strip() or "",
]
ALLOWED_ORIGINS = [o for o in ALLOWED_ORIGINS if o]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- 카카오 라우터 -----
app.include_router(kakao_router)

# ==============================
# 스키마
# ==============================
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None  # 없으면 "web"

class AnalyzePdfRequest(BaseModel):
    pdf_path: str

class ParseByDateRequest(BaseModel):
    text: str

class CompareChangesRequest(BaseModel):
    prev_text: str
    curr_text: str

# ==============================
# 공용
# ==============================
@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.now().isoformat()}

@app.get("/")
def root():
    front = os.getenv("FRONTEND_REDIRECT_URL", "http://localhost:3000/")
    return RedirectResponse(front)

# ==============================
# 챗봇
# ==============================
@app.post("/chat")
def chat(req: ChatRequest):
    """
    요청(JSON):
      { "message": "안녕", "session_id": "demo-session" }  # session_id는 선택
    응답(JSON):
      { "ok": true, "reply": "..." }
    """
    try:
        session_id = (req.session_id or "web").strip() or "web"
        reply_text = get_emotional_support_response(
            session_id=session_id,     # ✅ 이름 맞춤
            user_input=req.message     # ✅ 이름 맞춤
        )
        return {"ok": True, "reply": reply_text}
    except Exception as e:
        # 서버 콘솔에 스택트레이스 출력(디버그 도움)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"chat failed: {e}")

# ==============================
# PDF 분석/간호기록 파싱
# ==============================
@app.post("/analyze-pdf")
def analyze_pdf(req: AnalyzePdfRequest):
    try:
        text = extract_text_from_pdf(req.pdf_path)
        by_date = parse_by_date(text)
        notes_json = build_nursing_notes_json(req.pdf_path)
        return {"ok": True, "by_date": by_date, "notes": notes_json}
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"analyze-pdf failed: {e}")

@app.post("/parse-by-date")
def parse_by_date_api(req: ParseByDateRequest):
    try:
        by_date = parse_by_date(req.text)
        return {"ok": True, "by_date": by_date}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"parse-by-date failed: {e}")

@app.post("/compare-changes")
def compare_changes_api(req: CompareChangesRequest):
    try:
        diff_text = compare_changes_with_text(req.prev_text, req.curr_text)
        return {"ok": True, "diff": diff_text}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"compare-changes failed: {e}")


# ==============================
# 환자ID → PDF 매핑 & 경로 헬퍼
# ==============================
PATIENT_PDFS: Dict[str, str] = {
    "25-0000032": "uploads/김x애-간호기록지.pdf",
    # 필요 시 계속 추가
    # "23-0000009": "uploads/장x규-간호기록지.pdf",
}

def _abs_path(rel_or_abs: str) -> str:
    """backend 기준 절대경로로 변환"""
    base = os.path.dirname(os.path.abspath(__file__))
    return rel_or_abs if os.path.isabs(rel_or_abs) else os.path.join(base, rel_or_abs)

# ==============================
# 환자 간호기록 라우트
# ==============================
@app.get("/patients/{patient_id}/nursing-notes")
def get_nursing_notes(patient_id: str):
    rel_path = PATIENT_PDFS.get(patient_id)
    if not rel_path:
        raise HTTPException(status_code=404, detail=f"등록된 PDF가 없습니다: {patient_id}")

    full_path = _abs_path(rel_path)
    if not os.path.exists(full_path):
        raise HTTPException(status_code=404, detail=f"PDF 파일이 없습니다: {full_path}")

    # JSON 형태 간호기록
    notes_json = build_nursing_notes_json(full_path)
    # 날짜별 원문 파싱(옵션: 프론트에서 날짜 드롭다운/원문 하이라이트 등에 활용)
    text = extract_text_from_pdf(full_path)
    by_date = parse_by_date(text)

    return {
        "ok": True,
        "patient_id": patient_id,
        "resolved_path": full_path,
        "by_date": by_date,
        "notes": notes_json,
    }
