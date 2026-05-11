# Data Chatbot Commerce Foundation

Repo nay da duoc nang cap tu bo planning BMAD thanh mot foundation co the mo rong cho website ban hang SEO-first theo huong wellness commerce.

## Kien truc

- `apps/web`: Next.js storefront va admin shell
- `apps/api`: FastAPI cho catalog, order, customer, quiz, va AI handoff foundation
- `_bmad-output/implementation-artifacts`: implementation spec theo workflow BMAD

## Muc tieu phase nay

- Tao storefront SSR/SEO cho home, category, product detail, membership, quiz va blog
- Tao admin shell cho quan ly don hang va khach hang
- Tao API foundation cho catalog, order, customer, quiz recommendation va AI handoff
- Dinh nghia domain models cho commerce, customer, membership va AI context

## Chay local

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

### Backend

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Admin seed mac dinh:

```text
username: admin
password: admin123
```

### PostgreSQL

```bash
docker compose up -d postgres
```

## Ghi chu

- Frontend hien tai dung sample data noi bo de render on dinh ngay ca khi backend chua bat.
- Frontend admin tai `http://localhost:3000/admin` dang nhap bang JWT va goi backend qua `NEXT_PUBLIC_API_BASE_URL` (mac dinh `http://localhost:8000`).
- Backend da co DB persistence, seed data, JWT auth, va CRUD cho categories, products, customers, orders.
- AI advisor duoc dat o muc `embedded MVP`: quiz + recommendation + handoff payload.
