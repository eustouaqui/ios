# Subscription App with Secure Receipt Validation

This project implements a complete subscription system with:
1. iOS app with StoreKit 2 integration
2. Web frontend for user registration and subscription management
3. Secure backend for receipt validation to prevent fraud

## Project Structure

```
SubscriptionApp/
├── iOS/                    # iOS app with StoreKit 2 integration
│   ├── SubscriptionApp/    # Main iOS app code
│   └── hack_ios/          # iOS app with relative paths
├── web-frontend/           # Web frontend for subscription management
│   ├── index.html          # Main landing page
│   ├── styles.css          # Styling
│   ├── script.js           # Client-side JavaScript
│   └── api-demo.html       # API demonstration page
├── backend/                # Secure backend for receipt validation
│   ├── src/
│   │   └── server.js       # Main server implementation
│   ├── package.json        # Node.js dependencies
│   ├── .env                # Environment variables
│   ├── README.md           # Backend documentation
│   └── test-api.js         # API testing script
└── README.md               # This file
```

## Features

### iOS App
- StoreKit 2 integration for subscription management
- 1-day free trial period
- Weekly, monthly, and annual subscription options
- Premium content access control
- Receipt validation with Apple App Store

### Web Frontend
- Modern, responsive design
- User authentication (login/signup)
- Free trial registration
- Subscription plan selection
- FAQ section with accordion
- API demonstration page

### Backend Server
- Secure JWT-based authentication
- Apple App Store receipt validation
- Google Play receipt validation
- Subscription status checking
- CORS support for web frontend integration
- Environment-based configuration

## Setup Instructions

### Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   APPLE_SHARED_SECRET=your-apple-shared-secret
   GOOGLE_API_KEY=your-google-api-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

### Web Frontend

1. Serve the frontend files using any web server:
   ```bash
   # Using Python (if installed)
   cd web-frontend
   python -m http.server 8000
   
   # Using Node.js (if http-server is installed)
   npx http-server web-frontend
   
   # Using PHP (if installed)
   cd web-frontend
   php -S localhost:8000
   ```

2. Open your browser and navigate to `http://localhost:8000`

### iOS App

1. Open the iOS project in Xcode:
   ```bash
   cd iOS/SubscriptionApp
   open SubscriptionApp.xcodeproj
   ```

2. Configure your Apple Developer account in Xcode

3. Set up In-App Purchase products in App Store Connect

4. Build and run the app on a simulator or device

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login and get JWT token

### Receipt Validation
- `POST /api/validate-apple-receipt` - Validate Apple App Store receipt
- `POST /api/validate-google-receipt` - Validate Google Play receipt

### Subscription
- `GET /api/subscription-status` - Check user's subscription status

## Security Features

1. **JWT Authentication**: All protected endpoints require a valid JWT token
2. **Environment Variables**: Sensitive data stored securely in environment variables
3. **HTTPS Ready**: Server can be easily configured to use HTTPS in production
4. **Input Validation**: All API endpoints validate input data
5. **Error Handling**: Comprehensive error handling to prevent information leakage

## Testing

### Backend API Testing

Run the provided test script to verify API functionality:
```bash
cd backend
node test-api.js
```

### Manual Testing

Use the API demo page (`web-frontend/api-demo.html`) to manually test the API endpoints.

## Deployment

### Backend Server

For production deployment:

1. Set strong environment variables:
   ```
   JWT_SECRET=your-very-long-random-secret
   APPLE_SHARED_SECRET=your-real-apple-shared-secret
   GOOGLE_API_KEY=your-real-google-api-key
   ```

2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start src/server.js
   ```

3. Set up reverse proxy with Nginx or Apache for HTTPS

### Web Frontend

Deploy the contents of the `web-frontend` directory to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Integration Guide

### iOS App Integration

1. Configure your In-App Purchase products in App Store Connect
2. Update product identifiers in the iOS app code
3. Implement receipt validation in your app using the backend API

### Web Frontend Integration

1. Update API endpoints in `script.js` to point to your backend server
2. Implement proper JWT token storage (localStorage or cookies)
3. Add actual API calls for user registration, login, and subscription management

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `.env` file
2. **JWT secret too weak**: Use a strong, random secret in production
3. **CORS errors**: Update CORS configuration in `server.js`
4. **Receipt validation fails**: Verify Apple/Google credentials are correct

### Getting Help

If you encounter issues:
1. Check the server console for error messages
2. Verify all environment variables are set correctly
3. Ensure the backend server is running
4. Check network connectivity between frontend and backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.