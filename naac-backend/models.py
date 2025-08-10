from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import datetime

Base = declarative_base()

class UserQuery(Base):
    """Model to store user chat queries and responses"""
    __tablename__ = "user_queries"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), index=True)
    user_query = Column(Text, nullable=False)
    ai_response = Column(Text)
    confidence_score = Column(Float, default=0.0)
    response_time_ms = Column(Integer, default=0)
    sources_used = Column(Text)  # JSON string of sources
    user_feedback = Column(String(50))  # 'positive', 'negative', or null
    ip_address = Column(String(45))
    user_agent = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

class UploadedDocument(Base):
    """Model to store information about uploaded documents"""
    __tablename__ = "uploaded_documents"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), index=True)
    original_filename = Column(String(500), nullable=False)
    stored_filename = Column(String(500), nullable=False)
    file_size = Column(Integer, nullable=False)
    file_type = Column(String(100), nullable=False)
    cloud_storage_url = Column(String(1000))
    cloud_storage_key = Column(String(500))
    processing_status = Column(String(50), default='uploaded')  # uploaded, processing, processed, failed
    processing_error = Column(Text)
    chunks_created = Column(Integer, default=0)
    vectors_stored = Column(Integer, default=0)
    ip_address = Column(String(45))
    user_agent = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

class UserSession(Base):
    """Model to track user sessions"""
    __tablename__ = "user_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), unique=True, index=True)
    ip_address = Column(String(45))
    user_agent = Column(String(500))
    total_queries = Column(Integer, default=0)
    total_uploads = Column(Integer, default=0)
    first_activity = Column(DateTime, server_default=func.now())
    last_activity = Column(DateTime, onupdate=func.now())
    is_active = Column(Boolean, default=True)
