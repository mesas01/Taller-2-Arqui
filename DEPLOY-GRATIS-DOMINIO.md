# Guia: Dominio y Web Gratis (o casi gratis)

Esta guia te da rutas reales para publicar el proyecto en internet con dominio y HTTPS.

## Opcion A (recomendada): VPS gratis + dominio gratis

### Que necesitas

- Una VPS gratis o low-cost con Docker.
- Un dominio gratis (DuckDNS) o dominio propio.
- Puertos 80 y 443 abiertos.

### Proveedores de VPS con capa gratis

- Oracle Cloud Free Tier: VM ARM siempre gratis.
- Fly.io: tiene credito inicial y planes muy baratos.
- Railway/Render: faciles para iniciar, pero su capa gratis cambia con el tiempo.

## Opcion A1: Subirlo a Oracle Cloud paso a paso

Si ya tienes una instancia con IP publica en Oracle, este es el flujo correcto.

### 1. Preparar la instancia en Oracle

- Asegurate de que la VM tenga IP publica.
- Abre las reglas de entrada en Oracle para los puertos `80` y `443`.
- Si vas a conectarte por SSH, deja tambien `22` abierto solo para tu IP si puedes.

### 2. Entrar por SSH

Desde Windows PowerShell puedes conectarte asi:

```powershell
ssh ubuntu@157.137.235.6
```

Si tu usuario es otro, cambialo por el que te dio Oracle.

### 3. Instalar Docker en la VM

En la VM Linux:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
```

Despues cierra sesion y vuelve a entrar para que aplique el grupo `docker`.

### 4. Clonar tu repo

```bash
git clone TU_REPO
cd Taller-2-Arqui
```

### 5. Crear el archivo `.env`

```bash
cp .env.production.example .env
nano .env
```

Debes dejar algo como:

```env
APP_DOMAIN=taller2arqui.duckdns.org
CADDY_EMAIL=santiagoa.mesan@javeriana.edu.co
JWT_SECRET=pon_una_clave_larga_y_segura
ALLOWED_ORIGINS=https://taller2arqui.duckdns.org
```

### 6. Levantar el stack

```bash
docker compose up -d --build
```

### 7. Cargar el seed

```bash
docker compose exec backend npm run seed
```

### 8. Verificar estado

```bash
docker compose ps
docker compose logs -f caddy
```

### 9. Abrir en navegador

- `https://taller2arqui.duckdns.org`

### 10. Si no abre

- Revisa que el DNS de DuckDNS apunte a `157.137.235.6`.
- Revisa que Oracle permita 80/443.
- Revisa `docker compose logs -f caddy`.
- Revisa que `.env` tenga `APP_DOMAIN` correcto.

## Opcion B (gratis y mas simple): Cloudflare Tunnel + tu maquina o VPS

Esta opcion no requiere abrir puertos al exterior y funciona con HTTPS automaticamente.

### Cuándo conviene

- Cuando Oracle no funciona o no quieres lidiar con firewall y puertos.
- Cuando quieres publicar una demo rapido.
- Cuando aceptas que la app corre en tu PC o en una maquina encendida 24/7.

### Qué necesitas

- Instalar `cloudflared`.
- Tener una cuenta de Cloudflare.
- Si quieres dominio propio, usar un dominio que administres en Cloudflare.

### Flujo simple sin dominio propio

1. Levantar tu app local o en una VPS.
2. Iniciar un tunnel temporal:
   - `cloudflared tunnel --url http://localhost:80`
3. Cloudflare te entrega una URL publica HTTPS temporal.

### Flujo con dominio propio gratis

1. Registrar o usar un dominio que ya tengas y moverlo a Cloudflare DNS.
2. Crear un tunnel nombrado:
   - `cloudflared tunnel create taller-arqui`
3. Crear la ruta DNS hacia el tunnel:
   - `cloudflared tunnel route dns taller-arqui app.tudominio.com`
4. Crear la configuracion del tunnel y apuntar al proxy local:
   - `cloudflared tunnel run taller-arqui`

### Ejemplo de configuracion

Si tu app corre con Docker Compose y Caddy en `http://localhost`:

- Exponer solo localmente el puerto del proxy o usar el puerto interno de la maquina.
- Cloudflared publica ese servicio por HTTPS.

### Ventajas

- HTTPS automatico.
- No necesitas abrir puertos 80/443 al exterior.
- Muy util para demo academica.

### Limitaciones

- Si usas la opcion temporal, la URL puede cambiar.
- Si tu maquina se apaga, el sitio deja de responder.
- Para estabilidad real, un VPS sigue siendo mejor.

## Dominio gratis rapido

### DuckDNS (gratis)

1. Crear cuenta en DuckDNS y crear subdominio, ejemplo: `miapp.duckdns.org`.
2. Apuntar ese subdominio a la IP publica de tu VPS desde el panel de DuckDNS.
3. Esperar propagacion (normalmente pocos minutos).

## Deploy paso a paso en VPS

1. Clonar repo:
   - `git clone TU_REPO`
   - `cd Taller-2-Arqui`
2. Copiar variables de produccion:
   - `cp .env.production.example .env`
3. Editar `.env`:
   - `APP_DOMAIN=miapp.duckdns.org`
   - `CADDY_EMAIL=tu-correo@dominio.com`
   - `JWT_SECRET` con valor fuerte.
4. Levantar stack:
   - `docker compose up -d --build`
5. Cargar seed:
   - `docker compose exec backend npm run seed`
6. Ver logs de certificados:
   - `docker compose logs -f caddy`
7. Probar en navegador:
   - `https://miapp.duckdns.org`

## Opcion B: Sin dominio propio (solo demo)

Puedes abrir por IP publica, pero HTTPS automatico de Caddy funciona bien con dominio real.
Para demo temporal, usa HTTP por IP si no tienes dominio.

## Checklist cuando no funciona HTTPS

- El dominio no apunta a la IP correcta.
- El firewall de la VPS no abre 80/443.
- Tu ISP o proveedor bloquea puertos.
- Caddy no puede resolver el dominio (revisar logs).

## Comandos utiles de diagnostico

- Estado de servicios:
  - `docker compose ps`
- Logs de proxy:
  - `docker compose logs -f caddy`
- Logs de backend:
  - `docker compose logs -f backend`
- Verificacion DNS (desde tu PC):
  - `nslookup miapp.duckdns.org`

## Seguridad minima recomendada

- Cambiar `JWT_SECRET` por una clave larga.
- No exponer MongoDB al exterior.
- Mantener solo 80/443 abiertos publicamente.
- Actualizar imagenes Docker periodicamente.
