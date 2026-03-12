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
## Firebase & Emulator
 
The `VITE_APP_USE_EMULATOR` variable in your `.env` controls how the app connects to Firebase.
 
| Value | Behavior |
|-------|----------|
| `false` | Connects to your real Firebase project |
| `true` | Connects to local Firebase emulators |
 
### Using real Firebase (default)
 
Set `VITE_APP_USE_EMULATOR=false` and run:
 
```bash
docker compose up --build
```
 
Sign up with your own email. Check spam if you don't receive the verification email.
 
### Using local emulators with test data
 
The project includes test users and sample data in the `testdata` folder.
You need to start the emulators separately before running Docker.
 
Install Firebase CLI:
```bash
npm install -g firebase-tools
```
 
Start emulators with test data:
```bash
firebase emulators:start --import=./testdata
```
 
Set `VITE_APP_USE_EMULATOR=true` in your `.env`, then:
```bash
docker compose up --build
```
 
Test credentials (emulator only):
```
Email: sougatariju13@gmail.com
Password: 123456
```
 
---


## Troubleshooting

**Port 3000 already in use** - change the port in `docker-compose.yml`:
```yaml
ports:
  - "4000:3000"
```

**Firebase not connecting** - make sure all `VITE_APP_*` variables are filled in `.env`