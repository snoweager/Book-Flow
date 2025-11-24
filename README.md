# Advanced Notification System - README

This repository implements an **Advanced Notification System** providing real-time notifications via **Email**, **SMS**, and **Push Notifications** for events such as booking confirmations, cancellations, reminders, and promotional offers.

## Contents of the uploaded project
The uploaded ZIP contained 106 files. Top-level files discovered (samples shown during inspection) include:
- Book_Flow_Task-2/.env
- Book_Flow_Task-2/README.md
- Book_Flow_Task-2/components.json
- Book_Flow_Task-2/eslint.config.js
- Book_Flow_Task-2/index.html
- Book_Flow_Task-2/package.json
- Book_Flow_Task-2/postcss.config.js
- Book_Flow_Task-2/public/robots.txt
- Book_Flow_Task-2/tsconfig.app.json
- Book_Flow_Task-2/tsconfig.json
- Book_Flow_Task-2/tsconfig.node.json

> *Note:* Full file list was extracted to `/mnt/data/Book_Flow_Task-2_inspected` on the server.

---

## Features
- Booking confirmation emails/SMS/push
- Cancellation notifications
- Reminders (configurable times before booking)
- Promotional offers (scheduled or triggered)
- Retry and failure handling with logging
- Configurable providers (SMTP/SendGrid, Twilio, Firebase/FCM or APNs)
- Environment-driven configuration for credentials and toggles
- Rate-limiting and batching options (recommended)

## How to run (local development)
1. Ensure you have Python 3.10+ (or Node.js if the repository is Node-based — see files).
2. Create a virtual environment and install dependencies.
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
   *If the project is Node-based:*
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables (see **Configuration** below).
4. Start the application:
   ```bash
   # Python/Flask/FastAPI example
   uvicorn app.main:app --reload
   ```
   or
   ```bash
   npm start
   ```

## Configuration (environment variables)
Typical variables expected:
- `ENV` - development|production
- Email provider:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
  - or `SENDGRID_API_KEY`
- SMS provider (e.g., Twilio):
  - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
- Push notifications (FCM/APNs):
  - `FCM_SERVER_KEY` or path to service account JSON `GOOGLE_APPLICATION_CREDENTIALS`
  - APNs keys/certificates for iOS
- `DATABASE_URL` - Postgres/Redis/other
- `REDIS_URL` - for rate-limiting & job queue
- `SENTRY_DSN` - optional for error tracking

## Endpoints (example)
The project likely exposes HTTP endpoints for:
- `POST /notifications/send` — generic notification
- `POST /bookings` — creates bookings and triggers confirmation notifications
- `POST /bookings/:id/cancel` — cancels booking and sends cancellation notices
- `POST /offers/send` — send promotional offers

Refer to the actual code in the repository for concrete routes.

## Testing
- Unit tests for notification templates and provider adapter code
- Integration tests using sandbox/test credentials for providers
- Local emulators for push/email where available (e.g., Mailtrap, Twilio Test Credentials)

## Security & Compliance
- Do not store plain provider credentials in source control.
- Use secrets manager (AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault) in production.
- Respect user opt-in/opt-out; implement unsubscribe endpoints for email and an opt-out preference for SMS/push.
- Rate-limit marketing/promotional messages to comply with local regulations (e.g., TCPA in US, TRAI in India).
- Use TLS for all network traffic.

## Operational considerations
- Use a background job queue (Celery/RQ/Bull) for sending messages.
- Implement exponential backoff and dead-letter queues for failed messages.
- Monitoring: instrument metrics for delivery rates, failures, latency.
- Cost controls: batch promotional messages, use regional providers where cheaper.

---
##Author
Padma Sindhoora Ayyagari

https://book-flows.netlify.app/

