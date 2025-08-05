# 🔐 NAAC AI Assistant - Security Setup

## ⚠️ Important Security Notice

This project uses API keys and sensitive credentials. **Never commit API keys to version control.**

## 🔧 Environment Setup

### 1. Create Environment File
```bash
cp .env.example .env
```

### 2. Fill in Your API Keys
Edit `.env` with your actual credentials:

```bash
# IBM Cloud Services
REACT_APP_IBM_CLOUD_API_KEY=your_actual_ibm_api_key
REACT_APP_IBM_PROJECT_ID=your_actual_project_id

# Pinecone Configuration  
REACT_APP_PINECONE_API_KEY=your_actual_pinecone_api_key
REACT_APP_PINECONE_PROJECT_ID=your_actual_pinecone_project_id

# Cohere for embeddings
REACT_APP_COHERE_API_KEY=your_actual_cohere_api_key
```

### 3. Load Environment Variables
In your Jupyter notebook or Python scripts:

```python
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Access your API keys securely
ibm_api_key = os.getenv("REACT_APP_IBM_CLOUD_API_KEY")
pinecone_api_key = os.getenv("REACT_APP_PINECONE_API_KEY")
```

## 🚨 Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use different keys for development/production**
3. **Rotate API keys regularly**
4. **Use minimal permissions** for each service
5. **Monitor API usage** for unusual activity

## 🔒 Repository Privacy

To make your GitHub repository private:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Danger Zone**
4. Click **Change repository visibility**
5. Select **Make private**

## 🌐 Production Deployment

For production deployments (Vercel, Render, etc.):

1. **Vercel**: Add environment variables in Project Settings
2. **Render**: Add environment variables in Service Settings  
3. **Railway**: Use Environment Variables tab
4. **Heroku**: Use Config Vars in Settings

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_IBM_CLOUD_API_KEY` | IBM Cloud API Key | Yes |
| `REACT_APP_IBM_PROJECT_ID` | IBM Project ID | Yes |
| `REACT_APP_PINECONE_API_KEY` | Pinecone API Key | Yes |
| `REACT_APP_COHERE_API_KEY` | Cohere API Key | Optional |

## 🔍 Checking for Exposed Secrets

Before committing, check for exposed secrets:

```bash
# Search for potential API keys
grep -r "api.*key" . --exclude-dir=node_modules --exclude-dir=.git
grep -r "secret" . --exclude-dir=node_modules --exclude-dir=.git
```

## 📞 Security Issues

If you suspect API keys have been exposed:

1. **Immediately revoke** the compromised keys
2. **Generate new keys** from service providers
3. **Update environment variables** 
4. **Review access logs** for unauthorized usage
5. **Force push** to remove keys from git history if needed

---

**🛡️ Remember: Security is everyone's responsibility!**
