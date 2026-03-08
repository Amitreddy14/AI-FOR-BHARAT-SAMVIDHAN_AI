# SamvidhanAI
### AI-Powered Voice Assistant for Government Scheme Access

SamvidhanAI is an **AI-powered voice-first platform** that helps citizens easily **discover, apply for, and track government welfare schemes**.

The platform simplifies complex government processes using **Artificial Intelligence, Voice Interaction, and Serverless AWS Architecture**.

The goal of SamvidhanAI is to **make government welfare services accessible, transparent, and easy to use for every citizen.**

---

# 📌 Problem Statement

Many citizens are **unaware of government welfare schemes** they are eligible for.

Even when they know about them, the **application process is complex** and requires navigating multiple government portals.

This creates barriers especially for:

- Rural populations
- Non-technical users
- Citizens unfamiliar with digital government systems

---

# 💡 Solution

SamvidhanAI allows users to **simply speak or type their needs**, and the system will:

1. Understand the request using AI
2. Identify relevant government schemes
3. Guide the user through the application process
4. Generate an official application document
5. Allow the user to track application status

---

# 🚀 Key Features

🎤 **Voice-Based Interaction**  
Users can interact with the system using voice or text queries.

🤖 **AI-Powered Scheme Identification**  
Amazon Bedrock analyzes user queries to detect relevant government schemes.

📝 **Smart Application Generation**  
The system collects user details and generates an application automatically.

📄 **Official PDF Generation**  
A government-style PDF document is generated with QR verification.

📊 **Application Tracking Dashboard**  
Users can monitor the progress of their applications.

🔐 **Secure Authentication**  
User identity and login are handled securely through AWS Cognito.

☁️ **Serverless Architecture**  
Built using scalable AWS services ensuring reliability and cost efficiency.

---

# 🏗 System Architecture

The system uses a **serverless AWS architecture**.

User (Voice / Text)


AWS Amplify (Frontend Hosting)


Amazon Cognito (Authentication)


Amazon API Gateway


AWS Lambda (Backend Processing)


├── Amazon Bedrock (AI Processing)

├── Amazon DynamoDB (Application Data)

└── Amazon S3 (PDF Storage)


**AWS IAM** manages secure permissions between services.

---

# 🛠 Technologies Used

## Frontend
- Next.js
- React
- TypeScript
- TailwindCSS
- Web Speech API

## Backend
- AWS Lambda
- Amazon API Gateway
- Amazon Bedrock (Nova Pro)

## Database & Storage
- Amazon DynamoDB
- Amazon S3

## Authentication
- Amazon Cognito

## Deployment
- AWS Amplify

## Libraries
- PDFKit (PDF generation)
- QRCode (QR verification)
- AWS SDK

---

# ☁️ AWS Services Used

| AWS Service | Purpose |
|-------------|--------|
| AWS Amplify | Frontend hosting and CI/CD |
| Amazon Cognito | User authentication and email OTP verification |
| Amazon API Gateway | API management |
| AWS Lambda | Serverless backend functions |
| Amazon Bedrock | AI model for natural language understanding |
| Amazon DynamoDB | Application and scheme database |
| Amazon S3 | Storage for generated PDFs |
| AWS IAM | Secure permissions between services |

---

# 🔮 Future Enhancements

- Multilingual support for more Indian languages
- Mobile application for Android and iOS
- Integration with official government portals
- AI-based eligibility prediction
- DigiLocker integration for document verification

---

# 👨‍💻 Project Developed For

**SamvidhanAI**  
AI-driven platform to simplify access to government welfare schemes.

Built using **AWS Serverless Architecture + AI (Amazon Bedrock)**.

---
