# Setup Guide

Complete step-by-step guide to set up and run CodeTrack on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Java JDK** (17 or higher) - [Download](https://adoptium.net/)
- **Maven** (3.6 or higher) - [Download](https://maven.apache.org/download.cgi)
- **Git** - [Download](https://git-scm.com/downloads)

### Verify Installations

```bash
# Check Node.js version
node --version  # Should be v18+

# Check npm version
npm --version

# Check Java version
java -version  # Should be JDK 17+

# Check Maven version
mvn --version  # Should be 3.6+
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Vicky1701/codetrack.git
cd codetrack
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd codetrack-backend

# Build the project (downloads dependencies)
mvn clean install

# Run the backend (development mode with H2 database)
mvn spring-boot:run
```

The backend will start on: **http://localhost:8086**

**Verify Backend:**
- Open: http://localhost:8086/api/health
- Should see: `{"status":"UP","timestamp":"..."}`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd codetrack-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on: **http://localhost:3000**

### 4. Access the Application

Open your browser and navigate to: **http://localhost:3000**

---

## 🔧 Detailed Setup

### Backend Configuration

#### Development Mode (H2 Database)

The backend is pre-configured for development with H2 in-memory database.

**Configuration File:** `codetrack-backend/src/main/resources/application-dev.properties`

```properties
# Database
spring.datasource.url=jdbc:h2:mem:codetrackdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (for debugging)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JWT
jwt.secret=your-secret-key-for-development-min-256-bits-long-for-security-purposes-change-in-production
jwt.expiration=86400000
```

**Access H2 Console:**
- URL: http://localhost:8086/h2-console
- JDBC URL: `jdbc:h2:mem:codetrackdb`
- Username: `sa`
- Password: (leave empty)

#### Production Mode (PostgreSQL)

1. **Install PostgreSQL:**
   ```bash
   # macOS
   brew install postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database:**
   ```sql
   CREATE DATABASE codetrackdb;
   CREATE USER codetrack_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE codetrackdb TO codetrack_user;
   ```

3. **Update Configuration:**
   Edit `application-prod.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/codetrackdb
   spring.datasource.username=codetrack_user
   spring.datasource.password=your_password
   ```

4. **Run with Production Profile:**
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=prod
   ```

### Frontend Configuration

#### Environment Variables

Create `.env` file in `codetrack-frontend/` (optional):

```env
VITE_API_URL=http://localhost:8086/api
```

#### Vite Configuration

The proxy is already configured in `vite.config.js`:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8086',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    }
  }
}
```

---

## 🧪 Testing the Setup

### 1. Test Backend API

```bash
# Health check
curl http://localhost:8086/api/health

# Expected response:
# {"status":"UP","timestamp":"2024-12-01T..."}
```

### 2. Test Frontend

1. Open http://localhost:3000
2. You should see the login page
3. Register a new account
4. Login with your credentials
5. You should see the dashboard

### 3. Test Full Flow

1. **Register:**
   - Click "Register"
   - Fill in username, email, password
   - Click "Register"

2. **Login:**
   - Enter credentials
   - Click "Login"

3. **Add Problem:**
   - Click "Add Problem"
   - Fill in required fields (Title, Pattern, Difficulty)
   - Optionally add approaches with code
   - Click "Save Problem"

4. **Mark Revision:**
   - Click "Revise" on a problem card
   - Add rating and/or time spent
   - Click "Mark Revision"

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8086 already in use:**
```bash
# Find process using port 8086
lsof -i :8086

# Kill the process
kill -9 <PID>

# Or change port in application.properties
server.port=8087
```

**Maven build fails:**
```bash
# Clean and rebuild
mvn clean install

# If still fails, check Java version
java -version  # Should be 17+
```

**Database connection error:**
- Check if PostgreSQL is running: `pg_isready`
- Verify database credentials in `application-prod.properties`
- Ensure database exists

### Frontend Issues

**npm install fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in vite.config.js
server: {
  port: 3001
}
```

**API calls fail:**
- Verify backend is running on port 8086
- Check browser console for CORS errors
- Verify proxy configuration in `vite.config.js`

**Module not found errors:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📦 Building for Production

### Backend

```bash
cd codetrack-backend

# Build JAR file
mvn clean package

# JAR will be in target/codetrack-backend-1.0.0.jar

# Run JAR
java -jar target/codetrack-backend-1.0.0.jar --spring.profiles.active=prod
```

### Frontend

```bash
cd codetrack-frontend

# Build for production
npm run build

# Output will be in dist/ directory
# Deploy dist/ to your hosting service (Vercel, Netlify, etc.)
```

---

## 🔐 Security Notes

### Development
- H2 database is in-memory (data lost on restart)
- JWT secret is in properties file (not secure for production)
- CORS allows localhost:3000

### Production
- Use environment variables for sensitive data
- Set strong JWT secret (256+ bits)
- Configure proper CORS for your domain
- Use HTTPS
- Enable database backups
- Set up proper firewall rules

---

## 📝 Next Steps

1. **Customize Configuration:**
   - Update JWT secret
   - Configure database
   - Set up environment variables

2. **Add Features:**
   - User profile updates
   - Password change
   - Email notifications

3. **Deploy:**
   - Backend: Deploy to cloud (AWS, Heroku, etc.)
   - Frontend: Deploy to static hosting (Vercel, Netlify)

---

## 🆘 Getting Help

If you encounter issues:

1. Check the console/terminal for error messages
2. Verify all prerequisites are installed correctly
3. Ensure ports are not in use
4. Check database connectivity (if using PostgreSQL)
5. Review configuration files

---

**Happy Coding! 🚀**

