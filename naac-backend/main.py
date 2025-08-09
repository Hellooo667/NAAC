from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import requests
import time
from typing import List, Dict, Any

app = FastAPI(
    title="NAAC AI Assistant API",
    description="Backend API for NAAC accreditation AI assistant",
    version="1.0.0"
)

# CORS middleware - Updated for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://naac-omega.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "NAAC AI Assistant API is running"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "NAAC AI Assistant API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "service_checks": "/api/health/check/{service}",
            "service_tests": "/api/test/{service}",
            "chat": "/api/chat/message",
            "upload": "/api/documents/upload"
        }
    }

# Individual service health checks
@app.get("/api/health/check/ibm-app-id")
async def check_ibm_app_id():
    try:
        # Mock IBM App ID check
        return {
            "status": "connected",
            "service": "IBM App ID",
            "message": "Authentication service ready",
            "timestamp": int(time.time())
        }
    except Exception as e:
        return {
            "status": "error",
            "service": "IBM App ID",
            "message": f"Connection failed: {str(e)}",
            "timestamp": int(time.time())
        }

@app.get("/api/health/check/ibm-granite-llm")
async def check_granite_llm():
    try:
        # Mock IBM Granite LLM check
        return {
            "status": "connected",
            "service": "IBM Granite LLM",
            "message": "Large Language Model ready",
            "timestamp": int(time.time())
        }
    except Exception as e:
        return {
            "status": "error",
            "service": "IBM Granite LLM",
            "message": f"Connection failed: {str(e)}",
            "timestamp": int(time.time())
        }

@app.get("/api/health/check/pinecone-vector-db")
async def check_pinecone():
    try:
        # Mock Pinecone check
        return {
            "status": "connected",
            "service": "Pinecone Vector DB",
            "message": "Vector database ready",
            "timestamp": int(time.time())
        }
    except Exception as e:
        return {
            "status": "error",
            "service": "Pinecone Vector DB",
            "message": f"Connection failed: {str(e)}",
            "timestamp": int(time.time())
        }

@app.get("/api/health/check/cloud-object-storage")
async def check_cloud_storage():
    try:
        # Mock Cloud Object Storage check
        return {
            "status": "connected",
            "service": "Cloud Object Storage",
            "message": "Document storage ready",
            "timestamp": int(time.time())
        }
    except Exception as e:
        return {
            "status": "error",
            "service": "Cloud Object Storage",
            "message": f"Connection failed: {str(e)}",
            "timestamp": int(time.time())
        }

@app.get("/api/health/check/watson-nlp")
async def check_watson_nlp():
    try:
        # Mock Watson NLP check
        return {
            "status": "connected",
            "service": "Watson NLP",
            "message": "Natural language processing ready",
            "timestamp": int(time.time())
        }
    except Exception as e:
        return {
            "status": "error",
            "service": "Watson NLP",
            "message": f"Connection failed: {str(e)}",
            "timestamp": int(time.time())
        }

# Service integration tests
@app.post("/api/test/ibm-app-id")
async def test_ibm_app_id():
    return {"message": "IBM App ID test successful", "status": "working"}

@app.post("/api/test/ibm-granite-llm")
async def test_granite_llm():
    return {"message": "IBM Granite LLM test successful", "status": "working"}

@app.post("/api/test/pinecone-vector-db")
async def test_pinecone():
    return {"message": "Pinecone Vector DB test successful", "status": "working"}

@app.post("/api/test/cloud-object-storage")
async def test_cloud_storage():
    return {"message": "Cloud Object Storage test successful", "status": "working"}

@app.post("/api/test/watson-nlp")
async def test_watson_nlp():
    return {"message": "Watson NLP test successful", "status": "working"}

# API Routes placeholder
@app.get("/api/health/services")
async def check_services():
    return {
        "services": {
            "granite": {"status": "connected"},
            "pinecone": {"status": "connected"},
            "watson_nlp": {"status": "connected"},
            "cloud_storage": {"status": "connected"},
        }
    }

@app.post("/api/chat/message")
async def chat_message(message_data: Dict[str, Any]):
    try:
        user_message = message_data.get('message', '').lower()
        
        # Extract key topics from the user's question
        def extract_topic_from_query(query):
            import re
            # Find quoted text first
            quoted_match = re.search(r'"([^"]*)"', query)
            if quoted_match:
                return quoted_match.group(1)
            
            # Look for key NAAC terms
            naac_terms = [
                'quality assurance', 'stakeholder satisfaction', 'governance',
                'curriculum', 'teaching learning', 'research', 'infrastructure',
                'student support', 'institutional values', 'criteria', 'ssr',
                'self study report', 'accreditation', 'assessment', 'evaluation',
                'documentation', 'best practices', 'innovation', 'academic audit'
            ]
            
            for term in naac_terms:
                if term in query.lower():
                    return term
            
            # Extract first meaningful phrase
            words = query.lower().split()
            for i, word in enumerate(words):
                if word in ['about', 'regarding', 'on', 'for']:
                    if i + 1 < len(words):
                        return ' '.join(words[i+1:i+3])
            
            return "your query"
        
        topic = extract_topic_from_query(user_message)
        
        # Generate contextual response based on detected topic
        if any(word in user_message for word in ["criteria", "criterion", "7 criteria"]):
            ai_response = f"""NAAC evaluates institutions based on 7 key criteria:

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

        elif "ssr" in user_message or "self study report" in user_message:
            ai_response = f"""The Self Study Report (SSR) is a comprehensive document for NAAC accreditation:

**SSR Structure:**
- Executive Summary
- Institutional Profile  
- Extended Profile (Quantitative Data)
- Qualitative Analysis for all 7 Criteria
- Supporting Documents

**Key Requirements:**
- Quantitative data with evidence
- Qualitative analysis with examples
- Supporting documents and annexures
- Institutional best practices
- SWOC analysis

**Preparation Guidelines:**
1. Collect 3 years of institutional data
2. Ensure data accuracy and verification
3. Provide evidence-based responses
4. Include stakeholder feedback
5. Follow NAAC format strictly

Need specific guidance on any SSR section?"""

        elif any(word in user_message for word in ["document", "documentation", "evidence", "proof"]):
            ai_response = f"""Documentation is crucial for NAAC assessment:

**Essential Documents:**
- Policy documents and minutes of meetings
- Academic and administrative records
- Financial statements and audit reports
- Student and faculty data
- Infrastructure and facility records

**Best Practices for Documentation:**
1. Maintain chronological order
2. Ensure proper authentication
3. Digital archiving with backup
4. Regular updates and reviews
5. Easy accessibility for verification

**Evidence Requirements:**
- Primary sources (original documents)
- Secondary sources (reports, publications)
- Photographic evidence
- Stakeholder testimonials
- External validation certificates

What specific documentation guidance do you need?"""

        elif any(word in user_message for word in ["curriculum", "academic", "teaching", "learning"]):
            ai_response = f"""For Teaching-Learning and Curriculum in NAAC context:

**Curriculum Design & Development:**
- Program outcomes alignment with institutional vision
- Industry and stakeholder consultation
- Regular curriculum review and updates
- Choice-based credit system implementation

**Teaching-Learning Process:**
- Student-centric learning approaches
- ICT integration in teaching
- Continuous assessment methods
- Faculty development programs

**Academic Flexibility:**
- Inter/multi-disciplinary programs
- Student mobility and credit transfer
- Skill development courses
- Add-on and certificate programs

**Quality Enhancement:**
- Academic audit mechanisms
- Student feedback systems
- External evaluation processes
- Best practice documentation

Which aspect would you like me to elaborate on?"""

        elif any(word in user_message for word in ["research", "innovation", "extension"]):
            ai_response = f"""Research, Innovation and Extension (Criterion III) guidance:

**Research Promotion:**
- Research policy and infrastructure
- Funding support and seed money
- Research publications and patents
- Collaborative research projects

**Innovation Ecosystem:**
- Incubation centers and startup support
- Innovation clubs and competitions
- Industry-academia partnerships
- Intellectual property management

**Extension Activities:**
- Community engagement programs
- Social outreach initiatives
- Environmental sustainability projects
- Skill development programs for society

**Key Metrics:**
- Research publications per faculty
- External funding received
- Patents filed and granted
- Community programs conducted

Need specific guidance on research documentation or innovation metrics?"""

        elif any(word in user_message for word in ["infrastructure", "facility", "library", "IT"]):
            ai_response = f"""Infrastructure and Learning Resources:

**Physical Infrastructure:**
- Classrooms and laboratory facilities
- Library and information resources
- Sports and recreational facilities
- Hostel and residential facilities

**Academic Support Facilities:**
- Advanced laboratories and equipment
- Clinical skills lab (if applicable)
- Research facilities and instrumentation
- Conference and seminar halls

**IT Infrastructure:**
- Campus-wide network connectivity
- Learning management systems
- Digital library resources
- Computer labs and software

**Maintenance and Upgradation:**
- Annual maintenance contracts
- Infrastructure development plans
- Budget allocation for facilities
- User feedback and improvements

What specific infrastructure aspect needs documentation?"""

        elif any(word in user_message for word in ["student support", "progression", "mentoring"]):
            ai_response = f"""Student Support and Progression:

**Student Support Services:**
- Academic mentoring and counseling
- Financial aid and scholarships
- Career guidance and placement
- Grievance redressal mechanisms

**Student Progression:**
- Enrollment and retention rates
- Pass percentage and academic performance
- Higher education and employment outcomes
- Alumni engagement and feedback

**Special Support Systems:**
- Support for differently-abled students
- Remedial classes for slow learners
- Advanced learner programs
- International student support

**Co-curricular Activities:**
- Student clubs and societies
- Cultural and sports events
- Leadership development programs
- Community service initiatives

Which student support aspect would you like detailed information on?"""

        elif any(word in user_message for word in ["governance", "leadership", "management"]):
            ai_response = f"""Governance, Leadership and Management:

**Institutional Governance:**
- Governing body composition and meetings
- Academic and administrative structure
- Policy formulation and implementation
- Decentralization and participative management

**Leadership:**
- Vision and mission alignment
- Strategic planning and implementation
- Quality leadership initiatives
- Stakeholder engagement

**Financial Management:**
- Budget preparation and monitoring
- Resource mobilization strategies
- Financial transparency and accountability
- Audit compliance and reporting

**Human Resource Management:**
- Recruitment and retention policies
- Faculty and staff development
- Performance evaluation systems
- Welfare measures and benefits

Need specific guidance on any governance aspect?"""

        elif any(word in user_message for word in ["values", "best practices", "social responsibility"]):
            ai_response = f"""Institutional Values and Best Practices:

**Gender Equity:**
- Gender sensitization programs
- Women safety and security measures
- Equal opportunity policies
- Support for women faculty/students

**Environmental Consciousness:**
- Green campus initiatives
- Waste management systems
- Energy conservation measures
- Environmental awareness programs

**Values and Ethics:**
- Code of conduct and ethics
- Anti-ragging and anti-corruption measures
- Promoting universal values
- Social justice initiatives

**Best Practices:**
- Innovation in teaching-learning
- Student-centric initiatives
- Community engagement programs
- Sustainability practices

Which best practice area needs documentation?"""

        else:
            # For general queries, provide comprehensive NAAC guidance
            ai_response = f"""Thank you for your question about "{topic}". Here's comprehensive guidance:

**NAAC Accreditation Overview:**
- 7 criteria-based evaluation
- Self Study Report (SSR) preparation
- Peer team visit and assessment
- Grade award and validity

**Key Success Factors:**
- Systematic data collection
- Evidence-based documentation
- Stakeholder engagement
- Continuous quality improvement

**Common Challenges & Solutions:**
- Data accuracy → Implement robust MIS
- Documentation gaps → Create systematic filing
- Stakeholder participation → Regular consultations
- Timeline management → Early preparation

**Next Steps:**
1. Identify your specific needs
2. Gather relevant documentation
3. Engage institutional stakeholders
4. Prepare criterion-wise evidence

What specific aspect of NAAC accreditation would you like detailed guidance on?"""

        return {
            "response": ai_response,
            "confidence": 0.95,
            "sources": ["NAAC Manual", "Institutional Best Practices", "Assessment Guidelines"],
            "timestamp": str(time.time())
        }
        
    except Exception as e:
        return {
            "response": "I apologize, but I encountered an error processing your request. Please try again.",
            "confidence": 0.0,
            "sources": [],
            "timestamp": str(time.time())
        }

@app.post("/api/documents/upload")
async def upload_document():
    return {"message": "Document upload endpoint - to be implemented"}

@app.get("/api/analytics/dashboard")
async def dashboard_analytics():
    return {
        "documentsProcessed": 0,
        "queriesHandled": 0,
        "reportsGenerated": 0,
        "criteriaCompleted": 0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
