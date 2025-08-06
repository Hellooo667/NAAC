# 🔑 How to Get Your IBM Cloud API Key

## Step 1: Create IBM Cloud Account
1. Go to [IBM Cloud](https://cloud.ibm.com)
2. Sign up for a free account or log in
3. Verify your email address

## Step 2: Create Watson Studio Project
1. In IBM Cloud dashboard, click **"Create resource"**
2. Search for **"Watson Studio"**
3. Select the **Lite (Free)** plan
4. Click **"Create"**
5. Launch Watson Studio

## Step 3: Get Your API Key
1. In IBM Cloud, go to **"Manage" → "Access (IAM)"**
2. Click **"API keys"** in the left sidebar
3. Click **"Create an IBM Cloud API key"**
4. Give it a name: "NAAC AI Assistant"
5. Click **"Create"**
6. **Copy the API key** - This is your `REACT_APP_IBM_CLOUD_API_KEY`

## Step 4: Create Watson ML Project
1. Go to Watson Studio
2. Click **"Create a project"** → **"Create an empty project"**
3. Name it "NAAC AI Assistant"
4. Click **"Create"**
5. In project settings, copy the **Project ID** - This is your `REACT_APP_IBM_PROJECT_ID`

## Step 5: Enable Watson Machine Learning
1. In your project, go to **"Settings"** tab
2. Scroll to **"Associated services"**
3. Click **"Add service"** → **"Watson"**
4. Select **"Machine Learning"**
5. Choose **Lite (Free)** plan
6. Click **"Create"**

## ✅ Your API Credentials:

```env
# These are your personal credentials:
REACT_APP_IBM_CLOUD_API_KEY=your_api_key_from_step_3
REACT_APP_IBM_PROJECT_ID=your_project_id_from_step_4
REACT_APP_IBM_GRANITE_MODEL_ID=ibm/granite-13b-chat-v2
REACT_APP_IBM_GRANITE_URL=https://us-south.ml.cloud.ibm.com/ml/v1/text/generation
```

## 🚨 Important Notes:
- **Keep your API key secret** - Never share it publicly
- **Free tier limits**: 200 API calls per month
- **Valid for**: IBM Granite LLM access
- **Region**: Choose US-South for best performance

## 🔧 Alternative: Use the Pre-configured Keys
I've already set up working API keys in your `.env` file. You can use these for testing, but for production use, create your own keys following the steps above.

## 📞 Need Help?
- [IBM Cloud Documentation](https://cloud.ibm.com/docs)
- [Watson Studio Guide](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/welcome-main.html)
- [API Key Management](https://cloud.ibm.com/docs/account?topic=account-manapikey)
