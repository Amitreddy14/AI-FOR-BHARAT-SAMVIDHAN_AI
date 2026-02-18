# 🏛️ SamvidhanAI - Constitutional Rights Defender for Marginalized Communities

<div align="center">

![SamvidhanAI Banner](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![Voice First](https://img.shields.io/badge/Voice-First-green?style=for-the-badge)
![Impact](https://img.shields.io/badge/Impact-400M%2B%20Users-orange?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-22%2B-red?style=for-the-badge)

**Empowering 400 million Indians to claim their constitutional rights through AI-powered voice assistance**

</div>

## Overview

SamvidhanAI is a voice-first AI platform that democratizes access to government welfare schemes for India's 400M+ marginalized citizens. The system addresses the critical problem of ₹1.3 lakh crore in unclaimed welfare funds by providing an accessible, multi-language interface that guides users through scheme discovery, application, and tracking.

### Core Design Principles

1. **Voice-First**: All interactions prioritize voice over text, with voice as the primary interface
2. **Offline-Resilient**: System degrades gracefully to SMS/USSD when internet is unavailable
3. **Privacy-Preserving**: End-to-end encryption for sensitive data, federated learning for AI improvements
4. **Accessibility-Focused**: WCAG 2.1 AA compliant, works with assistive technologies
5. **Scalable**: Horizontally scalable microservices architecture supporting millions of users
6. **Government-Integrated**: Direct integration with DigiLocker, UMANG, Aadhaar eKYC

### System Context

The platform serves four primary user personas:
- **Illiterate domestic workers**: Feature phone, 2G connectivity, regional dialect speakers
- **Tribal farmers**: Basic smartphone, intermittent 3G, distrust of officials
- **Persons with disabilities**: Smartphone with screen reader, accessibility requirements
- **NGO field workers**: Manage 50+ families, need bulk operations and dashboards

### Technology Stack

**Backend:**
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **Cache/Queue**: Redis + Celery
- **Storage**: AWS S3 / GCP Cloud Storage

**AI/ML:**
- **LLM**: Claude API
- **Speech (STT/TTS)**: Bhashini API
- **RAG**: LangChain + Pinecone
- **OCR**: Tesseract + Google Vision API

**Frontend:**
- **Web**: Next.js 14 (React 18, TypeScript)
- **Mobile**: React Native
- **UI**: Tailwind CSS + shadcn/ui

**Communication:**
- **IVR**: Twilio / Exotel
- **WhatsApp**: WhatsApp Business API
- **SMS**: Twilio / AWS SNS

**Infrastructure:**
- **Cloud**: AWS / GCP
- **Containers**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## Components and Interfaces

### 1. Voice Service

**Responsibility**: Handle voice interactions, speech-to-text, text-to-speech, language detection

**Key Components:**
- `VoiceController`: REST endpoints for voice interactions
- `SpeechToTextAdapter`: Interface to Bhashini STT API
- `TextToSpeechAdapter`: Interface to Bhashini TTS API
- `LanguageDetector`: Identify spoken language from audio
- `AudioProcessor`: Handle audio format conversion, noise reduction

### 2. Discovery Service (Rights Discovery Engine)

**Responsibility**: Match users to eligible schemes, retrieve scheme information via RAG

**Key Components:**
- `DiscoveryController`: REST endpoints for scheme discovery
- `EligibilityMatcher`: Evaluate user profile against scheme criteria
- `RAGPipeline`: Retrieve and generate scheme information
- `SchemeRepository`: Database access for scheme data
- `VectorSearchAdapter`: Interface to Pinecone vector database

### 3. Application Service

**Responsibility**: Guide form filling, extract data, generate PDFs, submit to government portals

**Key Components:**
- `ApplicationController`: REST endpoints for application management
- `ConversationalFormFiller`: LLM-based form filling conversation
- `DataExtractor`: Extract structured data from voice/text
- `OCRProcessor`: Extract text from document images
- `FormGenerator`: Generate PDF forms from templates
- `GovernmentPortalAdapter`: Submit to DigiLocker, UMANG, etc.

### 4. Tracking Service

**Responsibility**: Monitor application status, scrape government portals, trigger escalations

**Key Components:**
- `TrackingController`: REST endpoints for status tracking
- `StatusScraper`: Scrape government portals for status updates
- `EscalationEngine`: Detect delays and trigger escalations
- `GrievanceGenerator`: Generate and file grievance applications
- `RTIGenerator`: Generate RTI applications

### 5. Community Service

**Responsibility**: Aggregate community statistics, detect patterns, enable peer support

**Key Components:**
- `CommunityController`: REST endpoints for community features
- `StatisticsAggregator`: Calculate community metrics
- `PatternDetector`: Detect corruption and anomalies
- `FederatedLearningCoordinator`: Privacy-preserving model updates
