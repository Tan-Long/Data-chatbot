# Huong dan chay

## Yeu cau

May can co:

- `Node.js` 20+
- `npm`
- `Python` 3.11+
- `docker` va `docker compose` neu muon chay `PostgreSQL`

## Cau truc can chay

- Frontend: `apps/web`
- Backend: `apps/api`
- Database local: `docker-compose.yml`

## Cach 1: chay nhanh voi PostgreSQL

### 1. Khoi dong database

Tai root repo:

```bash
docker compose up -d postgres
```

Database mac dinh:

- DB: `wellness_commerce`
- User: `postgres`
- Password: `postgres`
- Port: `5432`

### 2. Chay backend

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Mac dinh backend dung:

```text
postgresql+psycopg://postgres:postgres@localhost:5432/wellness_commerce
```

### 3. Chay frontend

Mo terminal moi:

```bash
cd apps/web
npm install
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

Frontend mac dinh chay o:

```text
http://localhost:3000
```

Backend mac dinh chay o:

```text
http://localhost:8000
```

## Cach 2: chay voi SQLite cho dev nhanh

Neu khong muon chay Docker, co the dung SQLite.

### 1. Chay backend voi SQLite

Tai root repo:

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
export WELLNESS_DATABASE_URL="sqlite:///./wellness_local.db"
uvicorn app.main:app --reload
```

File DB se duoc tao trong:

```text
apps/api/wellness_local.db
```

### 2. Chay frontend

```bash
cd apps/web
npm install
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

## Admin login

Tai trang:

```text
http://localhost:3000/admin
```

Tai khoan seed mac dinh:

```text
username: admin
password: admin123
```

## API useful links

Khi backend dang chay:

- Swagger UI: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

## Thu tu khoi dong de dung

### Mo 3 terminal

Terminal 1:

```bash
docker compose up -d postgres
```

Terminal 2:

```bash
cd apps/api
source .venv/bin/activate
uvicorn app.main:app --reload
```

Terminal 3:

```bash
cd apps/web
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

## Kiem tra nhanh

### Backend

```bash
cd apps/api
source .venv/bin/activate
pytest tests
```

### Frontend build

```bash
cd apps/web
npm run build
```

## Neu gap loi

### Loi ket noi database

Kiem tra lai:

- Docker da chay chua
- Port `5432` co bi chiem khong
- `WELLNESS_DATABASE_URL` co dung khong

### Loi frontend khong goi duoc API

Kiem tra:

- Backend co dang chay o `http://localhost:8000` khong
- Da set `NEXT_PUBLIC_API_BASE_URL` chua

### Loi dang nhap admin

Kiem tra:

- Backend moi khoi dong seed chua
- Username/password co dung `admin / admin123` khong

### Muon reset du lieu SQLite

Tat backend roi xoa file:

```bash
rm apps/api/wellness_local.db
```

Sau do chay lai backend de seed lai.

### Muon reset du lieu PostgreSQL local

```bash
docker compose down -v
docker compose up -d postgres
```

Sau do chay lai backend de app tao lai schema va seed lai.

