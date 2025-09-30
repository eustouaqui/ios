# Mind Reprogramming Backend

This is the backend API for the Mind Reprogramming iOS application. It provides user management, affirmation storage, and other core functionality.

## 🚀 Tech Stack

- **Node.js** with Express.js
- **MongoDB** via MongoDB Atlas
- **Render.com** for deployment

## 📦 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Update the values in `.env` with your:
- MongoDB Atlas connection string
- Other environment-specific variables

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Production Server
```bash
npm start
```

## 🔄 API Endpoints

### Health Check
- `GET /health` - Basic health check to prevent service suspension
- `GET /api/health` - Detailed API health status

### User Management
- `POST /api/users` - Create a new user
- `GET /api/users/:email` - Get user by email

### Affirmations
- `POST /api/affirmations` - Save user affirmation
- `GET /api/affirmations/user/:userId` - Get affirmations by user ID

## 🚀 Deployment to Render

1. Push code to GitHub
2. Connect Render to your GitHub repository
3. Set up environment variables in Render dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `NODE_ENV` - Set to `production`
4. Deploy!

## 🛠️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB Atlas connection string | mongodb+srv://... |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |

## 📝 Notes

- The `/health` endpoint should be pinged regularly to prevent Render from suspending the free tier service
- MongoDB Atlas free tier provides 512MB storage
- Rate limits may apply depending on the services used