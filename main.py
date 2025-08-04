from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from typing import List, Dict, Any
from datetime import datetime

app = FastAPI(
    title="NAAC AI Assistant API",
    description="Backend API for NAAC accreditation AI assistant",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "http://localhost:3001",  # Alternative local port
        "https://your-frontend-url.onrender.com",  # Production frontend URL
        "*"  # Allow all for development (remove in production)
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "NAAC AI Assistant Backend", "status": "running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "NAAC AI Assistant API is running"}

# Basic API endpoints for frontend integration
@app.get("/api/health/services")
async def check_services():
    return {
        "services": {
            "granite": {"status": "ready"},
            "pinecone": {"status": "ready"},
            "watson_nlp": {"status": "ready"},
            "cloud_storage": {"status": "ready"},
        }
    }

@app.post("/api/chat/message")
async def chat_message(message_data: Dict[str, Any]):
    return {
        "response": "Hello! This is a placeholder response from your NAAC AI Assistant. Backend integration is ready!",
        "confidence": 0.95,
        "sources": [],
        "timestamp": str(datetime.utcnow())
    }

@app.post("/api/documents/upload")
async def upload_document():
    return {"message": "Document upload endpoint ready", "status": "success"}

@app.get("/api/analytics/dashboard")
async def dashboard_analytics():
    return {
        "documentsProcessed": 42,
        "queriesHandled": 156,
        "reportsGenerated": 8,
        "criteriaCompleted": 5
    }

@app.get("/api/criteria/progress")
async def criteria_progress():
    return {
        "progress": {
            "1": 85,
            "2": 72,
            "3": 90,
            "4": 68,
            "5": 75,
            "6": 88,
            "7": 82
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
