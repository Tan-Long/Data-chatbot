# Da trien khai

## Tong quan

Repo da duoc nang cap tu bo planning BMAD thanh mot foundation co the chay duoc cho website wellness commerce theo huong:

- Storefront `SEO-first`
- `FastAPI` backend
- `PostgreSQL/SQLite` persistence
- Admin `JWT auth`
- CRUD cho `products`, `customers`, `orders`
- AI advisor foundation cho `quiz recommendation` va `handoff`

## Kien truc da tao

### Frontend

Thu muc: `apps/web`

Da co cac thanh phan chinh sau:

- `Next.js App Router`
- Layout va global styles
- SEO pages co metadata
- `robots.txt`
- `sitemap.xml`
- Admin dashboard client-side

### Backend

Thu muc: `apps/api`

Da co cac thanh phan chinh sau:

- `FastAPI`
- SQLAlchemy models
- Session DB
- Seed data khi startup
- Admin auth bang `JWT`
- API public + API admin

## Cac trang da co

### Storefront public

- `/`
- `/categories/[slug]`
- `/products/[slug]`
- `/blog`
- `/blog/[slug]`
- `/membership`
- `/quiz`
- `/cart`
- `/checkout`

### Admin

- `/admin`

## Cac API da co

### Public API

- `GET /health`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/{slug}`
- `GET /api/articles`
- `GET /api/articles/{slug}`
- `GET /api/customers`
- `GET /api/orders`
- `POST /api/orders/checkout`
- `POST /api/quiz/recommend`
- `POST /api/chat/handoff`

### Admin auth

- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`

### Admin dashboard

- `GET /api/admin/dashboard`

### Admin CRUD

- `GET/POST/PUT/DELETE /api/admin/categories`
- `GET/POST/PUT/DELETE /api/admin/products`
- `GET/POST/PUT/DELETE /api/admin/customers`
- `GET/POST/PUT/DELETE /api/admin/orders`

Luu y:

- Route `PUT` va `DELETE` dung theo `/{id}`

## Database va auth da lam

### Database

Da co:

- `Base.metadata.create_all()` khi app startup
- Seed categories, products, articles, customers, orders
- Seed `admin user`
- Ho tro `PostgreSQL` hoac `SQLite` thong qua `WELLNESS_DATABASE_URL`

### Auth

Da co:

- Login admin
- Tao `JWT access token`
- Bao ve admin endpoints bang bearer token
- Hash password bang `PBKDF2-HMAC`

## Admin CRUD da lam

### Products

Da ho tro:

- Tao san pham
- Sua san pham
- Xoa san pham
- Danh sach san pham

Thong tin chinh:

- category
- slug
- benefits
- ingredients
- price
- membership eligibility
- publish status

### Customers

Da ho tro:

- Tao khach hang
- Sua khach hang
- Xoa khach hang
- Danh sach khach hang

Thong tin chinh:

- full name
- phone
- email
- status
- lead source
- primary goal
- membership status
- tags
- notes

### Orders

Da ho tro:

- Tao don hang
- Sua don hang
- Xoa don hang
- Danh sach don hang

Thong tin chinh:

- customer
- payment method
- shipping city
- source channel
- status
- items

## Frontend admin da lam

Admin dashboard hien tai da co:

- Form login
- Luu token trong `localStorage`
- Load dashboard summary
- Load categories/products/customers/orders
- Form CRUD cho products
- Form CRUD cho customers
- Form CRUD cho orders

## SEO foundation da lam

Da co:

- Metadata cho cac trang chinh
- Dynamic route metadata
- `canonical` basics
- `Open Graph` basics
- `robots.txt`
- `sitemap.xml`
- JSON-LD cho `Organization`, `CollectionPage`, `Product`, `Article`

## Kiem thu da chay

Da verify:

- `pytest apps/api/tests` pass `5/5`
- `npm --prefix apps/web run build` pass

## Nhung gi chua lam

Chua production-ready o cac phan sau:

- Alembic migrations
- Role-based auth chi tiet
- Refresh token
- Category/article CRUD UI day du
- Payment gateway that
- Shipping integration that
- CMS that
- Upload media
- Cart state thuc
- Checkout form noi API that o frontend
- Inventory management
- Audit log

