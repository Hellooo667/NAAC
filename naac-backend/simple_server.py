from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": "2025-08-09T21:19:06.678306"}

@app.post("/api/chat/message")
async def chat_message(request: ChatRequest):
    message = request.message.lower()
    
    if "criterion 1" in message or "curricular" in message:
        response = """**Criterion 1: Curricular Aspects**

Based on your question about "${message}", here's comprehensive guidance:

**Sub-criteria Coverage:**
1.1 Curricular Planning and Implementation
1.2 Academic Flexibility
1.3 Curriculum Enrichment
1.4 Feedback System

**Key Requirements:**
- Curriculum committee meetings and minutes
- Academic calendar with proper scheduling
- Course outcome mapping and assessment
- Stakeholder feedback analysis
- Industry integration in curriculum

**Documentation Needed:**
- Curriculum approval documents
- Academic flexibility policies
- Value-added course details
- Feedback collection and analysis reports

**Best Practices:**
- Regular curriculum review and updates
- Industry expert involvement
- Student choice and flexibility
- Continuous improvement based on feedback

Need specific guidance on any sub-criterion or documentation requirement?"""
    
    elif "criterion 2" in message or "teaching" in message:
        response = """**Criterion 2: Teaching-Learning and Evaluation**

Your inquiry about teaching-learning processes:

**Key Areas:**
2.1 Student Enrollment and Profile
2.2 Catering to Student Diversity
2.3 Teaching-Learning Process
2.4 Teacher Profile and Quality
2.5 Evaluation Process and Reforms
2.6 Student Performance and Learning Outcomes

**Focus Points:**
- Student-centric pedagogies
- ICT-enabled learning environments
- Continuous internal evaluation
- Learning outcome measurement
- Teacher quality and development

**Innovation Strategies:**
- Flipped classroom techniques
- Peer learning and collaboration
- Technology-enhanced learning
- Competency-based assessment
- Personalized learning approaches

Would you like detailed guidance on any specific sub-criterion?"""
    
    elif "ssr" in message or "self-study" in message:
        response = """**Self-Study Report (SSR) Preparation Guide**

Your SSR preparation query - here's a comprehensive approach:

**Timeline (12-month plan):**
- Months 1-2: Team formation and planning
- Months 3-8: Data collection and analysis
- Months 9-11: Writing and documentation
- Month 12: Review and finalization

**Essential Components:**
📋 Executive Summary (institutional overview)
📊 Institutional Profile (key metrics)
📈 Seven Criteria Analysis (detailed evidence)
📎 Supporting Documents (authenticated)
📸 Photographic Evidence (geo-tagged)

**Quality Assurance:**
- Data verification and validation
- Stakeholder feedback incorporation
- External expert review
- Compliance with NAAC guidelines
- Digital document management

**Common Challenges & Solutions:**
- Data gaps → Systematic collection protocols
- Documentation → Digital archival systems
- Timeline management → Milestone tracking
- Quality control → Multi-level reviews

Need help with specific SSR sections or data collection strategies?"""
    
    elif "research" in message or "criterion 3" in message:
        response = """**Criterion 3: Research, Innovations and Extension**

Research excellence guidance for your query:

**Sub-criteria Framework:**
3.1 Resource Mobilization for Research
3.2 Innovation Ecosystem
3.3 Research Publications and Awards
3.4 Extension Activities
3.5 Collaboration

**Key Performance Indicators:**
📊 Research projects and funding secured
🏆 Publications in peer-reviewed journals
💡 Patents and innovations developed
🤝 Industry and academic collaborations
🌍 Community engagement programs

**Enhancement Strategies:**
- Research seed money allocation
- Faculty development for research
- Industry partnership development
- Student research participation
- Innovation and incubation support

**Documentation Requirements:**
- Research project databases
- Publication records and metrics
- Patent and IPR documentation
- Extension activity reports
- Collaboration agreements

Which aspect of research development would you like to explore further?"""
    
    else:
        response = f"""**NAAC AI Assistant Response**

Thank you for your question: "{request.message}"

I'm your comprehensive NAAC guidance assistant. I can help you with:

**🎯 Seven NAAC Criteria:**
1. Curricular Aspects
2. Teaching-Learning and Evaluation
3. Research, Innovations and Extension
4. Infrastructure and Learning Resources
5. Student Support and Progression
6. Governance, Leadership and Management
7. Institutional Values and Best Practices

**📋 Key Services:**
- SSR preparation and guidance
- Documentation requirements
- Best practices identification
- Quality indicator improvement
- Peer team visit preparation

**💡 How to get specific help:**
- Ask about specific criteria (e.g., "Tell me about Criterion 1")
- Request SSR guidance
- Inquire about documentation needs
- Ask for best practices in any area

What specific aspect of NAAC accreditation would you like detailed guidance on?"""
    
    return {
        "response": response,
        "confidence": 0.95,
        "sources": ["NAAC Manual 2020", "Best Practices Database", "Quality Guidelines"],
        "timestamp": "2025-08-09T21:19:20.123448"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
