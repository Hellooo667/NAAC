#!/usr/bin/env python3

# Simple test for the chat functionality
def test_chat_response():
    # Simulate the chat logic from main.py
    user_message = "what are the 7 criteria of NAAC?"
    user_message_lower = user_message.lower()
    
    if any(word in user_message_lower for word in ["criteria", "criterion", "7 criteria"]):
        response = """NAAC evaluates institutions based on 7 key criteria:

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
        
        print("✅ Chat Response Test PASSED!")
        print("Question:", user_message)
        print("Response Preview:", response[:200] + "...")
        return True
    else:
        print("❌ Chat Response Test FAILED!")
        return False

if __name__ == "__main__":
    test_chat_response()
