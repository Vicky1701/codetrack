    FRONTEND (React)                 │
│  Port: 3000                                 │
│  - React Components                         │
│  - Tailwind CSS                             │
│  - Axios for API calls                      │
└─────────────────┬───────────────────────────┘
                  │
                  │ REST API (JSON)
                  │
┌─────────────────▼───────────────────────────┐
│         BACKEND (Spring Boot)               │
│  Port: 8080                                 │
│  - REST Controllers                         │
│  - Service Layer                            │
│  - Repository Layer                         │
└─────────────────┬───────────────────────────┘
                  │
                  │ JPA/Hibernate
                  │
┌─────────────────▼───────────────────────────┐
│          DATABASE (MySQL/PostgreSQL)        │
│  - Problems Table                           │
│  - SolvedDates Table                        │
└─────────────────────────────────────────────┘