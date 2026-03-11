# Docker Setup

##  Requirements
- [Docker](https://docs.docker.com/get-docker/) v20+
- [Docker Compose](https://docs.docker.com/compose/install/) v2+

## Setup

```bash
cp .env.sample .env
# fill in your Firebase credentials in .env
```

## Run

```bash
docker compose up --build
```

App runs at **http://localhost:3000**

## Stop

```bash
docker compose down
```

## Rebuild from scratch

```bash
docker compose build --no-cache
```

## Troubleshooting

**Port 3000 already in use** — change the port in `docker-compose.yml`:
```yaml
ports:
  - "4000:3000"
```

**Firebase not connecting** — make sure all `VITE_APP_*` variables are filled in `.env`