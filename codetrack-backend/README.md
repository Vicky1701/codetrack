# CodeTrack Backend

Spring Boot REST API for DSA Problem Tracker - Production Ready

## 🚀 Quick Start

### Development Mode (H2 Database)

```bash
# Run with development profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Or set environment variable
export SPRING_PROFILES_ACTIVE=dev
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

### Production Mode (PostgreSQL)

1. **Set up PostgreSQL database** (see DEPLOYMENT.md)

2. **Set environment variables:**
   ```bash
   export DATABASE_URL=jdbc:postgresql://localhost:5432/codetrackdb
   export DB_USERNAME=postgres
   export DB_PASSWORD=yourpassword
   export SPRING_PROFILES_ACTIVE=prod
   export JWT_SECRET=your-secret-key-256-bits-minimum
   ```

3. **Run:**
   ```bash
   mvn clean package
   java -jar target/codetrack-backend-1.0.0.jar
   ```

## 📋 Features

- ✅ RESTful API with full CRUD operations
- ✅ PostgreSQL support (production)
- ✅ H2 database (development)
- ✅ Spring Security (configurable)
- ✅ CORS configuration
- ✅ Global exception handling
- ✅ Health check endpoint
- ✅ Environment-based configuration
- ✅ Production-ready setup

## 🔧 Configuration

### Profiles

- **dev** - Development with H2 database
- **prod** - Production with PostgreSQL

### Environment Variables

See `.env.example` for all available variables.

Key variables:
- `DATABASE_URL` - Database connection string
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT secret key (256+ bits)
- `FRONTEND_URL` - Frontend URL for CORS
- `SPRING_PROFILES_ACTIVE` - Active profile (dev/prod)

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Health status

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/{id}` - Get problem by ID
- `POST /api/problems` - Create new problem
- `PUT /api/problems/{id}` - Update problem
- `DELETE /api/problems/{id}` - Delete problem
- `POST /api/problems/{id}/revision` - Mark problem as revised

## 🗄️ Database

### Development (H2)
- In-memory database
- Access console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:codetrackdb`
- Username: `sa`
- Password: (empty)

### Production (PostgreSQL)
- Configure via environment variables
- Recommended free providers: Railway, Supabase, Render

## 🔒 Security

### Development
- Security disabled by default
- CORS enabled for localhost:3000

### Production
- Security enabled
- CORS configured via `FRONTEND_URL`
- JWT support (ready for authentication)

## 🛠️ Build & Deploy

### Build
```bash
mvn clean package
```

### Run JAR
```bash
java -jar target/codetrack-backend-1.0.0.jar
```

### Docker (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/codetrack-backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 📚 Documentation

- **Setup Guide:** See `../SETUP.md`
- **Deployment Guide:** See `../DEPLOYMENT.md`
- **Project Documentation:** See `../ProjectSloution.md`

## 🐛 Troubleshooting

### Port already in use
```bash
# Change port in application.properties or set PORT env variable
export PORT=8081
```

### Database connection fails
- Verify connection string
- Check credentials
- Ensure database is running
- Check firewall rules

### CORS errors
- Update `FRONTEND_URL` environment variable
- Restart application
- Check CORS configuration in SecurityConfig

## 📝 License

MIT License
