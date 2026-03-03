# Enterprise Deployment Guide - EVA Sovereign UI

**Version**: 1.0.0  
**Last Updated**: November 30, 2025  
**Target Audience**: DevOps Engineers, System Administrators, Technical Decision Makers

---

## Executive Summary

EVA Sovereign UI is a production-ready Web Components library designed for international government and enterprise deployment. This guide provides step-by-step instructions for deploying to various environments with security, performance, and compliance in mind.

### Quick Facts
- **Bundle Size**: 12.28 KB ES (gzip), 10.96 KB UMD (gzip)
- **Performance**: 1.02ms average render time
- **Browser Support**: All modern browsers (ES2020+)
- **Security**: Zero runtime dependencies, CSP-compliant
- **Compliance**: WCAG 2.2 AA+, PIPEDA, GDPR ready

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deployment Options](#deployment-options)
3. [CDN Deployment](#cdn-deployment)
4. [Self-Hosted Deployment](#self-hosted-deployment)
5. [Container Deployment](#container-deployment)
6. [Government Cloud Deployment](#government-cloud-deployment)
7. [Performance Optimization](#performance-optimization)
8. [Security Hardening](#security-hardening)
9. [Monitoring & Observability](#monitoring--observability)
10. [Disaster Recovery](#disaster-recovery)

---

## Pre-Deployment Checklist

### Required Steps

- [ ] **Build Verification**: Run `npm run build` and verify dist/ artifacts
- [ ] **Test Suite**: Ensure all 282 tests pass with `npm test`
- [ ] **Bundle Size**: Verify with `npm run size:guard` (must pass thresholds)
- [ ] **Performance**: Validate with `npm run benchmark` (< 16ms avg)
- [ ] **Security Scan**: Run `npm audit` (no high/critical vulnerabilities)
- [ ] **License Review**: Confirm LICENSE and third-party attributions
- [ ] **Documentation**: Review README, SECURITY, and this DEPLOYMENT guide

### Optional but Recommended

- [ ] **Visual Regression**: Run `npm run test:vr:ci` to verify UI consistency
- [ ] **Accessibility Audit**: Use axe DevTools or Lighthouse
- [ ] **Load Testing**: Test with expected concurrent user load
- [ ] **Browser Testing**: Verify on Chrome, Firefox, Safari, Edge
- [ ] **Mobile Testing**: Test on iOS Safari and Android Chrome

---

## Deployment Options

### Option 1: CDN Deployment (Recommended for Public Sites)

**Best for**: Public-facing government portals, high-traffic websites

**Advantages**:
- Global edge distribution
- Automatic HTTP/2 and Brotli compression
- Built-in DDoS protection
- Zero server maintenance

**See**: [CDN Deployment](#cdn-deployment)

### Option 2: Self-Hosted (Recommended for Internal Systems)

**Best for**: Intranets, secure government networks, air-gapped systems

**Advantages**:
- Full control over assets
- No external dependencies
- Compliance with data sovereignty requirements
- Custom caching policies

**See**: [Self-Hosted Deployment](#self-hosted-deployment)

### Option 3: Container Deployment (Recommended for Microservices)

**Best for**: Kubernetes, Docker Swarm, cloud-native architectures

**Advantages**:
- Immutable infrastructure
- Easy scaling and rollbacks
- CI/CD integration
- Multi-environment consistency

**See**: [Container Deployment](#container-deployment)

### Option 4: Government Cloud (Recommended for Secure Workloads)

**Best for**: Protected B data, classified systems, regulated industries

**Advantages**:
- FedRAMP / PBMM compliance
- Data residency guarantees
- Enhanced security controls
- Government SLAs

**See**: [Government Cloud Deployment](#government-cloud-deployment)

---

## CDN Deployment

### Using jsDelivr (Free, Global CDN)

```html
<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Government Service</title>
  
  <!-- Load EVA Sovereign UI from CDN -->
  <script type="module" 
    src="https://cdn.jsdelivr.net/gh/MarcoPolo483/EVA-Sovereign-UI-by-Copilot@v1.0.0/dist/eva-sovereign-ui.es.js"
    integrity="sha384-[GENERATE_SRI_HASH]"
    crossorigin="anonymous"></script>
</head>
<body>
  <eva-button variant="primary">Click Me</eva-button>
</body>
</html>
```

### Generate SRI Hash

```bash
# Generate hash for CDN integrity checking
cat dist/eva-sovereign-ui.es.js | openssl dgst -sha384 -binary | openssl base64 -A
```

### CDN Configuration

**Cache Headers** (recommended):
```
Cache-Control: public, max-age=31536000, immutable
```

**CORS Headers** (if serving i18n files):
```
Access-Control-Allow-Origin: https://yourdomain.gov.ca
Access-Control-Allow-Methods: GET, OPTIONS
```

---

## Self-Hosted Deployment

### Step 1: Build Production Assets

```bash
cd EVA-Sovereign-UI-by-Copilot
npm ci --production=false
npm run build

# Output:
# dist/eva-sovereign-ui.es.js (54.12 KB, 12.28 KB gzip)
# dist/eva-sovereign-ui.umd.js (46.37 KB, 10.96 KB gzip)
# dist/index.d.ts (TypeScript definitions)
```

### Step 2: Deploy to Web Server

#### Apache Configuration

```apache
<VirtualHost *:443>
    ServerName components.yourdomain.gov.ca
    DocumentRoot /var/www/eva-sovereign-ui/dist
    
    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/javascript application/javascript
    </IfModule>
    
    # Cache static assets
    <FilesMatch \"\\.(js|css)$\">
        Header set Cache-Control \"public, max-age=31536000, immutable\"
    </FilesMatch>
    
    # Security headers
    Header set X-Content-Type-Options \"nosniff\"
    Header set X-Frame-Options \"DENY\"
    Header set Referrer-Policy \"strict-origin-when-cross-origin\"
    
    # SSL configuration
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/your-cert.crt
    SSLCertificateKeyFile /etc/ssl/private/your-key.key
    SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite HIGH:!aNULL:!MD5
</VirtualHost>
```

#### Nginx Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name components.yourdomain.gov.ca;
    
    root /var/www/eva-sovereign-ui/dist;
    
    # SSL configuration
    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Gzip compression
    gzip on;
    gzip_types text/javascript application/javascript;
    gzip_min_length 1024;
    
    # Cache static assets
    location ~* \\.(js|css)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }
    
    # Security headers
    add_header X-Content-Type-Options \"nosniff\" always;
    add_header X-Frame-Options \"DENY\" always;
    add_header Referrer-Policy \"strict-origin-when-cross-origin\" always;
    
    # CORS for i18n files (if needed)
    location /i18n/ {
        add_header Access-Control-Allow-Origin \"https://yourdomain.gov.ca\";
        add_header Access-Control-Allow-Methods \"GET, OPTIONS\";
    }
}
```

### Step 3: Verify Deployment

```bash
# Test HTTPS
curl -I https://components.yourdomain.gov.ca/eva-sovereign-ui.es.js

# Expected: 200 OK, gzip encoding, cache headers

# Test component loading
curl https://components.yourdomain.gov.ca/eva-sovereign-ui.es.js | head -n 5
```

---

## Container Deployment

### Dockerfile

```dockerfile
# Multi-stage build for minimal production image
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: run as non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \\
    chmod -R 755 /usr/share/nginx/html

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --quiet --tries=1 --spider http://localhost:8080/eva-sovereign-ui.es.js || exit 1

CMD [\"nginx\", \"-g\", \"daemon off;\"]
```

### nginx.conf (for container)

```nginx
server {
    listen 8080;
    server_name _;
    
    root /usr/share/nginx/html;
    
    gzip on;
    gzip_types text/javascript application/javascript;
    
    location ~* \\.(js|css)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }
    
    add_header X-Content-Type-Options \"nosniff\" always;
    add_header X-Frame-Options \"DENY\" always;
}
```

### Build and Deploy

```bash
# Build Docker image
docker build -t eva-sovereign-ui:1.0.0 .

# Run container
docker run -d -p 8080:8080 --name eva-ui eva-sovereign-ui:1.0.0

# Verify
curl http://localhost:8080/eva-sovereign-ui.es.js

# Push to registry
docker tag eva-sovereign-ui:1.0.0 registry.yourdomain.gov.ca/eva-sovereign-ui:1.0.0
docker push registry.yourdomain.gov.ca/eva-sovereign-ui:1.0.0
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: eva-sovereign-ui
  namespace: government-services
spec:
  replicas: 3
  selector:
    matchLabels:
      app: eva-sovereign-ui
  template:
    metadata:
      labels:
        app: eva-sovereign-ui
    spec:
      containers:
      - name: eva-ui
        image: registry.yourdomain.gov.ca/eva-sovereign-ui:1.0.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: \"64Mi\"
            cpu: \"100m\"
          limits:
            memory: \"128Mi\"
            cpu: \"200m\"
        livenessProbe:
          httpGet:
            path: /eva-sovereign-ui.es.js
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /eva-sovereign-ui.es.js
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
      securityContext:
        runAsNonRoot: true
        runAsUser: 101
---
apiVersion: v1
kind: Service
metadata:
  name: eva-sovereign-ui-service
  namespace: government-services
spec:
  selector:
    app: eva-sovereign-ui
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: eva-sovereign-ui-ingress
  namespace: government-services
  annotations:
    cert-manager.io/cluster-issuer: \"letsencrypt-prod\"
    nginx.ingress.kubernetes.io/ssl-redirect: \"true\"
spec:
  tls:
  - hosts:
    - components.yourdomain.gov.ca
    secretName: eva-ui-tls
  rules:
  - host: components.yourdomain.gov.ca
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: eva-sovereign-ui-service
            port:
              number: 80
```

---

## Government Cloud Deployment

### Azure Government Cloud

```bash
# Login to Azure Government
az cloud set --name AzureUSGovernment
az login

# Create resource group
az group create --name eva-sovereign-ui-rg --location usgovvirginia

# Create storage account for static hosting
az storage account create \\
  --name evasovereignui \\
  --resource-group eva-sovereign-ui-rg \\
  --location usgovvirginia \\
  --sku Standard_LRS \\
  --kind StorageV2

# Enable static website hosting
az storage blob service-properties update \\
  --account-name evasovereignui \\
  --static-website \\
  --index-document index.html

# Upload dist/ files
az storage blob upload-batch \\
  --source ./dist \\
  --destination '$web' \\
  --account-name evasovereignui

# Configure CDN (optional)
az cdn profile create \\
  --name eva-ui-cdn \\
  --resource-group eva-sovereign-ui-rg \\
  --sku Standard_Microsoft

az cdn endpoint create \\
  --name eva-ui-endpoint \\
  --profile-name eva-ui-cdn \\
  --resource-group eva-sovereign-ui-rg \\
  --origin evasovereignui.blob.core.usgovcloudapi.net
```

### AWS GovCloud

```bash
# Configure AWS CLI for GovCloud
aws configure set region us-gov-west-1

# Create S3 bucket
aws s3 mb s3://eva-sovereign-ui --region us-gov-west-1

# Upload dist/ files
aws s3 sync ./dist s3://eva-sovereign-ui --acl public-read

# Configure bucket for static hosting
aws s3 website s3://eva-sovereign-ui --index-document index.html

# Add bucket policy
aws s3api put-bucket-policy --bucket eva-sovereign-ui --policy file://bucket-policy.json
```

**bucket-policy.json**:
```json
{
  \"Version\": \"2012-10-17\",
  \"Statement\": [
    {
      \"Sid\": \"PublicReadGetObject\",
      \"Effect\": \"Allow\",
      \"Principal\": \"*\",
      \"Action\": \"s3:GetObject\",
      \"Resource\": \"arn:aws-us-gov:s3:::eva-sovereign-ui/*\"
    }
  ]
}
```

### Google Cloud Platform (GCP)

```bash
# Create bucket
gsutil mb -l us-central1 gs://eva-sovereign-ui

# Upload files
gsutil -m cp -r dist/* gs://eva-sovereign-ui

# Make files public
gsutil iam ch allUsers:objectViewer gs://eva-sovereign-ui

# Configure for static hosting
gsutil web set -m index.html gs://eva-sovereign-ui
```

---

## Performance Optimization

### HTTP/2 and HTTP/3

Enable HTTP/2 (and HTTP/3 where supported) for multiplexing:

```nginx
# Nginx
listen 443 ssl http2;
```

### Brotli Compression

For even better compression than gzip:

```nginx
# Install nginx-module-brotli
brotli on;
brotli_comp_level 6;
brotli_types text/javascript application/javascript;
```

### Preloading Critical Resources

```html
<link rel=\"modulepreload\" href=\"/eva-sovereign-ui.es.js\">
```

### Service Worker Caching

```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('eva-ui-v1').then((cache) => {
      return cache.addAll([
        '/eva-sovereign-ui.es.js',
        '/i18n/locales/en-CA.json',
        '/i18n/locales/fr-CA.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

---

## Security Hardening

### Content Security Policy (CSP)

```html
<meta http-equiv=\"Content-Security-Policy\" content=\"
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
\">
```

### Subresource Integrity (SRI)

Always use SRI hashes for CDN resources:

```bash
# Generate SRI hash
./scripts/generate-sri.sh dist/eva-sovereign-ui.es.js
```

### Rate Limiting

Nginx rate limiting:

```nginx
limit_req_zone $binary_remote_addr zone=components:10m rate=10r/s;

location / {
    limit_req zone=components burst=20 nodelay;
}
```

---

## Monitoring & Observability

### Health Check Endpoint

```html
<!-- health.html -->
<!DOCTYPE html>
<html>
<head><title>Health Check</title></head>
<body>
  <script type=\"module\">
    import * as EVA from '/eva-sovereign-ui.es.js';
    document.body.innerHTML = '<h1>OK</h1>';
  </script>
</body>
</html>
```

### Monitoring Metrics

**Key Performance Indicators (KPIs)**:
- Bundle load time: < 100ms (p95)
- First component render: < 50ms (p95)
- Total page interactive: < 1s (p95)
- Bundle size: ≤ 15 KB gzip
- HTTP error rate: < 0.1%
- Availability: ≥ 99.9%

### Logging

```nginx
# Nginx access log with timing
log_format detailed '$remote_addr - $remote_user [$time_local] '
                    '\"$request\" $status $body_bytes_sent '
                    '\"$http_referer\" \"$http_user_agent\" '
                    'rt=$request_time uct=\"$upstream_connect_time\" '
                    'uht=\"$upstream_header_time\" urt=\"$upstream_response_time\"';

access_log /var/log/nginx/eva-ui-access.log detailed;
```

---

## Disaster Recovery

### Backup Strategy

```bash
# Automated daily backup
#!/bin/bash
DATE=$(date +%Y%m%d)
aws s3 sync s3://eva-sovereign-ui s3://eva-sovereign-ui-backup-$DATE
```

### Rollback Procedure

```bash
# Kubernetes rollback
kubectl rollout undo deployment/eva-sovereign-ui -n government-services

# Docker rollback
docker stop eva-ui
docker rm eva-ui
docker run -d -p 8080:8080 --name eva-ui eva-sovereign-ui:1.0.0-previous

# CDN cache purge
curl -X POST https://api.jsdelivr.com/v1/purge \\
  -d 'url=https://cdn.jsdelivr.net/gh/MarcoPolo483/EVA-Sovereign-UI-by-Copilot@v1.0.0/dist/eva-sovereign-ui.es.js'
```

### Business Continuity

- **RTO (Recovery Time Objective)**: < 15 minutes
- **RPO (Recovery Point Objective)**: < 1 hour
- **Backup Retention**: 90 days minimum
- **Geo-Redundancy**: Multi-region deployment recommended

---

## Troubleshooting

### Common Issues

**Issue**: Components not loading
```bash
# Check CORS headers
curl -I https://components.yourdomain.gov.ca/eva-sovereign-ui.es.js

# Verify MIME type
Content-Type: application/javascript; charset=utf-8
```

**Issue**: Slow load times
```bash
# Check compression
curl -H \"Accept-Encoding: gzip\" -I https://components.yourdomain.gov.ca/eva-sovereign-ui.es.js | grep Content-Encoding

# Should return: Content-Encoding: gzip
```

**Issue**: CSP violations
```javascript
// Check browser console for CSP errors
// Update CSP header to allow necessary origins
```

---

## Support & Resources

- **Documentation**: README.md, CONTRIBUTING.md, SECURITY.md
- **Issues**: https://github.com/MarcoPolo483/EVA-Sovereign-UI-by-Copilot/issues
- **Discussions**: https://github.com/MarcoPolo483/EVA-Sovereign-UI-by-Copilot/discussions
- **Security**: See SECURITY.md for vulnerability reporting

---

**Document Version**: 1.0.0  
**Last Reviewed**: November 30, 2025  
**Next Review**: March 1, 2026
