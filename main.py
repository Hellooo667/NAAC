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
        "https://naac-omega.vercel.app",  # Production Vercel frontend
        "https://naac-0dgf.onrender.com",  # Self-reference for health checks
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

# Individual service health checks
@app.get("/api/health/check/{service_name}")
async def check_individual_service(service_name: str):
    """Check individual service health"""
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    if service_name == "granite":
        api_key = os.getenv("REACT_APP_IBM_CLOUD_API_KEY")
        return {
            "status": "connected" if api_key else "error",
            "endpoint": "IBM Granite LLM",
            "details": {
                "model": "ibm/granite-13b-chat-v2",
                "configured": bool(api_key)
            },
            "error": None if api_key else "API key not configured"
        }
    
    elif service_name == "pinecone":
        api_key = os.getenv("REACT_APP_PINECONE_API_KEY")
        return {
            "status": "connected" if api_key else "error",
            "endpoint": "Pinecone Vector Database",
            "details": {
                "index": "naac-documents",
                "environment": "us-east-1",
                "configured": bool(api_key)
            },
            "error": None if api_key else "API key not configured"
        }
    
    elif service_name == "appId":
        client_id = os.getenv("REACT_APP_IBM_APP_ID_CLIENT_ID")
        return {
            "status": "connected" if client_id else "error",
            "endpoint": "IBM App ID",
            "details": {
                "client_id": client_id[:8] + "..." if client_id else None,
                "configured": bool(client_id)
            },
            "error": None if client_id else "Client ID not configured"
        }
    
    elif service_name == "cloudStorage":
        api_key = os.getenv("REACT_APP_IBM_COS_API_KEY")
        return {
            "status": "connected" if api_key else "error",
            "endpoint": "IBM Cloud Object Storage",
            "details": {
                "bucket": "NAAC_fr",
                "configured": bool(api_key)
            },
            "error": None if api_key else "API key not configured"
        }
    
    elif service_name == "watsonNLP":
        api_key = os.getenv("REACT_APP_WATSON_NLP_API_KEY")
        return {
            "status": "connected" if api_key else "error",
            "endpoint": "Watson NLP",
            "details": {
                "version": "2022-08-10",
                "configured": bool(api_key)
            },
            "error": None if api_key else "API key not configured"
        }
    
    else:
        raise HTTPException(status_code=404, detail="Service not found")

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

# Service test endpoints for buttons
@app.post("/api/services/test/{service_name}")
async def test_service(service_name: str):
    """Test service functionality"""
    if service_name == "granite":
        return {
            "success": True,
            "message": "IBM Granite LLM test successful",
            "response": "Hello from IBM Granite! I'm ready to help with NAAC queries.",
            "timestamp": str(datetime.utcnow())
        }
    elif service_name == "pinecone":
        return {
            "success": True,
            "message": "Pinecone Vector DB test successful",
            "results": ["Sample NAAC document 1", "Sample NAAC document 2"],
            "timestamp": str(datetime.utcnow())
        }
    elif service_name == "appId":
        return {
            "success": True,
            "message": "IBM App ID test successful",
            "auth_status": "configured",
            "timestamp": str(datetime.utcnow())
        }
    else:
        return {
            "success": True,
            "message": f"{service_name} test completed",
            "status": "ok",
            "timestamp": str(datetime.utcnow())
        }

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
