# Real State Enterprise

Real State Enterprise is a full-stack application that helps users discover, browse, and rent apartments and houses. It provides search, property listings, property detail pages, authentication, and user flows for renters and property owners.

---

## Table of Contents

- [Demo / Screenshots](#demo--screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started (Development)](#getting-started-development)
  - [Prerequisites](#prerequisites)
  - [Environment variables](#environment-variables)
  - [Run locally (with Dockerized PostgreSQL)](#run-locally-with-dockerized-postgresql)
  - [Prisma (DB) commands](#prisma-db-commands)
- [Deployment Notes](#deployment-notes)
- [Testing](#testing)
- [Project structure (high level)](#project-structure-high-level)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo / Screenshots

Below are screenshots from the app (as provided):

![landing1](https://github.com/user-attachments/assets/4c58b3c9-6a00-4ef1-9c3a-bc86fdacef16)
![landing2](https://github.com/user-attachments/assets/4616ee6e-be9c-428b-a443-09a79dc0f58a)
![landing3](https://github.com/user-attachments/assets/8cbea22c-aad0-48a0-a469-b3fac80c3502)
![footer](https://github.com/user-attachments/assets/e107d056-264f-4597-9838-9a2d1552be88)
![search1](https://github.com/user-attachments/assets/a22908e2-15c8-4f21-a45c-42819570a095)
![search2](https://github.com/user-attachments/assets/f28a7168-4d3d-4b42-a7f3-b8faf3b52f80)
![search3](https://github.com/user-attachments/assets/46cbb807-38d5-4582-afd4-ab20953ed3a6)
![propertyoverview](https://github.com/user-attachments/assets/9e7e28ca-d738-4442-8aae-fb7059ab518f)
![Residence](https://github.com/user-attachments/assets/e3851526-551d-4630-8468-f93bffaab9d7)
![propertyDetails2](https://github.com/user-attachments/assets/207cb72c-21c0-48be-a0b4-e7ca741b52f2)

---

## Features

- Browse and search rental properties (filters for location, price, type, etc.)
- Property listing and property details pages with images and metadata
- Authentication and user sessions (AWS Cognito + aws-amplify)
- State management with Redux Toolkit
- Responsive UI using shadcn UI components and Lucide icons
- Backend REST API built with Express and Prisma ORM
- PostgreSQL database (containerized with Docker)
- Role considerations for renters and property owners (extendable)

---

## Tech Stack

- Frontend: Next.js (TypeScript)
- Backend: Express.js (TypeScript)
- Database: PostgreSQL (Docker container recommended)
- ORM: Prisma
- Auth & Cloud: AWS Amplify + AWS Cognito
- State: Redux Toolkit
- UI: shadcn UI, Lucide React
- Other: Docker, dotenv, ESLint/Prettier (if configured)

---

## Architecture Overview

- Next.js handles the frontend UI, server-side rendering where needed, and client-side pages.
- Express.js is a separate API server (could be hosted separately or proxied by Next in production).
- Prisma is used to model and interact with PostgreSQL.
- AWS Cognito + Amplify manage user accounts and authentication flows.
- PostgreSQL runs in Docker during development to provide a consistent local DB.

---

## Getting Started (Development)

### Prerequisites

- Node.js 18+ (or latest LTS)
- npm or pnpm or yarn
- Docker & docker-compose (for running Postgres locally)
- AWS CLI & Amplify CLI if you plan to run Amplify-related tasks locally

### Environment variables

Create `.env` files for the frontend and backend. Example variables (adjust names to your code):

- Backend (`/backend/.env` or root depending on repo layout)
  - DATABASE_URL=postgresql://user:password@localhost:5432/real_state_dev
  - PORT=4000
  - JWT_SECRET=replace_with_a_secure_secret
  - AWS_REGION=us-east-1
  - COGNITO_USER_POOL_ID=your_user_pool_id
  - COGNITO_CLIENT_ID=your_client_id
  - AWS_ACCESS_KEY_ID=...
  - AWS_SECRET_ACCESS_KEY=...

- Frontend (`/frontend/.env.local`)
  - NEXT_PUBLIC_AWS_REGION=us-east-1
  - NEXT_PUBLIC_COGNITO_USER_POOL_ID=your_user_pool_id
  - NEXT_PUBLIC_COGNITO_CLIENT_ID=your_client_id
  - NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

Make sure to never commit `.env*` files. Use GitHub secrets for CI and production envs.

### Run locally (with Dockerized PostgreSQL)

1. Start Postgres with docker-compose (create `docker-compose.yml` in repo root if not present):

```yaml
version: "3.8"
services:
  db:
    image: postgres:15
    restart: unless-stopped
    environment:
      POSTGRES_USER: realstate
      POSTGRES_PASSWORD: realstatepassword
      POSTGRES_DB: real_state_dev
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

2. Bring up the DB:

```bash
docker-compose up -d
```

3. Install dependencies and run backend and frontend (example commands — adjust to your repo structure):

```bash
# from repo root
# If project uses workspaces, run install once
npm install

# In one terminal: run backend
cd backend
npm run dev   # or: pnpm dev / yarn dev

# In another terminal: run frontend
cd frontend
npm run dev   # typically runs Next.js on http://localhost:3000
```

Ports:
- Frontend Next.js: http://localhost:3000
- Backend Express: http://localhost:4000

If you prefer, you can run both with a process manager (concurrently) or with a monorepo script.

### Prisma (DB) commands

- Generate Prisma client:

```bash
npx prisma generate
```

- Create and run migrations (development):

```bash
npx prisma migrate dev --name init
```

- Push Prisma schema to the database without creating a migration (useful in some dev workflows):

```bash
npx prisma db push
```

- Open Prisma Studio:

```bash
npx prisma studio
```

- Seed the database (if seed script exists):

```bash
npm run prisma:seed   # or: npx prisma db seed
```

---

## Deployment Notes

- Frontend: Deploy Next.js to Vercel or AWS Amplify (Vercel is straightforward for Next).
- Backend: Deploy Express to AWS Elastic Beanstalk, ECS, Heroku, or an Amplify-hosted backend (containerize if using ECS).
- Database: Use AWS RDS (Postgres) in production rather than a local Docker container.
- Authentication: Keep Cognito configuration (user pool ids, client id) secure. You can configure Amplify to manage hosting + backend if desired.

Suggested high-level flow:
- Host Next.js on Vercel (connect repo, set env vars in Vercel).
- Host Express API on ECS/EBS or a serverless option (adjust code to support serverless if needed).
- Use RDS for production DB and configure Prisma's DATABASE_URL accordingly.

---

## Testing

If tests are present, run:

```bash
# example
npm test
# or
npm run test:unit
```

Add unit and integration tests for API endpoints, UI components, and Redux slices. For E2E, consider Playwright or Cypress.

---

## Project structure (high level)

- /frontend - Next.js app (pages/app routes, components, styles)
- /backend - Express server, routes, controllers, Prisma client
- /prisma - Prisma schema, migrations (sometimes under backend)
- /docker-compose.yml - db service for local dev
- package.json (or workspaces) - scripts and dependencies

Adjust paths if your repository has a different layout.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository
2. Create a branch: `git checkout -b feat/short-description`
3. Implement changes and add tests
4. Open a Pull Request describing the change and why it's needed

Add issue templates and PR templates to help contributors if the project grows.

---

## Security & Best Practices

- Do not commit secrets or `.env` files.
- Use prepared statements/ORM (Prisma) to avoid SQL injection.
- Validate and sanitize incoming data on backend.
- Use HTTPS in production.
- Rotate AWS credentials and restrict IAM permissions for least privilege.

---

## License

This project is provided under the MIT license. Replace or modify as necessary.

---

## Contact

Project owner: obaidalqurshi

