import os
import ibm_boto3
from ibm_botocore.exceptions import ClientError
from ibm_botocore.config import Config
import uuid
from datetime import datetime
import aiofiles
from typing import Optional

class IBMCloudStorageService:
    """Service for handling IBM Cloud Object Storage operations"""
    
    def __init__(self):
        # IBM Cloud Object Storage configuration
        self.cos_client = None
        self.bucket_name = os.getenv("IBM_COS_BUCKET_NAME", "naac-documents")
        
        # Initialize IBM COS client if credentials are available
        self.api_key = os.getenv("IBM_CLOUD_API_KEY")
        self.service_instance_id = os.getenv("IBM_COS_SERVICE_INSTANCE_ID")
        self.endpoint_url = os.getenv("IBM_COS_ENDPOINT_URL")
        self.region = os.getenv("IBM_COS_REGION", "us-south")
        
        if self.api_key and self.service_instance_id and self.endpoint_url:
            try:
                self.cos_client = ibm_boto3.client(
                    's3',
                    ibm_api_key_id=self.api_key,
                    ibm_service_instance_id=self.service_instance_id,
                    config=Config(signature_version='oauth'),
                    endpoint_url=self.endpoint_url,
                    region_name=self.region
                )
            except Exception as e:
                print(f"Failed to initialize IBM Cloud Object Storage client: {e}")
                self.cos_client = None
    
    def is_configured(self) -> bool:
        """Check if IBM Cloud Object Storage is properly configured"""
        return self.cos_client is not None
    
    async def upload_file(self, file_content: bytes, original_filename: str, session_id: str) -> dict:
        """Upload a file to IBM Cloud Object Storage"""
        if not self.is_configured():
            return {"error": "IBM Cloud Object Storage not configured", "stored_locally": True}
        
        try:
            # Generate unique filename
            file_extension = os.path.splitext(original_filename)[1]
            unique_filename = f"{session_id}/{uuid.uuid4().hex}{file_extension}"
            
            # Upload to IBM Cloud Object Storage
            self.cos_client.put_object(
                Bucket=self.bucket_name,
                Key=unique_filename,
                Body=file_content,
                ContentType=self._get_content_type(file_extension),
                Metadata={
                    'original-filename': original_filename,
                    'session-id': session_id,
                    'upload-timestamp': datetime.utcnow().isoformat(),
                    'naac-document': 'true'
                }
            )
            
            # Generate URL for the uploaded file
            file_url = f"{self.endpoint_url}/{self.bucket_name}/{unique_filename}"
            
            return {
                "success": True,
                "cloud_storage_key": unique_filename,
                "cloud_storage_url": file_url,
                "stored_locally": False,
                "storage_provider": "IBM Cloud Object Storage"
            }
            
        except ClientError as e:
            print(f"Failed to upload to IBM Cloud Object Storage: {e}")
            return {"error": str(e), "stored_locally": True}
    
    async def store_locally(self, file_content: bytes, original_filename: str, session_id: str) -> dict:
        """Store file locally when IBM Cloud Object Storage is not available"""
        try:
            # Create local storage directory
            local_storage_dir = os.path.join("local_storage", session_id)
            os.makedirs(local_storage_dir, exist_ok=True)
            
            # Generate unique filename
            file_extension = os.path.splitext(original_filename)[1]
            unique_filename = f"{uuid.uuid4().hex}{file_extension}"
            local_path = os.path.join(local_storage_dir, unique_filename)
            
            # Write file locally
            async with aiofiles.open(local_path, 'wb') as f:
                await f.write(file_content)
            
            return {
                "success": True,
                "local_path": local_path,
                "stored_filename": unique_filename,
                "stored_locally": True,
                "storage_provider": "Local Storage (Fallback)"
            }
            
        except Exception as e:
            print(f"Failed to store locally: {e}")
            return {"error": str(e), "stored_locally": False}
    
    def _get_content_type(self, file_extension: str) -> str:
        """Get content type based on file extension"""
        content_types = {
            '.pdf': 'application/pdf',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.doc': 'application/msword',
            '.txt': 'text/plain',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
        return content_types.get(file_extension.lower(), 'application/octet-stream')
    
    async def delete_file(self, storage_key: str) -> bool:
        """Delete a file from IBM Cloud Object Storage"""
        if not self.is_configured():
            return False
        
        try:
            self.cos_client.delete_object(Bucket=self.bucket_name, Key=storage_key)
            return True
        except ClientError as e:
            print(f"Failed to delete from IBM Cloud Object Storage: {e}")
            return False
    
    async def get_file_url(self, storage_key: str, expires_in: int = 3600) -> Optional[str]:
        """Generate a presigned URL for file access from IBM Cloud Object Storage"""
        if not self.is_configured():
            return None
        
        try:
            response = self.cos_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': storage_key},
                ExpiresIn=expires_in
            )
            return response
        except ClientError as e:
            print(f"Failed to generate presigned URL: {e}")
            return None
    
    async def list_bucket_contents(self) -> dict:
        """List contents of the IBM Cloud Object Storage bucket"""
        if not self.is_configured():
            return {"error": "IBM Cloud Object Storage not configured"}
        
        try:
            response = self.cos_client.list_objects_v2(Bucket=self.bucket_name)
            files = []
            for obj in response.get('Contents', []):
                files.append({
                    'key': obj['Key'],
                    'size': obj['Size'],
                    'last_modified': obj['LastModified'].isoformat(),
                    'storage_class': obj.get('StorageClass', 'STANDARD')
                })
            
            return {
                "success": True,
                "bucket_name": self.bucket_name,
                "file_count": len(files),
                "files": files
            }
        except ClientError as e:
            return {"error": f"Failed to list bucket contents: {e}"}

# Global instance
ibm_cloud_storage = IBMCloudStorageService()
