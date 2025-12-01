# JWT Secret Configuration Location

## 📍 Where JWT Secret is Configured

### Development (Current)
**File:** `codetrack-backend/src/main/resources/application-dev.properties`

```properties
jwt.secret=your-secret-key-for-development-min-256-bits-long-for-security-purposes-change-in-production
jwt.expiration=86400000
```

### Production
**File:** `codetrack-backend/src/main/resources/application-prod.properties`

```properties
jwt.secret=${JWT_SECRET:your-secret-key-change-in-production-min-256-bits}
jwt.expiration=86400000
```

**Note:** In production, use environment variable `JWT_SECRET` instead of hardcoding.

---

## 🔍 Where to Check/View Token

### Method 1: Browser Console (Easiest)
1. Open browser console (F12)
2. Go to Console tab
3. Type:
```javascript
localStorage.getItem('token')
```
4. Press Enter - you'll see your token

### Method 2: Browser DevTools
1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage** → `http://localhost:3000`
4. Look for key: `token`
5. Value shows your JWT token

### Method 3: In the App UI
- Token is displayed in the header (see below)
- Click on your username to see token details

### Method 4: Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Make any API request
4. Click on the request
5. Go to **Headers** section
6. Look for `Authorization: Bearer <token>`

---

## 🔐 Token Storage

The token is stored in:
- **Location:** Browser's localStorage
- **Key:** `token`
- **Format:** JWT string (e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

Other stored data:
- `username` - Your username
- `email` - Your email
- `userId` - Your user ID

---

## 🛠️ Generate a Strong JWT Secret

For production, generate a strong secret:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Then update `application-prod.properties`:
```properties
jwt.secret=${JWT_SECRET}
```

And set environment variable:
```bash
export JWT_SECRET=<your-generated-secret>
```

---

## 📝 Current Configuration

**Development Secret:**
- Location: `application-dev.properties` line 37
- Current value: `your-secret-key-for-development-min-256-bits-long-for-security-purposes-change-in-production`
- ⚠️ **Change this for production!**

**Token Expiration:**
- 86400000 milliseconds = 24 hours

---

## ✅ Quick Check Commands

### View Token in Console
```javascript
// In browser console
console.log('Token:', localStorage.getItem('token'))
console.log('User:', localStorage.getItem('username'))
```

### Decode Token (for debugging)
Visit: https://jwt.io
Paste your token to see:
- Header
- Payload (username, userId, expiration)
- Signature

---

## 🔒 Security Notes

1. **Never commit real secrets to Git**
2. **Use environment variables in production**
3. **Generate strong random secrets**
4. **Minimum 256 bits (32 bytes) for HS256**
5. **Rotate secrets periodically**

