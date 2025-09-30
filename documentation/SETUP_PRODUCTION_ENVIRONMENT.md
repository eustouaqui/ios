# Configuração do Ambiente de Produção

## Visão Geral

Este guia detalha como configurar um ambiente de produção seguro e escalável para o backend da sua aplicação.

## 1. Escolha de Provedor de Hosting

### Opções Recomendadas:
1. **Heroku** - Fácil de usar, bom para iniciantes
2. **AWS EC2** - Mais controle e escalabilidade
3. **DigitalOcean** - Boa relação custo-benefício
4. **Google Cloud Platform** - Integração com Google Play

## 2. Configuração do Servidor

### Passo 1: Provisionar Servidor
```bash
# Exemplo para Ubuntu 20.04
sudo apt update
sudo apt upgrade -y
```

### Passo 2: Instalar Dependências
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MongoDB (ou PostgreSQL)
sudo apt install -y mongodb

# Instalar nginx (proxy reverso)
sudo apt install -y nginx
```

### Passo 3: Configurar SSL/TLS
```bash
# Instalar certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d yourdomain.com
```

## 3. Deploy do Backend

### Passo 1: Preparar Código
```bash
# Clonar repositório
git clone https://github.com/yourusername/subscription-backend.git
cd subscription-backend

# Instalar dependências
npm install

# Criar arquivo .env de produção
cp .env.example .env
```

### Passo 2: Configurar Variáveis de Ambiente
```env
# .env (produção)
PORT=443
JWT_SECRET=your-very-long-random-secret-key-here
APPLE_SHARED_SECRET=your-apple-shared-secret
GOOGLE_API_KEY=your-google-api-key
MONGODB_URI=mongodb://localhost:27017/subscriptionapp
NODE_ENV=production
```

### Passo 3: Configurar Process Manager
```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar aplicação
pm2 start src/server.js --name "subscription-backend"

# Configurar para iniciar automaticamente
pm2 startup
pm2 save
```

## 4. Configuração do Banco de Dados

### MongoDB
```bash
# Criar usuário administrador
mongo
use admin
db.createUser({user: "admin", pwd: "your-password", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})
exit

# Habilitar autenticação no MongoDB
sudo nano /etc/mongodb.conf
# Adicionar: auth = true

# Reiniciar MongoDB
sudo systemctl restart mongodb
```

### PostgreSQL (alternativa)
```bash
# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Criar banco de dados e usuário
sudo -u postgres psql
CREATE DATABASE subscriptionapp;
CREATE USER appuser WITH ENCRYPTED PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE subscriptionapp TO appuser;
\q
```

## 5. Configuração do Proxy Reverso (nginx)

```nginx
# /etc/nginx/sites-available/subscriptionapp
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar site
sudo ln -s /etc/nginx/sites-available/subscriptionapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Segurança Adicional

### Firewall
```bash
# Configurar UFW
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

### Rate Limiting
Adicione ao seu server.js:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### Headers de Segurança
```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 7. Monitoramento e Logging

### Configurar logging
```bash
# Instalar Winston para logging
npm install winston

# Adicionar ao server.js
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Monitoramento de Performance
```bash
# Instalar PM2 plus
pm2 plus
```

## 8. Backup e Recuperação

### Backup do Banco de Dados
```bash
# MongoDB
mongodump --db subscriptionapp --out /backup/

# PostgreSQL
pg_dump subscriptionapp > /backup/subscriptionapp.sql
```

### Script de Backup Automatizado
```bash
# backup.sh
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db subscriptionapp --out /backup/subscriptionapp_$DATE
find /backup -type d -mtime +7 -exec rm -rf {} +
```

```bash
# Agendar backup diário
crontab -e
# Adicionar: 0 2 * * * /path/to/backup.sh
```

## 9. Escalabilidade

### Load Balancer (para tráfego alto)
```nginx
# nginx load balancer config
upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://backend;
        # ... other proxy settings
    }
}
```

## 10. Testes de Produção

### Verificar SSL
```bash
openssl s_client -connect yourdomain.com:443
```

### Testar API
```bash
curl -X GET https://yourdomain.com/health
```

### Monitorar Performance
```bash
pm2 monit
```

## Considerações Finais

1. **Sempre use senhas fortes** para todos os serviços
2. **Mantenha tudo atualizado** com as últimas versões de segurança
3. **Monitore logs regularmente** para detectar atividades suspeitas
4. **Teste backups regularmente** para garantir recuperação em caso de falha
5. **Use variáveis de ambiente** para todas as credenciais sensíveis
6. **Implemente autenticação de dois fatores** para acesso ao servidor

Com esta configuração, seu ambiente de produção estará seguro e pronto para escalar conforme necessário.