# 🐳 Docker Deployment Guide

## Quick Start

### Prerequisites

- Docker Desktop installed
- Docker Compose installed

### 1. Configure Environment Variables

Copy the example environment file and configure your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your Hugging Face API key:

```
HUGGINGFACE_API_KEY=your-actual-api-key-here
```

### 2. Build and Run

Start all services with a single command:

```bash
docker-compose up --build
```

Or run in detached mode:

```bash
docker-compose up -d --build
```

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5222
- **Database**: localhost:3306

## Services

### 🗄️ MySQL Database

- **Container**: `triply-mysql`
- **Port**: 3306
- **Database**: triply
- **User**: triply_user
- **Password**: triply_password

### ⚙️ Backend (.NET API)

- **Container**: `triply-backend`
- **Port**: 5222
- **Environment**: Production

### 🎨 Frontend (React + Nginx)

- **Container**: `triply-frontend`
- **Port**: 5173 (mapped to 80 internally)

## Useful Commands

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Stop services

```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes database data)

```bash
docker-compose down -v
```

### Rebuild specific service

```bash
docker-compose up -d --build backend
```

### Access database

```bash
docker exec -it triply-mysql mysql -u triply_user -ptriply_password triply
```

### View running containers

```bash
docker-compose ps
```

## Troubleshooting

### Database connection issues

If the backend can't connect to the database:

1. Check if MySQL is healthy: `docker-compose ps`
2. View MySQL logs: `docker-compose logs mysql`
3. Ensure the database initialized: `docker exec -it triply-mysql mysql -u root -prootpassword -e "SHOW DATABASES;"`

### Frontend can't reach backend

1. Check backend is running: `docker-compose ps`
2. Test backend directly: `curl http://localhost:5222/api/trip`
3. Check frontend environment variables in the build

### Port conflicts

If ports 3306, 5222, or 5173 are already in use:

1. Stop other services using those ports
2. Or modify ports in `docker-compose.yml`

### Rebuild from scratch

```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## Development vs Production

### Development

For development, continue using:

```bash
# Backend
cd server && dotnet run

# Frontend
cd client-triply && npm run dev
```

### Production

Use Docker for production deployment:

```bash
docker-compose up -d
```

## Database Persistence

Database data is stored in a Docker volume named `mysql_data`. This persists even when containers are stopped.

To backup the database:

```bash
docker exec triply-mysql mysqldump -u triply_user -ptriply_password triply > backup.sql
```

To restore:

```bash
docker exec -i triply-mysql mysql -u triply_user -ptriply_password triply < backup.sql
```
