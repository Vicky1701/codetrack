# 🔍 How to View JWT Token

## Quick Methods to Check Your Token

### Method 1: In the App UI (Easiest) ⭐

1. **Login to the app**
2. **Look at the header** (top right)
3. **Click the "Token" button** (key icon)
4. **Token popup appears** showing your full JWT token
5. **Click copy icon** to copy token to clipboard

### Method 2: Browser Console

1. Open browser console (Press `F12` or `Cmd+Option+I` on Mac)
2. Go to **Console** tab
3. Type:
```javascript
localStorage.getItem('token')
```
4. Press Enter
5. Token will be displayed

### Method 3: Browser DevTools - Application Tab

1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. In left sidebar, expand **Local Storage**
4. Click on `http://localhost:3000`
5. Find the `token` key
6. Value shows your JWT token

### Method 4: Network Tab (See Token in Requests)

1. Open DevTools (F12)
2. Go to **Network** tab
3. Make any API call (e.g., add a problem)
4. Click on the request (e.g., `problems`)
5. Go to **Headers** section
6. Look for `Authorization` header
7. Value: `Bearer <your-token>`

### Method 5: Decode Token (See Contents)

1. Get your token using any method above
2. Visit: **https://jwt.io**
3. Paste your token in the "Encoded" section
4. You'll see:
   - **Header** - Algorithm and token type
   - **Payload** - Username, userId, expiration date
   - **Signature** - Verification signature

---

## 📍 JWT Secret Location

### Development
**File:** `codetrack-backend/src/main/resources/application-dev.properties`

**Line 37:**
```properties
jwt.secret=your-secret-key-for-development-min-256-bits-long-for-security-purposes-change-in-production
```

### Production
**File:** `codetrack-backend/src/main/resources/application-prod.properties`

**Line 44:**
```properties
jwt.secret=${JWT_SECRET:your-secret-key-change-in-production-min-256-bits}
```

**Note:** In production, use environment variable `JWT_SECRET`

---

## 🔐 Token Information

### What's Stored in Token?
- **Username** - Your login username
- **UserId** - Your user ID
- **Issued At** - When token was created
- **Expiration** - When token expires (24 hours)

### Token Format
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInN1YiI6InRlc3R1c2VyIiwiaWF0IjoxNzM1NzA4MDAwLCJleHAiOjE3MzU3OTQ0MDB9.signature
```

### Token Storage
- **Location:** Browser localStorage
- **Key:** `token`
- **Lifetime:** 24 hours (86400000 ms)

---

## 🛠️ Quick Commands

### View All Stored Data
```javascript
// In browser console
console.log('Token:', localStorage.getItem('token'))
console.log('Username:', localStorage.getItem('username'))
console.log('Email:', localStorage.getItem('email'))
console.log('UserId:', localStorage.getItem('userId'))
```

### Clear All Auth Data
```javascript
// In browser console
localStorage.removeItem('token')
localStorage.removeItem('username')
localStorage.removeItem('email')
localStorage.removeItem('userId')
```

---

## ✅ Recommended: Use UI Token Viewer

The easiest way is to use the **Token button in the header**:
1. Click the key icon (🔑) in the header
2. See your full token
3. Copy it with one click
4. Use it for testing API calls

---

## 🔒 Security Reminder

- ⚠️ **Never share your token publicly**
- ⚠️ **Tokens expire after 24 hours**
- ⚠️ **Change JWT secret for production**
- ✅ **Token is automatically included in API requests**

---

## 📝 Summary

**JWT Secret Location:**
- Development: `application-dev.properties` line 37
- Production: `application-prod.properties` line 44 (use env var)

**View Token:**
1. **Easiest:** Click "Token" button in header
2. **Console:** `localStorage.getItem('token')`
3. **DevTools:** Application → Local Storage → token
4. **Network:** Check Authorization header

**Decode Token:**
- Visit https://jwt.io and paste your token

