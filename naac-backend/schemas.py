from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    confidence: float
    sources: List[str]
    session_id: str
    response_time_ms: int

class DocumentUploadResponse(BaseModel):
    message: str
    document_id: int
    filename: str
    file_size: int
    cloud_storage_url: Optional[str]
    processing_status: str

class UserFeedback(BaseModel):
    query_id: int
    feedback: str  # 'positive' or 'negative'
    comments: Optional[str] = None

class SessionStats(BaseModel):
    session_id: str
    total_queries: int
    total_uploads: int
    first_activity: datetime
    last_activity: datetime
