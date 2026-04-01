# NatureMama Heritage — Deployment Guide

This guide walks you through deploying the complete NatureMama Heritage e-commerce website, including the backend (orders, emails, database) and the frontend.

---

## Overview

Your site has two parts:
1. **Backend** — An AWS API that processes orders, stores them in a database, and sends confirmation emails. Deployed via a CloudFormation template.
2. **Frontend** — The React website. Deployed via AWS Amplify.

---

## STEP 1: Verify Your Email in Amazon SES

Before the site can send order confirmation emails, you need to verify the sender email address in Amazon SES.

1. Go to the **AWS Console** → search for **Amazon SES** → open it
2. Make sure you are in the **us-east-1 (N. Virginia)** region (top-right dropdown)
3. In the left menu, click **Verified identities** → **Create identity**
4. Choose **Email address**, enter the email you want to use as the sender (e.g. `orders@naturemamaheritage.com`)
5. Click **Create identity**
6. Check your inbox for a verification email from AWS and **click the confirmation link**

> **Important:** If your SES account is in "sandbox mode" (default for new accounts), you can only send emails to verified addresses. To send to any customer, you need to request production access:
> - In SES, go to **Account dashboard** → click **Request production access**
> - Fill out the form explaining you send order confirmation emails
> - AWS typically approves within 24 hours

---

## STEP 2: Deploy the Backend (CloudFormation)

This creates your API, database, email service, and all the plumbing automatically.

1. Go to the **AWS Console** → search for **CloudFormation** → open it
2. Make sure you are in **us-east-1 (N. Virginia)**
3. Click **Create stack** → **With new resources (standard)**
4. Choose **Upload a template file**
5. Click **Choose file** and select the `cloudformation-template.yaml` file from your project
6. Click **Next**
7. Fill in the form:
   - **Stack name:** `NatureMamaHeritage`
   - **SenderEmail:** The email address you verified in Step 1
8. Click **Next** → **Next**
9. At the bottom, **check the box** that says *"I acknowledge that AWS CloudFormation might create IAM resources with custom names"*
10. Click **Submit**
11. Wait for the status to show **CREATE_COMPLETE** (about 2-3 minutes)

### Get Your API URL

1. Once the stack is complete, click on the **Outputs** tab
2. Copy the **ApiUrl** value — it looks like: `https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod`
3. You'll need this in the next step

---

## STEP 3: Configure the Frontend

1. Open the `.env` file in the project root
2. Replace the placeholder with your actual API URL:

```
VITE_API_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
```

3. Save the file

---

## STEP 4: Test Locally

1. Open a terminal in the project folder
2. Run:
```
npm install
npm run dev
```
3. Open http://localhost:5173 in your browser
4. Try adding products to the cart and placing a test order
5. Check your email for the order confirmation
6. In the AWS Console, go to **DynamoDB** → **Tables** → **NatureMamaOrders** → **Explore table items** to see your order

---

## STEP 5: Deploy the Frontend to AWS Amplify

### Option A: Via GitHub (Recommended)

1. Push your project to a GitHub repository:
```
git init
git add .
git commit -m "NatureMama Heritage initial commit"
git remote add origin https://github.com/YOUR_USERNAME/naturemama-heritage.git
git push -u origin main
```

2. Go to the **AWS Console** → search for **AWS Amplify** → open it
3. Click **New app** → **Host web app**
4. Choose **GitHub** and authorize access
5. Select your repository and the `main` branch
6. Amplify auto-detects Vite — the build settings should be:
   - Build command: `npm run build`
   - Output directory: `dist`
7. In **Advanced settings** → **Environment variables**, add:
   - Key: `VITE_API_URL`
   - Value: your API URL from Step 2
8. Click **Save and deploy**
9. Wait for the build to complete, then visit your deployed URL

### Option B: Manual Deploy

1. Build the project:
```
npm run build
```
2. In Amplify Console, choose **Deploy without Git provider**
3. Drag and drop the `dist` folder
4. Your site is live

---

## STEP 6: View Orders in DynamoDB

1. Go to the **AWS Console** → search for **DynamoDB** → open it
2. Click **Tables** → **NatureMamaOrders**
3. Click **Explore table items**
4. You'll see all orders with: order number, customer info, items, total price, and date

---

## Files Reference

| File | Purpose |
|------|---------|
| `.env` | Configuration — your API URL goes here |
| `cloudformation-template.yaml` | Backend infrastructure — deploy this in CloudFormation |
| `src/` | Frontend React application code |
| `Architecture_diagram.md` | Visual architecture of the system |

---

## Troubleshooting

**"Order failed" error when placing an order:**
- Check that the `.env` file has the correct API URL
- Make sure the CloudFormation stack deployed successfully
- Check the Lambda function logs in CloudWatch (AWS Console → CloudWatch → Log groups → `/aws/lambda/NatureMamaOrderHandler`)

**Not receiving confirmation emails:**
- Verify the sender email is confirmed in SES
- If in sandbox mode, the recipient email must also be verified
- Request SES production access to send to any email

**CloudFormation stack fails:**
- Check the **Events** tab for error details
- Most common issue: the email parameter format is invalid
- Make sure you're in the us-east-1 region

---

## Cost Estimate

With low traffic, this setup falls within or near the AWS Free Tier:
- **Lambda:** 1 million free requests/month
- **API Gateway:** 1 million free API calls/month (first 12 months)
- **DynamoDB:** 25 GB free storage, 25 read/write capacity units
- **SES:** 62,000 free emails/month (when sent from an EC2/Lambda)
- **Amplify Hosting:** 1,000 build minutes/month free, 15 GB served/month
