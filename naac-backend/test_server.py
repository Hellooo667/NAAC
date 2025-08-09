#!/usr/bin/env python3
"""
Simple test server to verify the NAAC chat functionality
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from datetime import datetime
import json

app = FastAPI(title="NAAC Test API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    session_id: str
    message: str

def generate_naac_response(message: str) -> str:
    """Generate contextual NAAC responses"""
    message_lower = message.lower()
    
    if any(word in message_lower for word in ["criteria", "criterion"]):
        return """NAAC evaluates institutions based on 7 key criteria:

**1. Curricular Aspects (Criterion I)**
- Curriculum design and development
- Academic flexibility and student choice

**2. Teaching-Learning and Evaluation (Criterion II)**  
- Student enrollment and profile
- Teaching-learning process and assessment

**3. Research, Innovations and Extension (Criterion III)**
- Research promotion and facilitation
- Innovation ecosystem and startup support

**4. Infrastructure and Learning Resources (Criterion IV)**
- Physical and academic support facilities
- IT infrastructure and library resources

**5. Student Support and Progression (Criterion V)**
- Student mentoring and support services
- Student progression and outcomes

**6. Governance, Leadership and Management (Criterion VI)**
- Institutional governance and administration
- Financial management and resource mobilization

**7. Institutional Values and Best Practices (Criterion VII)**
- Gender equity and environmental consciousness
- Best practices and institutional social responsibility

Which specific criterion would you like detailed guidance on?"""

    elif "ssr" in message_lower:
        return """The Self Study Report (SSR) is crucial for NAAC assessment:

**SSR Structure:**
- Executive Summary
- Institutional Profile  
- Extended Profile (Quantitative Data)
- Qualitative Analysis for all 7 Criteria
- Supporting Documents

**Preparation Guidelines:**
1. Collect 3 years of institutional data
2. Ensure data accuracy and verification
3. Provide evidence-based responses
4. Include stakeholder feedback
5. Follow NAAC format strictly

Need specific guidance on any SSR section?"""

    elif any(word in message_lower for word in ["research", "innovation"]):
        return """Research, Innovation and Extension (Criterion III):

**Research Promotion:**
- Research policy and infrastructure
- Funding support and seed money
- Research publications and patents
- Collaborative research projects

**Key Metrics:**
- Publications per faculty
- External funding received
- Patents filed and granted
- Community programs conducted

Need specific research documentation guidance?"""

    else:
        return f"""Thank you for your question: "{message}"

**I can help you with:**
- All 7 NAAC criteria guidance
- SSR preparation assistance  
- Documentation requirements
- Best practices identification
- Quality improvement strategies

Please ask specific questions about NAAC criteria, SSR, or accreditation processes!"""

@app.get("/")
async def root():
    return {"message": "NAAC AI Assistant is working!", "status": "operational"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/chat/message")
async def chat_message(chat_data: ChatMessage):
    try:
        response = generate_naac_response(chat_data.message)
        return {
            "response": response,
            "confidence": 0.95,
            "sources": ["NAAC Manual", "Best Practices"],
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "response": f"Error: {str(e)}",
            "confidence": 0.0,
            "sources": []
        }

@app.get("/api/analytics/dashboard")
async def dashboard():
    return {
        "documentsProcessed": 25,
        "queriesHandled": 150,
        "reportsGenerated": 8,
        "criteriaCompleted": 5,
        "systemStatus": "operational"
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 NAAC AI Assistant Test Server Starting...")
    print("📊 Access: http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
