export type Category = {
  slug: string;
  name: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  caution: string;
  priceVnd: number;
  membershipEligible: boolean;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  seoTitle: string;
  seoDescription: string;
};

export type Customer = {
  fullName: string;
  phone: string;
  status: string;
  leadSource: string;
  primaryGoal: string;
  membershipStatus: string;
  tags: string[];
};

export type Order = {
  orderCode: string;
  customerPhone: string;
  status: string;
  totalVnd: number;
  sourceChannel: string;
};

export const categories: Category[] = [
  {
    slug: "ginger-shot",
    name: "Ginger Shot",
    summary: "Routine buoi sang gon, am va de tao nep deu.",
    seoTitle: "Ginger Shot cho buoi sang chu dong",
    seoDescription: "Kham pha bo suu tap ginger shot cho nhu cau bat dau ngay moi de duy tri hon."
  },
  {
    slug: "detox-juice",
    name: "Nuoc ep detox",
    summary: "Combo refresh va nhe bung theo goc nhin huong dan thuc dung.",
    seoTitle: "Nuoc ep detox va combo healthy",
    seoDescription: "Nuoc ep detox, sua hat, combo khoi dong va huong dan chon theo muc tieu."
  }
];

export const products: Product[] = [
  {
    slug: "ginger-shot-nghe-mat-ong",
    name: "Ginger Shot nghe mat ong",
    categorySlug: "ginger-shot",
    categoryName: "Ginger Shot",
    shortDescription: "Shot dam vi cho nhom khach can cam giac khoi dong nhe ma tap trung.",
    benefits: ["lam am co the", "ho tro tieu hoa", "bat dau routine de duy tri"],
    ingredients: ["gung", "nghe", "mat ong"],
    usage: "Dung 1 shot vao buoi sang hoac truoc bua an nhe.",
    caution: "Chi la thong tin chon san pham, khong thay the tu van y khoa.",
    priceVnd: 39000,
    membershipEligible: true
  },
  {
    slug: "combo-detox-3-ngay",
    name: "Combo detox 3 ngay",
    categorySlug: "detox-juice",
    categoryName: "Nuoc ep detox",
    shortDescription: "Combo nhe bung, de bat dau va de ket hop check-in moi ngay.",
    benefits: ["giam cam giac nang ne", "de tao healthy routine", "phu hop voi coaching journey"],
    ingredients: ["tao", "dua leo", "can tay", "chanh"],
    usage: "Dung theo lich 3 ngay ket hop ngu, uong nuoc va bua an can bang.",
    caution: "Khong dung nhu giai phap dieu tri hay thay the tu van chuyen mon.",
    priceVnd: 289000,
    membershipEligible: true
  },
  {
    slug: "sua-hat-sang-nhe-bung",
    name: "Sua hat sang nhe bung",
    categorySlug: "detox-juice",
    categoryName: "Nuoc ep detox",
    shortDescription: "Lua chon nhe cho bua sang nhanh ma van giu phong cach wellness brand.",
    benefits: ["bo sung nang luong nhe", "giu nep bua sang", "de ket hop combo ngay thuong"],
    ingredients: ["hat dieu", "yen mach", "hat bi", "cha la"],
    usage: "Dung lanh vao buoi sang hoac sau tap nhe.",
    caution: "Kiem tra thanh phan neu co nhay cam voi cac loai hat.",
    priceVnd: 59000,
    membershipEligible: false
  }
];

export const articles: Article[] = [
  {
    slug: "routine-7-ngay-khoi-dong-wellness",
    title: "Routine 7 ngay khoi dong wellness khong ep xac",
    excerpt: "Bat dau bang shot, juice, note check-in va nhung thay doi nho nhung duy tri duoc.",
    topic: "routine",
    seoTitle: "Routine 7 ngay khoi dong wellness",
    seoDescription: "Goc nhin sinh dong ve cach bat dau wellness routine ma khong can lam qua suc."
  },
  {
    slug: "cach-chon-combo-theo-muc-tieu",
    title: "Cach chon combo theo muc tieu: nhe bung, giam can, giu nep",
    excerpt: "Moi combo chi co y nghia khi no hop voi muc tieu va nhip song thuc te cua ban.",
    topic: "guide",
    seoTitle: "Cach chon combo healthy theo muc tieu",
    seoDescription: "Huong dan chon combo healthy theo muc tieu ca nhan thay vi mua theo phong trao."
  }
];

export const customers: Customer[] = [
  {
    fullName: "Le Minh Anh",
    phone: "0901234567",
    status: "active",
    leadSource: "seo-blog",
    primaryGoal: "nhe bung",
    membershipStatus: "active",
    tags: ["repeat", "membership", "high-intent"]
  },
  {
    fullName: "Tran Bao Chau",
    phone: "0911222333",
    status: "lead",
    leadSource: "quiz",
    primaryGoal: "giam can",
    membershipStatus: "none",
    tags: ["new", "quiz-lead"]
  }
];

export const orders: Order[] = [
  {
    orderCode: "ORD-240511-001",
    customerPhone: "0901234567",
    status: "confirmed",
    totalVnd: 367000,
    sourceChannel: "website"
  },
  {
    orderCode: "ORD-240511-002",
    customerPhone: "0911222333",
    status: "pending_payment",
    totalVnd: 289000,
    sourceChannel: "quiz"
  }
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}

export function getCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((item) => item.categorySlug === slug);
}

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}
