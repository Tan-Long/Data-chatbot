---
title: "Product Brief Distillate: Data-Chatbot"
type: llm-distillate
source: "product-brief-Data-Chatbot.md"
created: "2026-05-10T16:21:08.2779915+07:00"
purpose: "Token-efficient context for downstream PRD creation"
---

# Product Brief Distillate: Data-Chatbot

## Product Intent

- Sản phẩm mục tiêu không phải chatbot FAQ đơn lẻ mà là nền tảng dữ liệu + AI cho thương hiệu đồ uống healthy và wellness.
- Use case mở màn là tư vấn sản phẩm bằng RAG chatbot; các lớp tiếp theo gồm recommendation, AI sales, CRM automation, community support và về sau là predictive AI.
- Hướng triển khai nên giữ tinh thần `AI-first`, `data-centric`, `RAG-first`, `privacy-by-design`.
- Entry wedge phù hợp nhất là thương hiệu D2C hoặc chuỗi wellness có lưu lượng hỏi đáp lặp lại trên `website`, `Zalo`, hoặc social inbox nhưng tri thức bán hàng còn rời rạc.

## Problem Signals

- Dữ liệu khách hàng và sản phẩm đang phân mảnh giữa `CRM`, `Zalo`, `Facebook`, `TikTok`, `POS`, `ERP`, `website`, `app`.
- Đội sale/marketing/community đang phải xử lý nhiều câu hỏi lặp lại về công dụng, thành phần, cách dùng, lựa chọn combo và mục tiêu sức khỏe.
- Trải nghiệm tư vấn hiện tại có nguy cơ chậm, không nhất quán, khó cá nhân hóa và khó mở rộng theo số lượng khách hàng.
- Doanh nghiệp thiếu vòng lặp để biến `feedback`, `check-in`, `review video`, `meal logs`, `workout logs` thành dữ liệu cải thiện AI và hiệu quả kinh doanh.

## Primary Users

- Người dùng ngoài: khách hàng quan tâm đến detox, ginger shot, nước ép healthy, sữa hạt, giảm cân, chăm sóc sức khỏe, membership, coaching.
- Người dùng ngoài cần quyết định nhanh sản phẩm nào phù hợp với mục tiêu cá nhân và muốn được hướng dẫn dễ hiểu, đáng tin, không quá bán hàng.
- Người dùng nội bộ: sale, marketing, community manager, coach/wellness advisor.
- Người dùng nội bộ cần câu trả lời thống nhất, truy xuất tri thức nhanh, phân nhóm người dùng tốt hơn và tín hiệu để upsell/chăm sóc lại đúng lúc.

## Requirements Hints

- Phải có `product dataset` chuẩn hóa cho từng SKU/nhóm sản phẩm.
- Phải có `knowledge base` dùng cho FAQ và RAG retrieval.
- Phải hỗ trợ tư vấn theo mục tiêu người dùng như tiêu hóa, giảm cân, wellness routine, nhưng không vượt sang chẩn đoán hay tư vấn y khoa.
- Phải lưu và sử dụng tín hiệu hành vi sau tương tác như mua thử, check-in, phản hồi, quay lại mua combo.
- Phải có dashboard theo dõi chất lượng tư vấn, chuyển đổi và tăng trưởng dữ liệu.
- Phải có cơ chế consent và giới hạn dữ liệu khi thu thập thông tin mang tính sức khỏe hoặc lối sống.
- Phải có kiến trúc mở đường cho recommendation engine và CRM automation sau MVP.

## Data Model Hints

- Product dataset tối thiểu nên có: `product_id`, `name`, `category`, `ingredients`, `benefits_claim`, `usage`, `contraindication_or_caution`, `faq_links`, `price_or_package`, `bundle_relations`.
- Cần taxonomy chuẩn cho `category` và `goal` để mapping từ nhu cầu người dùng sang sản phẩm/combos.
- Cần metadata cho claims: claim nào được phép dùng, nguồn xác thực nội bộ, mức độ chắc chắn, quy tắc diễn đạt an toàn.
- User profile nên tách `basic profile`, `declared goals`, `behavior events`, `consent flags`, `channel source`, `purchase history`.
- Event model nên chuẩn hóa các mốc: `content_view`, `quiz_started`, `quiz_completed`, `ai_consultation`, `trial_purchase`, `check_in_submitted`, `upsell_offer`, `repeat_purchase`.
- Tài liệu nguồn ám chỉ cả dữ liệu có cấu trúc và phi cấu trúc; PRD cần xác định rõ ingestion pipeline cho từng loại.

## User Journey Hints

- Funnel lõi trong tài liệu: `Content -> Quiz -> AI tư vấn -> Mua thử -> Check-in -> Upsell`.
- `Quiz` là điểm quan trọng để lấy ngữ cảnh và tăng chất lượng gợi ý, không chỉ là lead form.
- `Check-in` là điểm then chốt để tạo vòng lặp dữ liệu sau mua và chuẩn bị cho recommendation/coaching.
- `Upsell` nên dựa trên mục tiêu, lịch sử tương tác và phản hồi thay vì chỉ dựa vào sản phẩm đã mua.

## MVP Scope Signals

- MVP chỉ nên phủ 2-3 nhóm sản phẩm cốt lõi có volume tư vấn cao nhất.
- MVP chỉ nên triển khai trên 1-2 kênh đầu tiên, ưu tiên `website` và `Zalo`.
- MVP cần có `dataset sản phẩm`, `FAQ`, `RAG chatbot`, kết nối dữ liệu thiết yếu và `dashboard`.
- MVP chưa cần `voice assistant`, `predictive AI production-grade`, `multi-agent AI`, hay tự động hóa full `B2B2C + affiliate + community`.
- PRD cần định nghĩa rõ “thiết yếu nhất” trong tập nguồn dữ liệu nội bộ, tránh tích hợp toàn bộ hệ thống từ đầu.

## Technical Context

- Stack MVP được đề xuất: `FastAPI`, `PostgreSQL`, `pgvector`, `OpenAI`, `n8n`, `Metabase`.
- Kỹ thuật AI được nêu trong tài liệu: `semantic search`, `embedding`, `hybrid retrieval`, `recommendation algorithm`, `user clustering`, `churn prediction`.
- Thứ tự kỹ thuật hợp lý: RAG retrieval ổn định trước, recommendation rules hoặc heuristic sau, predictive modeling sau nữa.
- `n8n` hàm ý mong muốn có workflow automation giữa kênh dữ liệu, CRM và follow-up.
- `Metabase` hàm ý nhóm cần năng lực theo dõi business metrics và vận hành, không chỉ metric kỹ thuật mô hình.

## Competitive / Market Intelligence

- Giá trị cạnh tranh không nằm ở model độc quyền mà ở tri thức bán hàng được chuẩn hóa và data flywheel riêng của thương hiệu.
- Nhiều đối thủ nhỏ có thể triển khai chatbot bề mặt; lợi thế bền hơn là khả năng nối `product knowledge + user behavior + follow-up automation`.
- Câu chuyện đầu tư hoặc go-to-market mạnh nhất là tăng chuyển đổi và giữ chân qua cá nhân hóa, không phải “AI cho AI”.
- RAG phù hợp vì domain có nhiều tri thức riêng của thương hiệu, cần cập nhật thường xuyên và cần giảm hallucination so với chatbot thuần sinh.

## Compliance / Risk Signals

- Dữ liệu sức khỏe là vùng rủi ro cao; hệ thống phải có `consent`, giới hạn phạm vi thu thập, mục đích xử lý rõ ràng và kiểm soát truy cập.
- Chatbot phải được định vị là tư vấn lựa chọn sản phẩm và wellness support, không phải chẩn đoán hoặc khuyến nghị y khoa.
- `benefits_claim` là trường dữ liệu có rủi ro cao; cần governance về câu chữ, bằng chứng nội bộ và policy phản hồi.
- Nếu dùng dữ liệu như `meal logs` hoặc `workout logs`, PRD cần quy định retention, access control, và trường hợp nào thực sự cần lưu.
- Rủi ro pháp lý nêu trong nghiên cứu bổ sung: Nghị định `13/2023/NĐ-CP` yêu cầu xử lý dữ liệu cá nhân đúng mục đích, có đồng ý rõ ràng và có trách nhiệm bảo vệ dữ liệu.
- Rủi ro nội dung nêu trong nghiên cứu bổ sung: các claim liên quan thực phẩm bổ sung/health benefits cần tránh diễn đạt như claim điều trị bệnh hoặc khẳng định quá mức.

## Success Metrics Hints

- `answer accuracy / groundedness` của chatbot theo knowledge base.
- Tỷ lệ từ `AI consultation` sang `trial purchase` hoặc để lại lead.
- Tỷ lệ quay lại mua hoặc mua combo sau follow-up/check-in.
- Tăng trưởng dữ liệu có consent và usable cho cá nhân hóa.
- Giảm thời gian phản hồi so với tư vấn thủ công.
- PRD nên thêm metric vận hành như coverage của dataset, retrieval hit quality, và tỷ lệ escalation sang người thật.

## Rejected / Deferred Ideas

- Không nên bắt đầu bằng hệ thống AI đầy đủ cho toàn bộ B2B2C, affiliate, coaching, community.
- Không nên đưa `AI voice assistant` vào MVP.
- Không nên triển khai `multi-agent AI` trong giai đoạn đầu.
- Không nên ưu tiên `churn prediction` production-grade trước khi có dữ liệu hành vi sạch và đủ dày.
- Không nên tích hợp tất cả nguồn dữ liệu nội bộ ngay từ đầu nếu chưa rõ use case trực tiếp cho MVP.

## Architecture Decisions To Clarify In PRD

- Chọn 2-3 nhóm sản phẩm nào cho MVP.
- Chọn 1-2 kênh nào cho lần ra mắt đầu tiên ngoài `website` và `Zalo` có thể cân nhắc hay loại bỏ.
- Xác định nguồn “single source of truth” cho product knowledge.
- Thiết kế ingestion cho dữ liệu từ CRM/POS/social như batch hay near-real-time.
- Xác định khi nào chatbot tự trả lời, khi nào handoff cho người thật.
- Quy định approval workflow cho cập nhật claims, FAQ và nội dung tư vấn.

## Open Questions

- Thương hiệu hoặc nhóm doanh nghiệp mục tiêu cụ thể là ai: một brand riêng, nhiều brand, hay một nền tảng dùng chung?
- Mục tiêu kinh doanh ưu tiên 6 tháng đầu là tăng chuyển đổi, giảm tải CSKH, tăng AOV, hay thu thập dữ liệu first-party?
- Quiz sẽ hỏi đến mức nào để đủ hữu ích nhưng không tạo ma sát hoặc thu thập dữ liệu quá nhạy cảm?
- Mức cá nhân hóa nào được phép ở MVP khi chưa có lịch sử mua và dữ liệu đủ dày?
- Có cần hỗ trợ đa ngôn ngữ, đa thương hiệu hoặc nhiều danh mục sản phẩm ngay giai đoạn đầu không?
- Bộ phận nào sẽ chịu trách nhiệm vận hành knowledge base và kiểm duyệt nội dung tư vấn?
