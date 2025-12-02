# CodeTrack - DSA Problem Tracker

A comprehensive full-stack application for tracking and managing Data Structures and Algorithms (DSA) problems. Built with React frontend and Spring Boot backend, featuring JWT authentication, revision tracking, statistics, and multiple problem-solving approaches.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Configuration](#configuration)
- [Deployment](#deployment)

## ✨ Features

### Core Features
- ✅ **Problem Management**: Add, edit, delete, and organize DSA problems
- ✅ **Pattern Tracking**: Track problems by 18+ common DSA patterns
- ✅ **Revision System**: Automatic revision reminders based on spaced repetition
- ✅ **Multiple Approaches**: Store multiple solution approaches with code for each problem
- ✅ **Time Tracking**: Built-in timer to track time spent on problems
- ✅ **Rating System**: Rate problems (1-5 stars) after each revision
- ✅ **Priority System**: Categorize problems by priority (Low, Medium, High, Critical)
- ✅ **Tags System**: Add custom tags for better organization
- ✅ **Search & Filter**: Advanced search across title, notes, tags, platform, and links
- ✅ **Sorting**: Sort by date, title, difficulty, or revision count

### Statistics & Analytics
- 📊 **Dashboard**: Total problems, current streak, problems solved this week, needs revision
- 📈 **Charts**: Visual representation of problems over time, difficulty distribution, pattern breakdown
- 📅 **Calendar View**: Visual calendar showing problems solved on each day
- 📉 **Pattern Statistics**: Breakdown of problems by pattern with visual progress bars

### User Features
- 🔐 **JWT Authentication**: Secure login and registration
- 👤 **User Profiles**: Manage account settings
- 💾 **Export/Import**: Backup and restore your problem data
- 🔄 **Bulk Operations**: Select multiple problems for bulk actions
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Mobile Responsive**: Fully optimized for mobile devices

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts** - Chart library
- **Lucide React** - Icon library

### Backend
- **Spring Boot 3.2.0** - Java framework
- **Spring Data JPA** - Data persistence
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Token-based authentication
- **H2 Database** - Development database (in-memory)
- **PostgreSQL** - Production database
- **Maven** - Dependency management

## 📁 Project Structure

```
CodeTrack/
├── codetrack-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API service layer
│   │   └── App.jsx              # Main application component
│   └── package.json
│
├── codetrack-backend/           # Spring Boot backend application
│   ├── src/main/java/com/codetrack/
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic
│   │   ├── repository/          # Data access layer
│   │   ├── entity/              # JPA entities
│   │   ├── dto/                 # Data transfer objects
│   │   ├── config/              # Configuration classes
│   │   └── util/                # Utility classes
│   └── pom.xml
│
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **Java** (JDK 17 or higher)
- **Maven** (3.6 or higher)
- **PostgreSQL** (for production, optional for development)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd codetrack-backend
   ```

2. **Development Mode (H2 Database):**
   ```bash
   mvn spring-boot:run
   ```
   Backend runs on: `http://localhost:8086`

3. **Production Mode (PostgreSQL):**
   - Set up PostgreSQL database
   - Configure `application-prod.properties`
   - Set environment variables
   ```bash
   export SPRING_PROFILES_ACTIVE=prod
   mvn spring-boot:run
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd codetrack-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on: `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🗄 Database Schema

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for detailed database schema documentation.

### Quick Overview

- **users** - User accounts and authentication
- **problems** - Main problem records
- **solved_dates** - Revision history for each problem
- **problem_tags** - Tags associated with problems
- **problem_approaches** - Multiple solution approaches per problem

## 📡 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API documentation.

### Base URL
- Development: `http://localhost:8086/api`
- Production: `https://your-domain.com/api`

### Authentication
All problem endpoints require JWT authentication. Include token in header:
```
Authorization: Bearer <your-jwt-token>
```

## 🎨 Frontend Features

### Views
- **List View**: Grid layout of problem cards
- **Charts View**: Visual analytics and statistics
- **Calendar View**: Monthly calendar with problem activity

### Components
- Statistics Dashboard
- Pattern Statistics
- Problem Cards with actions
- Add/Edit Problem Forms
- Revision Modal with rating
- Timer Component
- Export/Import functionality
- Bulk Operations
- User Profile

## ⚙️ Configuration

### Backend Configuration

**Development (`application-dev.properties`):**
- H2 in-memory database
- H2 console enabled
- CORS for localhost:3000
- JWT secret for development

**Production (`application-prod.properties`):**
- PostgreSQL database
- Production CORS settings
- Environment-based JWT secret

### Frontend Configuration

**Vite Config (`vite.config.js`):**
- Proxy configuration for API calls
- Port: 3000
- Proxy target: http://localhost:8086

## 🔒 Security

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration
- Secure API endpoints
- Input validation

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 🚢 Deployment

### Backend Deployment
1. Build JAR file: `mvn clean package`
2. Set environment variables
3. Run: `java -jar target/codetrack-backend-1.0.0.jar`

### Frontend Deployment
1. Build: `npm run build`
2. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ for DSA enthusiasts**

