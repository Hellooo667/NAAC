#!/usr/bin/env python3

import json
import socket
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse
from datetime import datetime

class NAACHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "status": "healthy",
                "timestamp": datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/chat/message':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                message = data.get('message', '').lower()
                
                # Generate contextual responses based on message content
                if 'criterion 1' in message or 'curricular' in message:
                    response_text = """**Criterion 1: Curricular Aspects**

Based on your question about curricular aspects, here's comprehensive guidance:

**Sub-criteria Coverage:**
1.1 Curricular Planning and Implementation
1.2 Academic Flexibility
1.3 Curriculum Enrichment
1.4 Feedback System

**Key Requirements:**
- Curriculum committee meetings and minutes
- Academic calendar with proper CIE schedule
- Course outcome mapping and assessment
- Stakeholder feedback collection and analysis
- Industry integration in curriculum design

**Documentation Needed:**
- Board of Studies/Academic Council resolutions
- Curriculum revision documents
- Choice-based credit system implementation
- Value-added course details
- Feedback analysis reports from all stakeholders

**Best Practices:**
- Regular curriculum review (every 2-3 years)
- Industry expert involvement in curriculum design
- Student choice and academic flexibility
- Continuous improvement based on feedback
- Integration of emerging technologies and trends

Need specific guidance on any particular sub-criterion or documentation requirement?"""
                
                elif 'criterion 2' in message or 'teaching' in message or 'learning' in message:
                    response_text = """**Criterion 2: Teaching-Learning and Evaluation**

Your inquiry about teaching-learning processes - here's detailed guidance:

**Key Sub-criteria:**
2.1 Student Enrollment and Profile
2.2 Catering to Student Diversity
2.3 Teaching-Learning Process
2.4 Teacher Profile and Quality
2.5 Evaluation Process and Reforms
2.6 Student Performance and Learning Outcomes

**Focus Areas:**
- Student-centric pedagogical approaches
- ICT-enabled learning environments
- Continuous Internal Evaluation (CIE)
- Learning outcome measurement and attainment
- Teacher quality enhancement programs

**Innovation Strategies:**
- Flipped classroom methodologies
- Peer learning and collaborative approaches
- Technology-enhanced learning platforms
- Competency-based assessment techniques
- Personalized learning pathways

**Quality Indicators:**
- Student-teacher ratio optimization
- Use of ICT in teaching-learning
- Student progression and success rates
- Teacher development programs participation
- Learning outcome achievement levels

Would you like detailed guidance on any specific teaching-learning innovation or evaluation method?"""
                
                elif 'criterion 3' in message or 'research' in message:
                    response_text = """**Criterion 3: Research, Innovations and Extension**

Research excellence framework for your institution:

**Sub-criteria Framework:**
3.1 Resource Mobilization for Research
3.2 Innovation Ecosystem
3.3 Research Publications and Awards
3.4 Extension Activities
3.5 Collaboration

**Key Performance Indicators:**
📊 Research projects and external funding
🏆 Publications in peer-reviewed journals
💡 Patents and intellectual property rights
🤝 Industry and academic collaborations
🌍 Community engagement and extension programs

**Enhancement Strategies:**
- Research seed money and internal funding
- Faculty development for research skills
- Industry partnership development
- Student research participation programs
- Innovation and incubation center establishment

**Documentation Requirements:**
- Research project database with outcomes
- Publication records with impact factors
- Patent applications and grants
- Extension activity impact reports
- MoUs and collaboration agreements

**Quality Metrics:**
- Publications per faculty ratio
- Citation index and h-index tracking
- Research grant success rate
- Student participation in research
- Community impact assessment

Which specific aspect of research development would you like to explore in greater detail?"""
                
                elif 'ssr' in message or 'self-study' in message or 'report' in message:
                    response_text = """**Self-Study Report (SSR) Preparation - Comprehensive Guide**

Your SSR preparation query - here's a strategic approach:

**Timeline (12-18 month preparation cycle):**
- **Months 1-2:** Steering committee formation and planning
- **Months 3-8:** Systematic data collection and validation
- **Months 9-14:** Writing and documentation phase
- **Months 15-18:** Review, refinement, and finalization

**Essential SSR Components:**
📋 **Executive Summary** (institutional highlights and achievements)
📊 **Institutional Profile** (quantitative data and key metrics)
📈 **Seven Criteria Analysis** (detailed evidence-based narrative)
📎 **Supporting Documents** (authenticated and organized)
📸 **Photographic Evidence** (geo-tagged and recent)

**Quality Assurance Framework:**
- Multi-level data verification protocols
- Stakeholder feedback integration
- External expert review processes
- Compliance validation with NAAC guidelines
- Digital document management systems

**Common Challenges & Strategic Solutions:**
- **Data Gaps:** Implement systematic collection protocols
- **Documentation:** Establish digital archival systems
- **Timeline Management:** Use milestone-based tracking
- **Quality Control:** Multi-tier review mechanisms
- **Stakeholder Engagement:** Structured feedback processes

**Best Practices for Excellence:**
- Evidence-based narrative development
- Quantitative trend analysis (3-5 years)
- Innovative practice documentation
- Stakeholder testimonial integration
- Continuous improvement demonstration

Need specific guidance on any particular SSR section, data collection strategy, or documentation requirement?"""
                
                elif 'grade' in message or 'cgpa' in message or 'scoring' in message:
                    response_text = """**NAAC Grading System and Assessment Framework**

Understanding NAAC grading for institutional excellence:

**Grade Classifications:**
🏆 **A++** (CGPA 3.51-4.00): Exceptional performance
🥇 **A+** (CGPA 3.26-3.50): Outstanding performance
🥈 **A** (CGPA 3.01-3.25): Very good performance
🥉 **B++** (CGPA 2.76-3.00): Good performance
📈 **B+** (CGPA 2.51-2.75): Above average performance
📊 **B** (CGPA 2.01-2.50): Average performance
⚠️ **C** (CGPA 1.51-2.00): Below average performance

**CGPA Calculation Methodology:**
- Seven criteria with differential weightages
- Quality Indicator (QI) wise assessment
- Quantitative metrics and qualitative analysis
- Peer team evaluation and institutional presentation
- Student satisfaction survey integration

**Weightage Distribution:**
- Criterion 1: Curricular Aspects (150 points)
- Criterion 2: Teaching-Learning (350 points)
- Criterion 3: Research & Innovation (200 points)
- Criterion 4: Infrastructure (100 points)
- Criterion 5: Student Support (150 points)
- Criterion 6: Governance (100 points)
- Criterion 7: Best Practices (100 points)

**Excellence Strategies:**
- Focus on high-weightage criteria (2 & 3)
- Demonstrate continuous improvement
- Document innovative practices effectively
- Ensure stakeholder satisfaction
- Maintain robust data systems

Which specific criterion or scoring aspect would you like detailed guidance on?"""
                
                else:
                    # Default comprehensive response
                    response_text = f"""**NAAC AI Assistant - Comprehensive Guidance**

Thank you for your query: "{data.get('message', '')}"

I'm your dedicated NAAC accreditation guidance assistant. Here's how I can help you achieve excellence:

**🎯 Seven NAAC Criteria Expertise:**
1. **Curricular Aspects** - Curriculum design, flexibility, and enrichment
2. **Teaching-Learning & Evaluation** - Pedagogies, ICT integration, assessment
3. **Research, Innovations & Extension** - Research culture, publications, community engagement
4. **Infrastructure & Learning Resources** - Facilities, library, IT infrastructure
5. **Student Support & Progression** - Welfare, career guidance, alumni engagement
6. **Governance, Leadership & Management** - Administration, financial management, IQAC
7. **Institutional Values & Best Practices** - Ethics, sustainability, innovation

**📋 Comprehensive Services:**
- **SSR Preparation:** Step-by-step guidance and documentation
- **Quality Indicators:** Improvement strategies and benchmarking
- **Best Practices:** Innovation identification and implementation
- **Data Management:** Collection, analysis, and presentation
- **Peer Team Visit:** Preparation and presentation strategies

**💡 Quick Help Options:**
- Ask about specific criteria: "Tell me about Criterion 2"
- SSR guidance: "How to prepare SSR for Criterion 3?"
- Documentation help: "What documents needed for infrastructure?"
- Best practices: "Show me research innovation examples"
- Quality improvement: "How to improve teaching-learning?"

**🔍 Expert Analysis Available:**
- Gap analysis and improvement recommendations
- Benchmark comparisons and target setting
- Timeline planning and milestone tracking
- Resource optimization and strategic planning

What specific aspect of NAAC accreditation would you like detailed, expert guidance on? I'm here to help you achieve the highest possible grade!"""
                
                response = {
                    "response": response_text,
                    "confidence": 0.95,
                    "sources": ["NAAC Manual 2020", "Assessment Guidelines", "Best Practices Database"],
                    "timestamp": datetime.now().isoformat()
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                self.wfile.write(json.dumps(response).encode())
                
            except Exception as e:
                print(f"Error processing request: {e}")
                self.send_response(500)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(b'{"error": "Internal server error"}')
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('localhost', 8000), NAACHandler)
    print("🚀 NAAC Backend Server starting on http://localhost:8000")
    print("📡 Endpoints available:")
    print("   GET  /health")
    print("   POST /api/chat/message")
    print("🔥 Ready to provide contextual NAAC guidance!")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        server.server_close()
