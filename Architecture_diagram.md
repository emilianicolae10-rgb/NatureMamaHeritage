# NatureMama Heritage — Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CUSTOMER BROWSER                               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    React + Vite Frontend                            │   │
│   │                                                                     │   │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐ ┌───────────┐   │   │
│   │  │   Home   │ │ Products │ │  About   │ │ Quiz  │ │  Contact  │   │   │
│   │  └──────────┘ └──────────┘ └──────────┘ └───────┘ └───────────┘   │   │
│   │                      │                                              │   │
│   │               ┌──────┴──────┐                                       │   │
│   │               │ Shopping    │                                        │   │
│   │               │ Cart        │                                        │   │
│   │               └──────┬──────┘                                       │   │
│   │                      │                                              │   │
│   │               ┌──────┴──────┐                                       │   │
│   │               │  Checkout   │                                        │   │
│   │               │  Form       │                                        │   │
│   │               └──────┬──────┘                                       │   │
│   └──────────────────────┼──────────────────────────────────────────────┘   │
└──────────────────────────┼──────────────────────────────────────────────────┘
                           │
                           │ HTTPS POST /orders
                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AWS CLOUD (us-east-1)                              │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                      AWS AMPLIFY HOSTING                            │   │
│   │                                                                     │   │
│   │   Hosts the React frontend (auto-deploys from GitHub)               │   │
│   │   Build: npm run build → serves /dist                               │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    API GATEWAY (REST API)                           │   │
│   │                                                                     │   │
│   │   Endpoint: POST /prod/orders                                       │   │
│   │   Endpoint: OPTIONS /prod/orders  (CORS preflight)                  │   │
│   └────────────────────────────┬────────────────────────────────────────┘   │
│                                │                                            │
│                                │ AWS_PROXY Integration                      │
│                                ▼                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    AWS LAMBDA FUNCTION                              │   │
│   │                    (Node.js 20.x)                                   │   │
│   │                                                                     │   │
│   │   1. Receives order (customer info + cart items)                    │   │
│   │   2. Generates unique order number (NMH-XXXXX-XXXX)                │   │
│   │   3. Stores order in DynamoDB                                       │   │
│   │   4. Sends confirmation email via SES                               │   │
│   │   5. Returns order number to frontend                               │   │
│   └──────────┬──────────────────────────────────┬───────────────────────┘   │
│              │                                  │                           │
│              ▼                                  ▼                           │
│   ┌─────────────────────┐            ┌─────────────────────┐               │
│   │   AMAZON DYNAMODB   │            │    AMAZON SES       │               │
│   │                     │            │                     │               │
│   │  Table:             │            │  Sends branded      │               │
│   │  NatureMamaOrders   │            │  HTML confirmation  │               │
│   │                     │            │  email matching      │               │
│   │  Key: orderNumber   │            │  website design     │               │
│   │                     │            │                     │               │
│   │  Stores:            │            │  From: verified     │               │
│   │  - Customer info    │            │  sender email       │               │
│   │  - Order items      │            │                     │               │
│   │  - Total price      │            │  To: customer       │               │
│   │  - Timestamp        │            │  email              │               │
│   └─────────────────────┘            └─────────────────────┘               │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         IAM ROLE                                    │   │
│   │                                                                     │   │
│   │   Grants Lambda permission to:                                      │   │
│   │   - Write to DynamoDB (NatureMamaOrders table)                      │   │
│   │   - Send emails via SES                                             │   │
│   │   - Write logs to CloudWatch                                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    CLOUDFORMATION                                   │   │
│   │                                                                     │   │
│   │   Deploys all backend resources from a single template:             │   │
│   │   cloudformation-template.yaml                                      │   │
│   │                                                                     │   │
│   │   Resources created:                                                │   │
│   │   - DynamoDB Table (NatureMamaOrders)                               │   │
│   │   - Lambda Function (NatureMamaOrderHandler)                        │   │
│   │   - API Gateway REST API (NatureMamaOrderAPI)                       │   │
│   │   - IAM Role + Policy                                               │   │
│   │   - Lambda Permission for API Gateway                               │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘


                        ┌─────────────────────┐
                        │   DATA FLOW SUMMARY │
                        └─────────────────────┘

  Customer adds products to cart
         │
         ▼
  Customer fills checkout form (name, email, address, phone)
         │
         ▼
  Frontend validates email + phone format
         │
         ▼
  Frontend sends POST to API Gateway /prod/orders
         │
         ▼
  API Gateway triggers Lambda function
         │
         ├──► Lambda generates order number
         │
         ├──► Lambda saves order to DynamoDB
         │
         ├──► Lambda sends HTML email via SES
         │
         └──► Lambda returns order number
                │
                ▼
  Frontend shows confirmation page with order number
                │
                ▼
  Customer receives branded email with order summary
```

## Services Used

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| AWS Amplify | Hosts the React frontend | 1,000 build min/mo, 15 GB served |
| API Gateway | REST API endpoint for orders | 1M calls/mo (12 months) |
| Lambda | Processes orders, sends emails | 1M requests/mo |
| DynamoDB | Stores order data | 25 GB storage |
| SES | Sends confirmation emails | 62,000 emails/mo |
| CloudFormation | Deploys all backend resources | Free |
| IAM | Security permissions | Free |
