#!/usr/bin/env python3

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

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
    
    bucket_name = os.getenv('IBM_COS_BUCKET_NAME')
    print(f"Creating bucket: {bucket_name}")
    
    try:
        # Create the bucket
        cos_client.create_bucket(
            Bucket=bucket_name,
            CreateBucketConfiguration={
                'LocationConstraint': os.getenv('IBM_COS_REGION', 'us-south')
            }
        )
        print(f"✅ Bucket '{bucket_name}' created successfully")
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'BucketAlreadyExists':
            print(f"✅ Bucket '{bucket_name}' already exists")
        elif error_code == 'BucketAlreadyOwnedByYou':
            print(f"✅ Bucket '{bucket_name}' already owned by you")
        else:
            print(f"❌ Error creating bucket: {error_code} - {e.response['Error']['Message']}")
    
    # Test the bucket access again
    try:
        response = cos_client.head_bucket(Bucket=bucket_name)
        print(f"✅ Bucket '{bucket_name}' is now accessible")
        
        # Test file upload
        test_content = b"Test file for NAAC AI Assistant"
        test_key = "test/connectivity_test.txt"
        
        cos_client.put_object(
            Bucket=bucket_name,
            Key=test_key,
            Body=test_content,
            ContentType='text/plain'
        )
        print(f"✅ Test file uploaded successfully to {test_key}")
        
        # Clean up test file
        cos_client.delete_object(Bucket=bucket_name, Key=test_key)
        print(f"✅ Test file cleaned up")
        
    except Exception as e:
        print(f"❌ Error testing bucket: {e}")
        
except Exception as e:
    print(f"❌ Error: {e}")
