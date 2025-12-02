# API Documentation

Complete API documentation for CodeTrack backend endpoints.

## Base URL

- **Development:** `http://localhost:8086/api`
- **Production:** `https://your-domain.com/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Use the returned token in subsequent requests

---

## 🔐 Authentication Endpoints

### Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "username": "john_doe"
}
```

**Error Responses:**
- `400 Bad Request` - Validation error or username/email already exists
- `500 Internal Server Error` - Server error

---

### Login

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com",
  "userId": 1
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing fields

---

## 📚 Problem Endpoints

### Get All Problems

**Endpoint:** `GET /api/problems`

**Description:** Retrieve all problems for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Two Sum",
    "pattern": "Two Pointers",
    "difficulty": "Easy",
    "platform": "LeetCode",
    "link": "https://leetcode.com/problems/two-sum",
    "notes": "Classic hash map problem",
    "tags": ["array", "hashmap"],
    "priority": "Medium",
    "revisionInterval": 7,
    "revisionCount": 2,
    "lastRevised": "2024-12-01T10:30:00",
    "createdAt": "2024-11-15T08:00:00",
    "totalTimeSpent": 45,
    "averageRating": 4.5,
    "solvedDates": [
      {
        "date": "2024-11-15T08:00:00",
        "timeSpent": 20,
        "rating": 4
      },
      {
        "date": "2024-12-01T10:30:00",
        "timeSpent": 25,
        "rating": 5
      }
    ],
    "approaches": [
      {
        "notes": "Brute force O(n²) approach",
        "code": "function twoSum(nums, target) {\n  // code here\n}"
      }
    ]
  }
]
```

**Error Responses:**
- `401 Unauthorized` - Missing or invalid token

---

### Get Problem by ID

**Endpoint:** `GET /api/problems/{id}`

**Description:** Retrieve a specific problem by ID.

**Path Parameters:**
- `id` (Long) - Problem ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Two Sum",
  ...
}
```

**Error Responses:**
- `404 Not Found` - Problem not found
- `401 Unauthorized` - Missing or invalid token

---

### Create Problem

**Endpoint:** `POST /api/problems`

**Description:** Create a new problem.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Container With Most Water",
  "pattern": "Two Pointers",
  "difficulty": "Medium",
  "platform": "LeetCode",
  "link": "https://leetcode.com/problems/container-with-most-water",
  "notes": "Use two pointers from both ends",
  "tags": ["array", "two-pointers"],
  "priority": "High",
  "revisionInterval": 7,
  "approaches": [
    {
      "notes": "Two pointer approach, O(n) time, O(1) space",
      "code": "function maxArea(height) {\n  let left = 0;\n  let right = height.length - 1;\n  let max = 0;\n  \n  while (left < right) {\n    const area = Math.min(height[left], height[right]) * (right - left);\n    max = Math.max(max, area);\n    \n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n  \n  return max;\n}"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "Container With Most Water",
  "revisionCount": 0,
  "totalTimeSpent": 0,
  "averageRating": 0.0,
  "createdAt": "2024-12-01T12:00:00",
  ...
}
```

**Error Responses:**
- `400 Bad Request` - Validation error or missing required fields
- `401 Unauthorized` - Missing or invalid token

**Required Fields:**
- `title` (String)
- `pattern` (String)
- `difficulty` (String: "Easy", "Medium", or "Hard")

---

### Update Problem

**Endpoint:** `PUT /api/problems/{id}`

**Description:** Update an existing problem.

**Path Parameters:**
- `id` (Long) - Problem ID

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "pattern": "Two Pointers",
  "difficulty": "Medium",
  "notes": "Updated notes",
  "tags": ["array"],
  "priority": "High",
  "revisionInterval": 14,
  "approaches": [...]
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Title",
  ...
}
```

**Error Responses:**
- `404 Not Found` - Problem not found
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token

**Note:** Revision history (`solvedDates`) is preserved during update.

---

### Delete Problem

**Endpoint:** `DELETE /api/problems/{id}`

**Description:** Delete a problem and all associated data.

**Path Parameters:**
- `id` (Long) - Problem ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (204 No Content):**
- Empty response body

**Error Responses:**
- `404 Not Found` - Problem not found
- `401 Unauthorized` - Missing or invalid token
- `500 Internal Server Error` - Server error

**Note:** This will cascade delete:
- All revision records (`solved_dates`)
- All tags (`problem_tags`)
- All approaches (`problem_approaches`)

---

### Mark Revision

**Endpoint:** `POST /api/problems/{id}/revision`

**Description:** Record a revision for a problem (solved again).

**Path Parameters:**
- `id` (Long) - Problem ID

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "date": "2024-12-01T14:30:00",
  "timeSpent": 15,
  "rating": 5
}
```

**All fields are optional:**
- `date` (String, ISO 8601) - Defaults to current time
- `timeSpent` (Integer, minutes) - Optional
- `rating` (Integer, 1-5) - Optional

**Response (200 OK):**
```json
{
  "id": 1,
  "revisionCount": 3,
  "lastRevised": "2024-12-01T14:30:00",
  "totalTimeSpent": 60,
  "averageRating": 4.7,
  "solvedDates": [
    ...
  ]
}
```

**What happens:**
- Adds new entry to `solved_dates`
- Increments `revisionCount`
- Updates `lastRevised` timestamp
- Adds `timeSpent` to `totalTimeSpent`
- Recalculates `averageRating` from all ratings

**Error Responses:**
- `404 Not Found` - Problem not found
- `401 Unauthorized` - Missing or invalid token
- `400 Bad Request` - Invalid rating (must be 1-5)

---

## 🏥 Health Check

### Health Status

**Endpoint:** `GET /api/health`

**Description:** Check API health status.

**No authentication required.**

**Response (200 OK):**
```json
{
  "status": "UP",
  "timestamp": "2024-12-01T12:00:00"
}
```

---

## 📊 Response Formats

### Success Response
- **200 OK** - Successful GET, PUT, POST (with body)
- **201 Created** - Successful POST (resource created)
- **204 No Content** - Successful DELETE

### Error Response Format
```json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "timestamp": "2024-12-01T12:00:00",
  "status": 400
}
```

### Common Error Codes
- **400 Bad Request** - Invalid request data
- **401 Unauthorized** - Missing or invalid authentication
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## 🔄 Data Flow

### Creating a Problem
1. Frontend sends POST request with problem data
2. Backend validates data
3. Creates problem entity
4. Creates initial `solved_dates` entry
5. Returns created problem with ID

### Marking Revision
1. Frontend sends POST to `/problems/{id}/revision`
2. Backend creates new `solved_dates` entry
3. Updates problem statistics:
   - `revisionCount++`
   - `lastRevised = now()`
   - `totalTimeSpent += timeSpent`
   - `averageRating = average of all ratings`

### Updating Problem
1. Frontend sends PUT with updated data
2. Backend updates problem fields
3. **Preserves** revision history
4. Returns updated problem

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8086/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8086/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Get All Problems
```bash
curl -X GET http://localhost:8086/api/problems \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Problem
```bash
curl -X POST http://localhost:8086/api/problems \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Problem",
    "pattern": "Two Pointers",
    "difficulty": "Easy"
  }'
```

### Mark Revision
```bash
curl -X POST http://localhost:8086/api/problems/1/revision \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "timeSpent": 10,
    "rating": 4
  }'
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Time is stored in minutes
- Ratings are integers from 1 to 5
- JWT tokens expire (check `application.properties` for expiration time)
- CORS is configured for `http://localhost:3000` in development

---

**Last Updated:** 2024-12-01
**API Version:** 1.0.0

