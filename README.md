<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Task Management API

A RESTful API built with NestJS for managing tasks with user authentication and PostgreSQL database.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Task filtering and search
- PostgreSQL database integration
- Docker support for development and production
- Environment-based configuration

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Environment Setup

Create the following environment files in the root directory:

### `.env.development`

```bash
NODE_ENV=development
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=task-management
JWT_SECRET=your_development_secret
JWT_EXPIRES_IN=3600
```

### `.env.production`

```bash
NODE_ENV=production
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=your_prod_username
DB_PASSWORD=your_prod_password
DB_DATABASE=your_prod_database
JWT_SECRET=your_production_secret
JWT_EXPIRES_IN=3600
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
$ npm install
```

## Running with Docker

### Development Mode

```bash
# Build and start development containers
$ npm run podman:dev:build

# Start existing containers
$ npm run podman:dev
```

### Production Mode

```bash
# Build and start production containers
$ npm run podman:prod:build

# Start existing containers
$ npm run podman:prod
```

## Running Locally

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login and receive JWT token

### Tasks

- `GET /tasks` - Get all tasks (with optional filters)
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete a task

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Docker Configuration

The application includes two Docker configurations:

### Development (Dockerfile.dev)

- Hot-reloading enabled
- Volume mounting for live code updates
- Development dependencies included

### Production (Dockerfile)

- Multi-stage build process
- PM2 process manager for clustering
- Only production dependencies included
- Optimized for performance

## Database

The application uses PostgreSQL with TypeORM. Database configuration can be found in:

```typescript:src/config/configuration.ts
startLine: 1
endLine: 17
```

## Project Structure

- `src/auth` - Authentication related files
- `src/tasks` - Task management functionality
- `src/config` - Configuration and environment setup
- `src/transform.interceptor.ts` - Response transformation

## Support

For questions and support, please open an issue in the repository.

## License

This project is MIT licensed.

```

This README now better reflects your actual implementation, including the Docker setup, environment configuration, and specific features of your task management application. I've referenced the actual configuration files and structure from your codebase while providing clear instructions for setup and usage.
```
