# Azure Function: App Service Input Validator

This Azure Function is designed to validate user inputs when creating an App Service on Azure. It checks the following criteria for scoring and feedback:

- App Service name must be alphanumeric and contain both letters and numbers, with a length of less than 60 characters.
- App Service plan.
- Resource group.
- Region.
- Runtime environment.

## Prerequisites

Before you start, ensure you have the following:

- **Azure Function App** (in Azure Portal or Azure CLI)
- **Node.js** environment
- **Azure Functions Core Tools** (if running locally)
- An **Azure Subscription**
- Basic knowledge of **Azure** and **App Services**

## Setup

### Step 1: Create a Function App on Azure

1. Go to the [Azure portal](https://portal.azure.com/).
2. Navigate to **Function App**.
3. Click **Create** and fill out the required information (name, subscription, resource group, runtime stack, etc.).

### Step 2: Deploy Your Code

1. In the Azure portal, go to your **Function App**.
2. Select **Functions** from the left menu and click **+ Add**.
3. Select the **HTTP trigger** template and configure it.
4. In the **Code + Test** section, add the Node.js code that handles the input validation.

### Step 3: Testing the Function

You can test the function using **curl** or any API client like **Postman**. The endpoint will be available in your Function App.

#### Example `curl` Command:

```bash
curl -X POST "https://<YourFunctionAppName>.azurewebsites.net/api/<FunctionName>" \
-H "Content-Type: application/json" \
-d '{
  "app_service_name": "myAppService123",
  "app_service_plan": "Premium",
  "resource_group": "MyResourceGroup",
  "region": "East US",
  "runtime": "Python"
}'
