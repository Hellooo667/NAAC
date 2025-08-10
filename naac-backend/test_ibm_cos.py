#!/usr/bin/env python3

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=== IBM Cloud Object Storage Configuration Test ===")
print(f"IBM_CLOUD_API_KEY: {os.getenv('IBM_CLOUD_API_KEY', 'NOT SET')[:10]}...")
print(f"IBM_COS_SERVICE_INSTANCE_ID: {os.getenv('IBM_COS_SERVICE_INSTANCE_ID', 'NOT SET')}")
print(f"IBM_COS_ENDPOINT_URL: {os.getenv('IBM_COS_ENDPOINT_URL', 'NOT SET')}")
print(f"IBM_COS_REGION: {os.getenv('IBM_COS_REGION', 'NOT SET')}")
print(f"IBM_COS_BUCKET_NAME: {os.getenv('IBM_COS_BUCKET_NAME', 'NOT SET')}")

print("\n=== Testing IBM COS Connection ===")

try:
    import ibm_boto3
    from ibm_botocore.config import Config
    from ibm_botocore.exceptions import ClientError
    
    # Initialize IBM COS client
    cos_client = ibm_boto3.client(
        's3',
        ibm_api_key_id=os.getenv('IBM_CLOUD_API_KEY'),
        ibm_service_instance_id=os.getenv('IBM_COS_SERVICE_INSTANCE_ID'),
        config=Config(signature_version='oauth'),
        endpoint_url=os.getenv('IBM_COS_ENDPOINT_URL'),
        region_name=os.getenv('IBM_COS_REGION', 'us-south')
    )
    
    print("✅ IBM COS client created successfully")
    
    # Test bucket access
    bucket_name = os.getenv('IBM_COS_BUCKET_NAME')
    try:
        response = cos_client.head_bucket(Bucket=bucket_name)
        print(f"✅ Bucket '{bucket_name}' is accessible")
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == '404':
            print(f"❌ Bucket '{bucket_name}' not found")
        else:
            print(f"❌ Error accessing bucket: {error_code} - {e.response['Error']['Message']}")
    except Exception as e:
        print(f"❌ Error testing bucket access: {e}")
        
except ImportError:
    print("❌ IBM COS SDK not installed")
except Exception as e:
    print(f"❌ Error creating IBM COS client: {e}")
