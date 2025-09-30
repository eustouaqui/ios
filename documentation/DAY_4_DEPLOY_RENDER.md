# Dia 4: Deploy no Render

## 1. Criar repositório GitHub

```bash
# Navegar até a pasta do backend
cd backend

# Inicializar git
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Conectar ao repositório remoto (substituir com seu repositório)
git remote add origin https://github.com/seu-user/mindreprogramming-backend.git
git push -u origin main
```

## 2. Deploy no Render

### Passos:
1. Acessar https://render.com
2. Criar conta (pode usar GitHub para login)
3. Conectar conta GitHub
4. Selecionar repositório
5. Configurar serviço Web Service:
   - Name: mindreprogramming-backend
   - Region: Ohio (US East)
   - Branch: main
   - Root Directory: deixar em branco
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free

### Configurar variáveis de ambiente no Render:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/subscriptionapp?retryWrites=true&w=majority
JWT_SECRET=your-very-long-random-secret-key-here
NODE_ENV=production
```

## 3. Atualizar iOS App

### Constants.swift:
```swift
import Foundation

struct Constants {
    #if DEBUG
    static let baseURL = "http://localhost:5000"
    #else
    static let baseURL = "https://seudominio.onrender.com"
    #endif
    
    // API Configuration
    static let apiBaseURL = "\(baseURL)/api"
    
    // Subscription Product IDs
    static let weeklySubscriptionID = "weekly_sub"
    static let monthlySubscriptionID = "monthly_sub"
    static let yearlySubscriptionID = "yearly_sub"
}
```

## 4. Testar deploy

### Verificar status:
1. Acompanhar build logs no Render
2. Verificar se a app está rodando
3. Testar endpoint de health check:
   ```
   curl https://seudominio.onrender.com/health
   ```

### Resposta esperada:
```json
{
  "status": "OK",
  "environment": "production",
  "timestamp": "2023-xx-xxTxx:xx:xx.xxxZ"
}
```

## 5. Configurar auto-restart

### Adicionar rota de health check no server.js:
```javascript
// Health check endpoint para evitar sleep
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Health check API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});
```

## 6. Configurar serviço de ping externo (opcional)

### Usar cron-job.org (free tier):
1. Acessar https://cron-job.org
2. Criar conta gratuita
3. Criar novo cron job:
   - Name: Mind Reprogramming Backend Ping
   - URL: https://seudominio.onrender.com/health
   - Schedule: Every 10 minutes
4. Ativar o cron job

## 7. Verificar funcionamento

### Testes a realizar:
1. Acessar https://seudominio.onrender.com/health
2. Verificar resposta "OK"
3. Acessar https://seudominio.onrender.com/api/health
4. Verificar resposta JSON com status OK
5. Verificar logs no Render para garantir que não há erros

## 8. Monitoramento

### Configurar UptimeRobot:
1. Acessar https://uptimerobot.com
2. Criar conta gratuita
3. Adicionar novo monitor:
   - Monitor Type: HTTP(s)
   - Friendly Name: Mind Reprogramming Backend
   - URL: https://seudominio.onrender.com/health
   - Monitoring Interval: 5 minutes

## Considerações importantes:

1. **Render Free Tier Limitations**:
   - O app "dorme" após 15 minutos de inatividade
   - O primeiro acesso após dormir pode levar alguns segundos para iniciar
   - Ótimo para desenvolvimento e testes, mas pode não ser ideal para produção em larga escala

2. **MongoDB Atlas Free Tier**:
   - Limitado a 512MB de storage
   - Shared cluster (recursos limitados)
   - Ótimo para começar, mas pode precisar de upgrade conforme cresce

3. **Próximos passos**:
   - Testar integração completa do app iOS com backend
   - Implementar autenticação de usuários
   - Adicionar endpoints para assinaturas
   - Configurar backup automático