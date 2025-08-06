# Frontend UI Archived

The frontend user interface has been archived for security and privacy reasons.

## Backend API Only

This repository now provides:
- ✅ **Data Processing Pipeline** - Jupyter notebook for NAAC data analysis
- ✅ **Backend API** - RESTful endpoints for NAAC queries  
- ✅ **AI Assistant** - IBM Granite LLM with RAG capabilities
- ✅ **Vector Database** - ChromaDB and Pinecone integration

## API Usage

```bash
# Start backend server
cd naac-backend
python main.py

# Query endpoint
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the NAAC seven criteria?"}'
```

## Frontend Alternative

For UI access, use the API endpoints with:
- Command line tools (curl, httpie)
- API clients (Postman, Insomnia)
- Custom scripts or applications
- Direct notebook interaction

The backend provides all NAAC AI assistant functionality through RESTful APIs.
