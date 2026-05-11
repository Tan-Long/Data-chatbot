---
title: 'SEO commerce foundation'
type: 'feature'
created: '2026-05-11'
status: 'done'
baseline_commit: '37b6a733bbedaf44300846521a942cbaf4347c3b'
context:
  - '{project-root}/_bmad-output/planning-artifacts/prd.md'
---

<frozen-after-approval reason="human-owned intent - do not modify unless human renegotiates">

## Intent

**Problem:** Repo moi chi co planning artifacts cho chatbot wellness, chua co code foundation cho website ban hang SEO-first, quan ly don hang, quan ly khach hang, va AI advisor embedded.

**Approach:** Tao monorepo toi thieu gom `Next.js storefront + admin shell` va `FastAPI backend foundation`, kem domain models, sample data, va implementation artifact de buoc tiep theo co the noi DB, payment, auth, va CMS ma khong phai bat dau lai tu dau.

## Boundaries & Constraints

**Always:** Giu huong `D2C + Membership`, `Vietnam-first`, `ecommerce first`, storefront uu tien SEO va content commerce, AI advisor chi trong pham vi huong dan san pham.

**Ask First:** Auth production, payment gateway cu the, shipping provider cu the, CMS thay bang third-party.

**Never:** Khong tuyen bo da hoan tat production commerce, khong dua logic y khoa/diagnosis vao chatbot, khong them CRM enterprise scope trong phase nay.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| SEO_STORE_RENDER | User vao home/category/PDP/blog | Trang render SSR-friendly voi metadata va structured content | 404 cho slug khong ton tai |
| QUIZ_RECOMMENDATION | Goal + concern + preferred format | API tra ve 2 san pham de xuat va next step | Tra ve payload an toan, khong dua claim y khoa |
| AI_HANDOFF | Cau hoi nhay cam | API tra ve safe reply va handoff payload | Bat buoc handoff_required = true |

</frozen-after-approval>

## Code Map

- `apps/web` -- storefront SEO-first va admin shell
- `apps/api` -- API foundation cho catalog, order, customer, quiz va AI handoff
- `README.md` -- huong dan run repo va mo ta kien truc

## Tasks & Acceptance

**Execution:**
- [x] `apps/web` -- scaffold storefront va admin shell -- tao user-facing foundation theo plan
- [x] `apps/api` -- tao backend sample endpoints, schemas, domain models -- dat cot song cho commerce/admin/AI
- [x] `README.md` -- document setup va architecture -- giam ma sat cho lan tiep theo

**Acceptance Criteria:**
- Given nguoi dung vao trang public, when truy cap home/category/product/blog/membership/quiz, then thay duoc content commerce co metadata va dieu huong ro rang.
- Given admin can xem van hanh, when mo trang admin, then thay overview cho don hang, khach hang, membership va AI inbox.
- Given frontend/backend chua noi DB that, when goi API sample, then nhan duoc payload hop le cho products, orders, customers, checkout va quiz recommendation.

## Design Notes

Foundation nay co y khong giai bai toan production day du. No co vai tro chot: bien planning artifact thanh mot bo ma nguon co cau truc, co domain boundary, va co diem gan de phat trien tiep thanh commerce platform thuc te.

## Verification

**Commands:**
- `python3 -m compileall apps/api/app` -- expected: khong co loi syntax Python
- `pytest apps/api/tests` -- expected: 4 tests pass sau khi cai dependencies
