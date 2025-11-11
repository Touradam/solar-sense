# SEPT Landing Page & Neural Network Builder - Deployment Guide

This guide covers multiple deployment options for the SEPT application.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Option 1: Deploy to Vercel (Recommended)](#option-1-deploy-to-vercel-recommended)
3. [Option 2: Deploy to Traditional Server (VPS/Cloud)](#option-2-deploy-to-traditional-server-vpscloud)
4. [Option 3: Deploy with Docker](#option-3-deploy-with-docker)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed locally
- ✅ npm or yarn package manager
- ✅ Git repository (recommended)
- ✅ All dependencies installed (`npm install`)
- ✅ Application builds successfully locally (`npm run build`)

**Test locally first:**
```bash
npm run dev
# Visit http://localhost:3000 to verify everything works
```

---

## Option 1: Deploy to Vercel (Recommended)

**Best for:** Quick deployment, free hosting, automatic SSL, global CDN

### Why Vercel?
- ✅ **Free tier** perfect for startups
- ✅ **Zero configuration** - optimized for Next.js
- ✅ **Automatic HTTPS** with SSL certificates
- ✅ **Global CDN** for fast loading worldwide
- ✅ **Automatic deployments** from Git
- ✅ **Preview deployments** for branches

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for deployment"

# Create a GitHub repository and push
git remote add origin https://github.com/your-username/sept-landing.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy via Vercel Dashboard

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up/Login** with GitHub
3. **Click** "Add New Project"
4. **Import** your GitHub repository
5. **Configure:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Click** "Deploy"

**Done!** Your site will be live at: `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. **In Vercel Dashboard** → Settings → Domains
2. **Add** `www.sept.energy` or your custom domain
3. **Update DNS** at your domain registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Wait** for DNS propagation (5-60 minutes)

### Step 4: Automatic Deployments

Every `git push` to `main` will automatically deploy!

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Vercel automatically builds and deploys
```

---

## Option 2: Deploy to Traditional Server (VPS/Cloud)

**Best for:** Full control, existing infrastructure, custom configurations

### Prerequisites
- Ubuntu/Debian server (20.04+ recommended)
- SSH access
- Domain name pointed to server IP

### Step 1: Server Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should be v20.x
npm --version   # Should be v10.x

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### Step 2: Transfer Files to Server

**Method A: Using Git (Recommended)**
```bash
# On server
cd /var/www
sudo mkdir sept
sudo chown $USER:$USER sept
cd sept

# Clone repository
git clone https://github.com/your-username/sept-landing.git .

# Or pull if already cloned
git pull origin main
```

**Method B: Using SCP**
```bash
# On your local machine
cd /Users/gnagninin/huit
scp -r ./* user@your-server-ip:/var/www/sept/
```

### Step 3: Install Dependencies and Build

```bash
# On server, in project directory
cd /var/www/sept

# Install dependencies
npm install --production

# Build the application
npm run build
```

### Step 4: Start with PM2

```bash
# Start the application
pm2 start npm --name "sept-app" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions printed by the command

# Check status
pm2 status

# View logs
pm2 logs sept-app
```

### Step 5: Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/sept
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name sept.energy www.sept.energy;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Enable the site:**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/sept /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 6: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d sept.energy -d www.sept.energy

# Follow prompts (enter email, agree to terms)

# Test automatic renewal
sudo certbot renew --dry-run
```

**Your site is now live with HTTPS!** 🎉

### Updating Your Deployment

```bash
# SSH into server
cd /var/www/sept

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install --production

# Rebuild
npm run build

# Restart PM2
pm2 restart sept-app

# Check logs
pm2 logs sept-app
```

---

## Option 3: Deploy with Docker

**Best for:** Containerized deployments, scalability, consistent environments

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production
ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 3000

# Set PORT environment variable
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]
```

### Step 2: Create .dockerignore

Create `.dockerignore` in project root:

```
node_modules
.next
.git
.gitignore
README.md
DEPLOYMENT.md
*.md
.env.local
.env*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### Step 3: Update next.config.ts

Add this to your `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // Enable standalone output for Docker
  // ... rest of your config
};
```

### Step 4: Build and Run Docker Container

```bash
# Build Docker image
docker build -t sept-app:latest .

# Run container
docker run -d \
  --name sept-app \
  -p 3000:3000 \
  --restart unless-stopped \
  sept-app:latest

# Check logs
docker logs sept-app

# Stop container
docker stop sept-app

# Start container
docker start sept-app
```

### Step 5: Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  sept-app:
    build: .
    container_name: sept-app
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
```

**Run with Docker Compose:**
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

---

## Environment Variables

Currently, the application doesn't require environment variables. If you add any in the future:

### For Vercel:
1. **Dashboard** → Project → Settings → Environment Variables
2. **Add** each variable

### For Traditional Server:
Create `.env.production` file:
```bash
# Example (add actual variables as needed)
NEXT_PUBLIC_API_URL=https://api.sept.energy
```

### For Docker:
Add to `docker run` command:
```bash
docker run -d \
  -e NEXT_PUBLIC_API_URL=https://api.sept.energy \
  -p 3000:3000 \
  sept-app:latest
```

---

## Post-Deployment Checklist

After deployment, verify:

- ✅ **Landing page** loads at root URL (`/`)
- ✅ **Neural Network Builder** works at `/builder`
- ✅ **Logo image** displays correctly
- ✅ **Team photos** (Adama and Jordan) load
- ✅ **Product images** (Solar Sense, diagrams) display
- ✅ **Social media links** work (LinkedIn, YouTube)
- ✅ **Email links** work (support@SEPT.energy, team emails)
- ✅ **Navigation** between pages works
- ✅ **Mobile responsive** design works on phones
- ✅ **Dark mode** toggle works (if applicable)
- ✅ **Neural Network Builder** can:
  - Generate sample data
  - Upload CSV files
  - Train models
  - Make predictions
  - Download trained models

### Performance Testing

```bash
# Test page load speed
curl -w "@-" -o /dev/null -s https://your-domain.com <<'EOF'
time_namelookup: %{time_namelookup}
time_connect: %{time_connect}
time_starttransfer: %{time_starttransfer}
time_total: %{time_total}
EOF
```

### SEO Verification

- ✅ Check meta tags are present
- ✅ Verify Open Graph images
- ✅ Test with Google PageSpeed Insights
- ✅ Submit sitemap to Google Search Console

---

## Troubleshooting

### Issue: Build Fails

**Error:** `npm run build` fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Issue: Images Not Loading

**Error:** Images show broken icon

**Solution:**
- Verify images exist in `public/` folder
- Check image paths don't have leading slash: `/image.png` → `image.png`
- Rebuild: `npm run build`

### Issue: Port 3000 Already in Use

**Error:** `EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 npm start
```

### Issue: PM2 App Not Starting

**Solution:**
```bash
# Check PM2 logs
pm2 logs sept-app

# Restart PM2
pm2 restart sept-app

# If still failing, delete and recreate
pm2 delete sept-app
pm2 start npm --name "sept-app" -- start
pm2 save
```

### Issue: Nginx 502 Bad Gateway

**Solution:**
```bash
# Check if app is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart sept-app
sudo systemctl restart nginx
```

### Issue: SSL Certificate Not Working

**Solution:**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew --force-renewal

# Reload Nginx
sudo systemctl reload nginx
```

---

## Monitoring and Maintenance

### Server Monitoring (Traditional Deployment)

```bash
# Check PM2 status
pm2 status

# Monitor logs in real-time
pm2 logs sept-app --lines 100

# Check memory usage
pm2 monit

# Restart if memory usage high
pm2 restart sept-app
```

### Automatic Updates (Optional)

Create update script `/var/www/sept/update.sh`:

```bash
#!/bin/bash
cd /var/www/sept
git pull origin main
npm install --production
npm run build
pm2 restart sept-app
echo "Deployment updated at $(date)" >> /var/log/sept-updates.log
```

**Make executable and run:**
```bash
chmod +x update.sh
./update.sh
```

**Setup cron for automatic updates (optional):**
```bash
# Edit crontab
crontab -e

# Add line to update daily at 3 AM
0 3 * * * /var/www/sept/update.sh
```

---

## Backup and Recovery

### Backup Strategy

```bash
# Backup script
#!/bin/bash
BACKUP_DIR="/backups/sept"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/sept-app-$DATE.tar.gz /var/www/sept

# Keep only last 7 days of backups
find $BACKUP_DIR -name "sept-app-*.tar.gz" -mtime +7 -delete

echo "Backup completed at $(date)" >> /var/log/sept-backup.log
```

### Restore from Backup

```bash
# Stop application
pm2 stop sept-app

# Extract backup
cd /var/www
sudo tar -xzf /backups/sept/sept-app-YYYYMMDD_HHMMSS.tar.gz

# Restart application
pm2 restart sept-app
```

---

## Support

For deployment issues:
- **Email:** support@SEPT.energy
- **Team:** adama.toure@sept.energy, jordan.harris-toovy@sept.energy

---

## Summary of Deployment Commands

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Traditional Server (Full Control)
```bash
# On server
git clone <repo>
npm install --production
npm run build
pm2 start npm --name "sept-app" -- start
pm2 save
pm2 startup
```

### Docker (Containerized)
```bash
docker build -t sept-app .
docker run -d -p 3000:3000 sept-app
```

---

**Congratulations! Your SEPT landing page and Neural Network Builder are now deployed! 🚀**

