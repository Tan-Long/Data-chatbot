from .schemas import (
    ArticleOut,
    CategoryOut,
    CustomerOut,
    OrderItemOut,
    OrderOut,
    ProductOut,
)


categories = [
    CategoryOut(
        id=1,
        slug="ginger-shot",
        name="Ginger Shot",
        summary="Tang nang luong nhanh, tap trung vao lam am co the va routine buoi sang.",
        seo_title="Ginger Shot cho routine buoi sang | Wellness Brand",
        seo_description="Bo suu tap ginger shot cho muc tieu lam am co the, ho tro tieu hoa va khoi dong ngay moi.",
    ),
    CategoryOut(
        id=2,
        slug="detox-juice",
        name="Nuoc ep detox",
        summary="Combo nuoc ep cho nhu cau nhe bung, bo sung rau cu qua va refresh co the.",
        seo_title="Nuoc ep detox va combo healthy | Wellness Brand",
        seo_description="Kham pha nuoc ep detox, combo healthy va huong dan lua chon theo muc tieu co the.",
    ),
]

products = [
    ProductOut(
        id=1,
        slug="ginger-shot-nghe-mat-ong",
        name="Ginger Shot nghe mat ong",
        category_id=1,
        category_slug="ginger-shot",
        category_name="Ginger Shot",
        short_description="Shot dam vi giup khoi dong ngay moi gon, am va de duy tri.",
        benefits=["lam am co the", "ho tro tieu hoa", "de bat dau healthy routine"],
        ingredients=["gung", "nghe", "mat ong"],
        usage="Dung 1 shot vao buoi sang hoac truoc bua an nhe.",
        caution="Khong thay the tu van y khoa. Nguoi co tinh trang nhay cam can hoi chuyen gia.",
        price_vnd=39000,
        membership_eligible=True,
        is_published=True,
    ),
    ProductOut(
        id=2,
        slug="combo-detox-3-ngay",
        name="Combo detox 3 ngay",
        category_id=2,
        category_slug="detox-juice",
        category_name="Nuoc ep detox",
        short_description="Combo bat dau lai routine an uong gon, de theo doi va de check-in.",
        benefits=["giam cam giac nang ne", "xay dung healthy routine", "de ket hop coaching"],
        ingredients=["tao", "dua leo", "can tay", "chanh"],
        usage="Dung theo lich 3 ngay ket hop uong nuoc va bua an can bang.",
        caution="Khong dung nhu phuong an dieu tri. Can dieu chinh theo the trang thuc te.",
        price_vnd=289000,
        membership_eligible=True,
        is_published=True,
    ),
    ProductOut(
        id=3,
        slug="sua-hat-sang-nhe-bung",
        name="Sua hat sang nhe bung",
        category_id=2,
        category_slug="detox-juice",
        category_name="Nuoc ep detox",
        short_description="Sua hat cho bua sang nhanh, de uong va phu hop nhom khach can routine ben vung.",
        benefits=["bo sung nang luong nhe", "de dung vao bua sang", "ho tro giu nep sinh hoat"],
        ingredients=["hat dieu", "yen mach", "hat bi", "cha la"],
        usage="Dung lanh vao bua sang hoac sau tap nhe.",
        caution="Kiem tra thanh phan neu nhay cam voi hat.",
        price_vnd=59000,
        membership_eligible=False,
        is_published=True,
    ),
]

articles = [
    ArticleOut(
        id=1,
        slug="routine-7-ngay-khoi-dong-wellness",
        title="Routine 7 ngay khoi dong wellness khong ep xac",
        excerpt="Huong tiep can nhe, thuc dung va co the bat dau tu shot, juice va check-in moi ngay.",
        body=(
            "Routine bat dau tu nhung thao tac nho: chon mot shot de hop buoi sang, "
            "mot combo de theo doi 3 ngay, va mot nhip check-in khong tao ap luc."
        ),
        topic="routine",
        seo_title="Routine 7 ngay khoi dong wellness",
        seo_description="Goc nhin sinh dong ve cach bat dau wellness routine bang combo shot, juice va check-in.",
        is_published=True,
    ),
    ArticleOut(
        id=2,
        slug="cach-chon-combo-theo-muc-tieu",
        title="Cach chon combo theo muc tieu: nhe bung, giam can, giu nep",
        excerpt="Khong phai ai cung can mot combo giong nhau. Dieu quan trong la muc tieu va kha nang duy tri.",
        body=(
            "Combo nen duoc chon theo muc tieu thuc te, kha nang duy tri, va muc san sang "
            "cua khach hang thay vi chay theo mot loi hua chung chung."
        ),
        topic="guide",
        seo_title="Cach chon combo healthy theo muc tieu",
        seo_description="Huong dan chon combo healthy theo muc tieu va routine ca nhan.",
        is_published=True,
    ),
]

customers = [
    CustomerOut(
        id=1,
        full_name="Le Minh Anh",
        phone="0901234567",
        email="minhanh@example.com",
        status="active",
        lead_source="seo-blog",
        primary_goal="nhe bung",
        membership_status="active",
        tags=["repeat", "high-intent", "membership"],
        notes="Thuong mua combo 3 ngay va hay hoi ve routine sau bua toi.",
    ),
    CustomerOut(
        id=2,
        full_name="Tran Bao Chau",
        phone="0911222333",
        email=None,
        status="lead",
        lead_source="quiz",
        primary_goal="giam can",
        membership_status="none",
        tags=["new", "quiz-lead"],
        notes="Can tu van de bat dau ma khong qua ap luc.",
    ),
]

orders = [
    OrderOut(
        id=1,
        order_code="ORD-240511-001",
        customer_id=1,
        customer_name="Le Minh Anh",
        customer_phone="0901234567",
        status="confirmed",
        payment_method="cod",
        total_vnd=367000,
        source_channel="website",
        shipping_city="Ho Chi Minh",
        items=[
            OrderItemOut(
                id=1,
                product_id=2,
                product_slug="combo-detox-3-ngay",
                product_name="Combo detox 3 ngay",
                quantity=1,
                unit_price_vnd=289000,
            ),
            OrderItemOut(
                id=2,
                product_id=1,
                product_slug="ginger-shot-nghe-mat-ong",
                product_name="Ginger Shot nghe mat ong",
                quantity=2,
                unit_price_vnd=39000,
            ),
        ],
    )
]
