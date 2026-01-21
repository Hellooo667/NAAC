## Backend Features

- **Data Processing Pipeline**: Process NAAC institutional datasets
- **Document Analysis**: Extract and analyze NAAC documents  
- **Vector Database**: ChromaDB and Pinecone integration
- **AI Assistant**: IBM Granite LLM with RAG capabilities
- **API Endpoints**: RESTful API for NAAC queries

## Data Processing

The system processes:
- ✅ Institutional datasets (CSV/Excel)
- ✅ NAAC documents (PDF text extraction)
- ✅ Vector embeddings for semantic search
- ✅ RAG pipeline for question answering

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Add your API keys to .env

# Run data processing
python -m jupyter notebook NAAC_Data_Processing_Pipeline.ipynb

# Start backend API
cd naac-backend
python main.py
```

## API Endpoints

```
POST /query - Submit NAAC queries
GET /health - Health check
POST /process - Process new documents
GET /datasets - List available datasets
```

## Usage

```python
import requests

# Query the NAAC assistant
response = requests.post('http://localhost:8000/query', 
    json={'question': 'What are the NAAC seven criteria?'})
print(response.json())
```

## Architecture

- **Backend**: FastAPI Python server
- **Database**: ChromaDB + Pinecone Cloud
- **AI**: IBM Granite LLM with RAG
- **Processing**: Jupyter notebook pipeline

## Documentation

- `NAAC_Data_Processing_Pipeline.ipynb` - Complete data pipeline
- `SECURITY.md` - Security guidelines
- `naac-backend/` - API server code
- `data/` - Processed datasets and documents
