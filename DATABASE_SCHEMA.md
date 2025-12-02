# Database Schema Documentation

This document provides a comprehensive overview of the database schema used in CodeTrack, including table structures, relationships, and field explanations.

## 📊 Database Overview

CodeTrack uses **H2 Database** for development and **PostgreSQL** for production. The schema is managed through JPA entities with automatic table creation.

## 🗂️ Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│    users    │         │   problems   │         │ solved_dates │
├─────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)     │         │ id (PK)       │◄────────│ id (PK)       │
│ username    │         │ title        │         │ date          │
│ email       │         │ pattern      │         │ timeSpent     │
│ password    │         │ difficulty   │         │ rating        │
│ createdAt   │         │ platform     │         │ problem_id(FK)│
│ lastLogin   │         │ link         │         └──────────────┘
│ active      │         │ notes        │
└─────────────┘         │ priority     │         ┌──────────────────┐
                        │ revisionInt  │         │ problem_tags     │
                        │ revisionCount│         ├──────────────────┤
                        │ lastRevised  │         │ problem_id (FK)  │
                        │ createdAt    │         │ tag              │
                        │ totalTime    │         └──────────────────┘
                        │ avgRating    │
                        │              │         ┌──────────────────┐
                        │              │         │problem_approaches│
                        └──────────────┘         ├──────────────────┤
                                                 │ problem_id (FK)  │
                                                 │ notes            │
                                                 │ code             │
                                                 └──────────────────┘
```

## 📋 Table Details

### 1. `users` Table

Stores user account information and authentication data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier for each user |
| `username` | VARCHAR | UNIQUE, NOT NULL | User's unique username for login |
| `email` | VARCHAR | UNIQUE, NOT NULL | User's email address (unique) |
| `password` | VARCHAR | NOT NULL | Encrypted password (BCrypt hash) |
| `created_at` | TIMESTAMP | NOT NULL | Account creation timestamp |
| `last_login` | TIMESTAMP | NULLABLE | Last login timestamp |
| `active` | BOOLEAN | NOT NULL, DEFAULT true | Account status (active/inactive) |

**Why it's needed:**
- **id**: Primary key for unique identification and foreign key relationships
- **username**: Unique identifier for user login and display
- **email**: Used for account recovery and notifications (future feature)
- **password**: Securely stores encrypted password for authentication
- **created_at**: Tracks when user registered (audit trail)
- **last_login**: Useful for analytics and security monitoring
- **active**: Allows soft deletion and account management

**Indexes:**
- Primary key on `id`
- Unique index on `username`
- Unique index on `email`

---

### 2. `problems` Table

Main table storing DSA problem information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique problem identifier |
| `title` | VARCHAR | NOT NULL | Problem title/name |
| `pattern` | VARCHAR | NOT NULL | DSA pattern category (e.g., "Two Pointers") |
| `difficulty` | VARCHAR | NOT NULL | Difficulty level: Easy, Medium, Hard |
| `platform` | VARCHAR | NULLABLE | Platform name (LeetCode, HackerRank, etc.) |
| `link` | VARCHAR | NULLABLE | URL to the problem |
| `notes` | TEXT | NULLABLE | General notes about the problem |
| `priority` | VARCHAR | NULLABLE | Priority: Low, Medium, High, Critical |
| `revision_interval` | INTEGER | DEFAULT 7 | Days between revisions |
| `revision_count` | INTEGER | DEFAULT 0 | Number of times revised |
| `last_revised` | TIMESTAMP | NULLABLE | Last revision timestamp |
| `created_at` | TIMESTAMP | NOT NULL | Problem creation timestamp |
| `total_time_spent` | INTEGER | DEFAULT 0 | Total time spent (minutes) |
| `average_rating` | DOUBLE | DEFAULT 0.0 | Average rating (1-5 stars) |

**Why it's needed:**
- **id**: Primary key for relationships and API operations
- **title**: Identifies the problem
- **pattern**: Categorizes by DSA pattern for learning organization
- **difficulty**: Helps track progress and filter problems
- **platform**: Identifies where the problem is from
- **link**: Quick access to original problem
- **notes**: Store problem context, constraints, or observations
- **priority**: Helps prioritize which problems to focus on
- **revision_interval**: Customizable spaced repetition interval
- **revision_count**: Tracks how many times problem was revised
- **last_revised**: Used to calculate if revision is needed
- **created_at**: Tracks when problem was first solved
- **total_time_spent**: Aggregates time from all revisions
- **average_rating**: Tracks overall problem difficulty perception

**Indexes:**
- Primary key on `id`
- Consider indexes on `pattern`, `difficulty`, `last_revised` for query performance

---

### 3. `solved_dates` Table

Tracks revision history for each problem (one-to-many relationship).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique revision record identifier |
| `date` | TIMESTAMP | NOT NULL | Date when problem was solved/revised |
| `time_spent` | INTEGER | NULLABLE | Time spent in minutes for this revision |
| `rating` | INTEGER | NULLABLE | Rating (1-5 stars) for this revision |
| `problem_id` | BIGINT | FOREIGN KEY, NOT NULL | Reference to problems table |

**Why it's needed:**
- **id**: Primary key for unique identification
- **date**: Tracks each revision date (used for streak calculation)
- **time_spent**: Records time for each revision session
- **rating**: Allows rating to change over time as understanding improves
- **problem_id**: Links revision to specific problem

**Relationships:**
- Many-to-One with `problems` (CASCADE DELETE)

**Use Cases:**
- Calculate current streak (consecutive days with revisions)
- Track time spent per revision
- Calculate average rating over time
- Show revision history on calendar

---

### 4. `problem_tags` Table

Stores tags associated with problems (many-to-many relationship via element collection).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `problem_id` | BIGINT | FOREIGN KEY, NOT NULL | Reference to problems table |
| `tag` | VARCHAR | NOT NULL | Tag name |

**Why it's needed:**
- **problem_id**: Links tag to problem
- **tag**: Custom categorization (e.g., "array", "graph", "interview")

**Relationships:**
- Many-to-One with `problems` (CASCADE DELETE)

**Use Cases:**
- Filter problems by tags
- Search by tags
- Organize problems by topics

**Note:** This is an `@ElementCollection` table, automatically managed by JPA.

---

### 5. `problem_approaches` Table

Stores multiple solution approaches for each problem (embedded collection).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `problem_id` | BIGINT | FOREIGN KEY, NOT NULL | Reference to problems table |
| `notes` | TEXT | NULLABLE | Approach description, complexity analysis |
| `code` | TEXT | NULLABLE | Solution code for this approach |

**Why it's needed:**
- **problem_id**: Links approach to problem
- **notes**: Describe the approach, time/space complexity, trade-offs
- **code**: Store actual solution code with proper formatting

**Relationships:**
- Many-to-One with `problems` (CASCADE DELETE)

**Use Cases:**
- Store multiple solutions (brute force, optimized, etc.)
- Compare different approaches
- Reference code during revisions

**Note:** This is an `@ElementCollection` with `@Embeddable` Approach class.

---

## 🔗 Relationships

### One-to-Many Relationships

1. **Problem → SolvedDate**
   - One problem can have many revision records
   - Cascade: ALL (deleting problem deletes all revisions)
   - Fetch: LAZY (loads on demand)

2. **Problem → Tags** (Element Collection)
   - One problem can have many tags
   - Stored in separate `problem_tags` table

3. **Problem → Approaches** (Element Collection)
   - One problem can have many approaches
   - Stored in separate `problem_approaches` table

### User Relationship (Future Enhancement)

Currently, problems are not directly linked to users. For multi-user support, add:
```sql
ALTER TABLE problems ADD COLUMN user_id BIGINT;
ALTER TABLE problems ADD FOREIGN KEY (user_id) REFERENCES users(id);
```

## 📈 Database Design Decisions

### Why Separate `solved_dates` Table?

- **Historical Tracking**: Preserves complete revision history
- **Analytics**: Enables streak calculation, time tracking per revision
- **Flexibility**: Allows multiple revisions per day
- **Data Integrity**: Maintains revision data even if problem is updated

### Why Element Collections for Tags and Approaches?

- **Simplicity**: No need for separate entity classes
- **Performance**: Efficient for simple collections
- **Automatic Management**: JPA handles table creation and relationships

### Why TEXT for Notes and Code?

- **Flexibility**: No length restrictions
- **Code Storage**: Can store large code blocks
- **Future-Proof**: Supports markdown, formatted code

## 🔍 Query Optimization

### Recommended Indexes

```sql
-- For pattern filtering
CREATE INDEX idx_problems_pattern ON problems(pattern);

-- For difficulty filtering
CREATE INDEX idx_problems_difficulty ON problems(difficulty);

-- For revision queries
CREATE INDEX idx_problems_last_revised ON problems(last_revised);

-- For solved dates queries
CREATE INDEX idx_solved_dates_date ON solved_dates(date);
CREATE INDEX idx_solved_dates_problem_id ON solved_dates(problem_id);
```

### Common Queries

1. **Problems needing revision:**
   ```sql
   SELECT * FROM problems 
   WHERE last_revised IS NULL 
   OR last_revised < DATE_SUB(NOW(), INTERVAL revision_interval DAY);
   ```

2. **Problems solved this week:**
   ```sql
   SELECT DISTINCT p.* FROM problems p
   JOIN solved_dates sd ON p.id = sd.problem_id
   WHERE sd.date >= DATE_SUB(NOW(), INTERVAL 7 DAY);
   ```

3. **Current streak calculation:**
   ```sql
   SELECT COUNT(DISTINCT DATE(date)) as streak_days
   FROM solved_dates
   WHERE date >= (SELECT MAX(date) FROM solved_dates WHERE date <= NOW())
   ORDER BY date DESC;
   ```

## 🛠️ Database Migrations

### Development (H2)
- Tables are auto-created on application startup
- Data is in-memory (lost on restart)
- H2 Console available at `/h2-console`

### Production (PostgreSQL)
- Use Flyway or Liquibase for migrations
- Manual schema creation recommended for production
- Backup strategy essential

## 📝 Data Types Summary

| Type | Usage | Reason |
|------|-------|--------|
| BIGINT | IDs | Large range, auto-increment support |
| VARCHAR | Short text | Usernames, titles, patterns |
| TEXT | Long text | Notes, code, descriptions |
| TIMESTAMP | Dates | Precise date/time tracking |
| INTEGER | Counts, time | Numeric values, minutes |
| DOUBLE | Ratings | Decimal precision for averages |
| BOOLEAN | Flags | Simple true/false values |

---

**Last Updated:** 2024-12-01
**Database Version:** 1.0.0

