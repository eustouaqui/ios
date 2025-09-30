# Dia 3: Configurar Backend Gratuito

## 1. Criar conta no MongoDB Atlas

### Passos:
1. Acessar: https://www.mongodb.com/atlas
2. Criar conta gratuita
3. Criar cluster M0 free
4. Configurar acesso de IP (adicionar 0.0.0.0/0 para acesso de qualquer lugar)
5. Criar usuário de database
6. Obter string de conexão

### Exemplo de string de conexão:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/subscriptionapp?retryWrites=true&w=majority
```

## 2. Preparar backend para deploy

### Atualizar server.js:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/subscriptionapp';
mongoose.connect(MONGODB_URI);

// Models
const User = mongoose.model('User', {
  email: String,
  name: String,
  password: String
});

const Subscription = mongoose.model('Subscription', {
  userId: String,
  productID: String,
  expirationDate: Date,
  isTrial: Boolean,
  platform: String,
  validatedAt: Date
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', environment: process.env.NODE_ENV });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Atualizar package.json para Render:

```json
{
  "name": "mindreprogramming-backend",
  "version": "1.0.0",
  "description": "Backend for Mind Reprogramming app",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.0",
    "bcrypt": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

## 3. Configurar variáveis de ambiente

### Criar .env file:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/subscriptionapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
```

## 4. Preparar para deploy

### Estrutura de pastas:
```
backend/
├── server.js
├── package.json
├── .env (não incluir no git)
├── .gitignore
└── README.md
```

### .gitignore:
```
node_modules/
.env
*.log
```