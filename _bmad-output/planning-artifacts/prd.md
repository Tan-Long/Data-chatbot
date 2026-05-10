---
stepsCompleted:
  - "step-01-init"
  - "step-02-discovery"
  - "step-02b-vision"
  - "step-02c-executive-summary"
  - "step-03-success"
  - "step-04-journeys"
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-Data-Chatbot.md"
  - "_bmad-output/planning-artifacts/product-brief-Data-Chatbot-distillate.md"
  - "docs/He_thong_AI_chatbot_do_uong_healthy.md"
workflowType: "prd"
documentCounts:
  productBriefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 1
classification:
  projectType: "web_app"
  domain: "wellness_commerce"
  complexity: "high"
  projectContext: "brownfield integration"
  regulatoryPosture: "healthcare-adjacent, non-diagnostic, governed recommendations"
---

# Product Requirements Document - Data-Chatbot

**Author:** Kirin
**Date:** 2026-05-10

## Executive Summary

Dự án xây dựng một `web_app` AI cho `wellness commerce`, giúp doanh nghiệp đồ uống healthy và wellness tự động hóa hoạt động tư vấn sản phẩm với độ chính xác cao, phản hồi tức thời và khả năng phục vụ `24/7`. Hệ thống được định vị như một lớp tư vấn có governance, không phải công cụ khuyến nghị y khoa, và tập trung vào việc trả lời đúng, đủ, dễ hiểu, nhất quán theo dữ liệu sản phẩm và ngữ cảnh nhu cầu khách hàng.

Bài toán cốt lõi là giảm phụ thuộc vào đội ngũ tư vấn thủ công vốn bị giới hạn bởi thời gian, chi phí và mức độ đồng nhất trong chất lượng phản hồi. Thay vì để khách hàng chờ nhân sự trả lời hoặc nhận thông tin rời rạc từ nhiều kênh, hệ thống cung cấp một trải nghiệm tư vấn tự nhiên, chuyên nghiệp và cá nhân hóa hơn, đồng thời giúp doanh nghiệp chuẩn hóa tri thức bán hàng, tăng hiệu quả chuyển đổi và duy trì chất lượng giao tiếp ở quy mô lớn.

Dự án nằm trong bối cảnh `brownfield integration`: hệ thống mới không tồn tại độc lập mà cần tận dụng, kết nối và chuẩn hóa các tài sản hiện hữu như dữ liệu sản phẩm, nội dung tư vấn, tín hiệu hành vi khách hàng và các điểm chạm vận hành. Vì vậy, độ phức tạp của dự án ở mức `high`, không phải do giao diện người dùng, mà do yêu cầu kết hợp giữa RAG, quản trị dữ liệu, kiểm soát claims, consent, guardrails tư vấn và khả năng tích hợp đa nguồn.

### What Makes This Special

Điểm khác biệt cốt lõi không nằm ở việc “có chatbot”, mà ở chất lượng và cấu trúc của dữ liệu đứng sau chatbot. Khi nguồn dữ liệu được chuẩn hóa và tối ưu, hệ thống không chỉ trả lời câu hỏi mà còn hiểu đúng thông tin sản phẩm, hiểu đúng nhu cầu người dùng và đưa ra tư vấn phù hợp hơn các chatbot thông thường vốn chỉ phản hồi theo kịch bản hoặc nội dung tĩnh.

Khoảnh khắc tạo khác biệt cho người dùng là khi họ nhận được câu trả lời chính xác, nhất quán và tức thời vào bất kỳ thời điểm nào, nhưng vẫn cảm thấy như đang được hỗ trợ bởi một tư vấn viên chuyên nghiệp. Với doanh nghiệp, giá trị đặc biệt là khả năng thay thế phần lớn khối lượng tư vấn lặp lại bằng một hệ thống hoạt động liên tục, tiết kiệm nhân sự và thời gian, nhưng không đánh đổi trải nghiệm khách hàng.

## Project Classification

- **Project Type:** `web_app`
- **Domain:** `wellness_commerce`
- **Complexity:** `high`
- **Project Context:** `brownfield integration`
- **Regulatory Posture:** `healthcare-adjacent, non-diagnostic, governed recommendations`

Đây là một hệ thống khuyến nghị wellness có kiểm soát, không phải cố vấn y khoa. Vì vậy, PRD sẽ cần ưu tiên các yêu cầu về độ chính xác tư vấn, tính nhất quán nội dung, dữ liệu được quản trị tốt, ranh giới an toàn trong khuyến nghị, và khả năng tích hợp vào hệ sinh thái vận hành hiện có.

## Success Criteria

### User Success

Người dùng được xem là thành công khi họ nhận được câu trả lời chính xác, nhanh chóng và phù hợp với nhu cầu sản phẩm, mà không cần chờ tư vấn viên nhưng vẫn có cảm giác được hỗ trợ đầy đủ. Hệ thống phải giúp khách hàng dễ dàng tìm hiểu thông tin, so sánh lựa chọn và đi đến quyết định mua hàng với ít ma sát hơn so với tư vấn thủ công hoặc nội dung tĩnh.

Về trải nghiệm, phản hồi đầu tiên phải được trả về trong dưới `3 giây`, và một phiên tư vấn cơ bản phải có thể hoàn tất trong khoảng `2–5 phút`. Mục tiêu chất lượng trải nghiệm là đạt trên `85%` mức hài lòng của khách hàng đối với quá trình tư vấn, đồng thời tăng tỷ lệ khách quay lại sử dụng chatbot và giảm tỷ lệ bỏ cuộc giữa cuộc trò chuyện.

### Business Success

Trong `3 tháng` đầu, hệ thống phải chứng minh được giá trị vận hành cốt lõi: tự động hóa `50–70%` các câu hỏi lặp lại, giảm đáng kể thời gian và chi phí tư vấn thủ công, đồng thời hình thành được một knowledge base chuẩn hóa cho sản phẩm. Song song, doanh nghiệp cần bắt đầu thu thập được dữ liệu khách hàng và insight hành vi đủ chất lượng để làm nền cho các giai đoạn tối ưu tiếp theo.

Trong `12 tháng`, chatbot phải tiến tới vai trò là một kênh tư vấn và chăm sóc khách hàng chính. Các chỉ số thành công ở giai đoạn này gồm tăng tỷ lệ chuyển đổi từ tư vấn sang mua hàng, giảm phụ thuộc vào đội ngũ tư vấn quy mô lớn, tích hợp được với CRM, marketing automation và hệ thống bán hàng, và từng bước hình thành hệ sinh thái dữ liệu giúp AI cải thiện theo thời gian.

### Technical Success

Ở giai đoạn MVP, hệ thống phải đạt tỷ lệ trả lời đúng theo knowledge base ở mức tối thiểu `80%`. Khi bước sang giai đoạn Growth, mục tiêu chất lượng phải tăng lên mức `90–95%` cho các trường hợp nằm trong phạm vi tri thức đã được chuẩn hóa. Tốc độ phản hồi trung bình phải dưới `3 giây`, và trong điều kiện vận hành bình thường không được vượt quá `5 giây`.

Tỷ lệ phải chuyển tiếp sang người thật là một chỉ số kỹ thuật và vận hành quan trọng. Trong MVP, tỷ lệ này phải giữ dưới `30%`; ở giai đoạn Growth, mục tiêu giảm xuống `10–15%`; và với nhóm câu hỏi phổ biến, hệ thống nên duy trì tỷ lệ handoff dưới `5%`. Các chỉ số này phải được đạt trong bối cảnh vẫn giữ được guardrails về claims, consent và ranh giới tư vấn phi y khoa.

### Measurable Outcomes

Các kết quả đo lường chính của sản phẩm gồm:
- Phản hồi đầu tiên dưới `3 giây`
- Hoàn tất tư vấn cơ bản trong `2–5 phút`
- Mức hài lòng người dùng trên `85%`
- Tự động hóa `50–70%` câu hỏi lặp lại trong `3 tháng`
- Tỷ lệ trả lời đúng theo knowledge base đạt `>= 80%` ở MVP và `>= 90%` ở Growth
- Tỷ lệ handoff dưới `30%` ở MVP, dưới `10–15%` ở Growth, và dưới `5%` với câu hỏi phổ biến
- Tăng tỷ lệ chuyển đổi từ cuộc trò chuyện sang mua hàng trong vòng `12 tháng`

## Product Scope

### MVP - Minimum Viable Product

MVP phải tập trung chứng minh rằng chatbot có thể tư vấn khách hàng hiệu quả và giảm tải nhân sự trong bối cảnh thực tế. Phạm vi bắt buộc gồm knowledge base sản phẩm được chuẩn hóa với FAQ, thông tin sản phẩm, giá, công dụng và chính sách; chatbot trả lời chính xác theo dữ liệu được cung cấp; khả năng tư vấn theo ngữ cảnh cơ bản để gợi ý sản phẩm phù hợp theo nhu cầu; hoạt động đa kênh cơ bản trên các nền tảng như website, Facebook Messenger, Zalo hoặc Telegram; dashboard đơn giản để cập nhật dữ liệu và xem lịch sử hội thoại; và cơ chế chuyển tiếp cho người thật khi chatbot không xử lý được.

### Growth Features (Post-MVP)

Sau khi chứng minh được giá trị cốt lõi, hệ thống mở rộng thành một AI sales và customer care assistant. Phạm vi Growth gồm cá nhân hóa tư vấn theo hành vi và lịch sử khách hàng, upsell/cross-sell thông minh, voice AI, tích hợp CRM, đơn hàng, tồn kho và membership, khả năng học từ hội thoại để cải thiện phản hồi, phân tích cảm xúc và mức độ hài lòng, marketing automation cho nhắc mua lại, chăm sóc sau bán và gửi ưu đãi, cùng các agent workflow cho sale, CSKH, chăm sóc khách cũ và thu lead tự động.

### Vision (Future)

Trong tầm nhìn `2–3 năm`, sản phẩm phát triển thành một AI Customer Operating System toàn diện cho doanh nghiệp. Hệ thống lý tưởng sẽ hiểu dữ liệu sản phẩm, khách hàng, hành vi mua, marketing và vận hành trong một kiến trúc thống nhất; hỗ trợ AI đa nhân cách như sale expert, chăm sóc khách VIP, chuyên gia sản phẩm và mentor cộng đồng; tư vấn đa phương thức qua text, voice và video AI avatar; tự động vận hành toàn bộ funnel từ thu hút lead đến nuôi dưỡng, chốt sale, chăm sóc, tái mua và affiliate/referral; tự học liên tục từ dữ liệu thực tế; dự đoán nhu cầu khách hàng trước khi họ chủ động hỏi; và kết nối omnichannel qua website, social, app, POS, CRM và call center. Kết quả cuối cùng là doanh nghiệp có thể “nhân bản chuyên gia bán hàng tốt nhất” thành AI hoạt động `24/7`.

## User Journeys

### Journey 1: Khách hàng chính tìm sản phẩm phù hợp và đi đến quyết định mua

Lan, 29 tuổi, biết đến thương hiệu qua Facebook sau khi xem nội dung về detox và nước ép healthy. Cô muốn tìm sản phẩm phù hợp với nhu cầu cải thiện tiêu hóa và duy trì lối sống lành mạnh, nhưng không muốn chờ tư vấn viên phản hồi từng tin nhắn. Khi bắt đầu trò chuyện, chatbot phản hồi gần như ngay lập tức, hỏi đúng ngữ cảnh như mục tiêu sử dụng, mối quan tâm chính, ngân sách hoặc loại sản phẩm đang tìm, rồi dùng chính các tín hiệu đó để tư vấn.

Giá trị cốt lõi của hành trình không chỉ là trả lời nhanh, mà là tạo được niềm tin. Chatbot không chỉ đưa ra gợi ý sản phẩm hoặc combo, mà còn cho Lan thấy vì sao đề xuất đó phù hợp: dựa trên mục tiêu của cô, thành phần sản phẩm, review, chính sách và ngữ cảnh vừa được cung cấp. Khoảnh khắc khác biệt là khi Lan cảm thấy hệ thống không bán hàng đại trà, mà đang hỗ trợ cô ra quyết định một cách có cơ sở và dễ hiểu. Kết thúc hành trình, Lan đủ tự tin để mua mà không cần chờ người thật.

Journey này bộc lộ yêu cầu về context capture, grounded recommendation, explainability of recommendation, trình bày rõ lý do gợi ý, và khả năng chốt một phiên tư vấn cơ bản trong vài phút.

### Journey 2: Khách hàng edge case gặp ranh giới tư vấn và được hỗ trợ an toàn

Minh, 41 tuổi, đến từ Zalo và quan tâm đến ginger shot, nhưng nhanh chóng đặt các câu hỏi vượt ngoài phạm vi an toàn như bệnh nền, tình trạng sức khỏe cá nhân hoặc yêu cầu khuyến nghị mang tính chẩn đoán. Thay vì cố trả lời cho đủ, chatbot phải nhận diện đây là vùng rủi ro cao và dừng lại đúng lúc.

Điểm quyết định của hành trình là cách hệ thống từ chối. Chatbot không được bịa, không được trả lời mơ hồ, nhưng cũng không được làm khách hàng thấy bị bỏ rơi. Hệ thống cần thừa nhận giới hạn một cách tự nhiên, nhắc rõ rằng đây là công cụ tư vấn sản phẩm chứ không thay thế chuyên gia y tế hoặc tư vấn viên chuyên sâu, đồng thời đưa ra bước tiếp theo rõ ràng: chuyển người thật, tóm tắt vấn đề, và cho khách biết yêu cầu của họ đang được xử lý. Hành trình thành công khi Minh vẫn cảm thấy được hỗ trợ có trách nhiệm dù chatbot không tiếp tục trả lời trực tiếp.

Journey này làm lộ yêu cầu về guardrails, safe fallback messaging, clear next-step reassurance, phát hiện câu hỏi vượt phạm vi, và handoff có tóm tắt ngữ cảnh.

### Journey 3: Admin / vận hành duy trì và cải thiện chất lượng chatbot

Hương thuộc team vận hành sản phẩm và marketing, phụ trách knowledge base và chất lượng chatbot. Mỗi ngày cô cập nhật sản phẩm mới, rà soát các câu trả lời sai, theo dõi feedback và gắn tag cho hội thoại quan trọng. Nhưng giá trị thực của hành trình này không nằm ở thao tác, mà ở quyết định: Hương cần biết nên sửa gì trước để tác động lớn nhất đến độ chính xác, tỷ lệ handoff, conversion hoặc risk.

Hành trình bắt đầu từ dashboard vận hành, nơi Hương nhìn thấy các chỉ số như accuracy, response time, satisfaction, handoff rate và các nhóm hội thoại lỗi. Từ đó cô quyết định ưu tiên sửa các FAQ nào, thêm intent nào, hoặc điều chỉnh tri thức nào để giảm tác động tiêu cực lớn nhất. Sau khi cập nhật, hệ thống phải cho Hương nhìn được hiệu quả trước/sau: chatbot có trả lời tốt hơn không, case fail có giảm không, handoff có cải thiện không. Khi hành trình kết thúc tốt, chatbot không còn là hộp đen mà là một hệ thống có thể tối ưu bằng quyết định vận hành có cơ sở.

Journey này bộc lộ yêu cầu về knowledge base management, review queue, change tracking, before/after impact measurement, operational prioritization và analytics vận hành.

### Journey 4: CSKH / tư vấn viên nhận handoff và xử lý tiếp không đứt mạch

Tuấn là tư vấn viên CSKH nhận ca khi chatbot không thể xử lý tiếp. Trước đây, mỗi lần tiếp quản là một lần khách hàng phải kể lại từ đầu. Trong hệ thống mục tiêu, khi handoff xảy ra, Tuấn nhận được toàn bộ lịch sử hội thoại, tóm tắt nhu cầu, sản phẩm khách đang quan tâm, intent dự đoán, các câu chatbot chưa xử lý được, thông tin khách hàng sẵn có và trạng thái cảm xúc hiện tại.

Nhưng hành trình này không dừng ở việc “đủ context”. Tuấn còn cần được hỗ trợ để hành động nhanh: case nào là VIP, case nào đang bức xúc, case nào có khả năng chốt đơn cao, và bước tiếp theo phù hợp nhất là gì. Hệ thống nên giúp anh ưu tiên hàng đợi và gợi ý next best action thay vì chỉ đưa transcript thô. Hành trình thành công khi khách không phải lặp lại thông tin, CSKH vào việc ngay, và trải nghiệm giữa AI với người thật vẫn liền mạch.

Journey này bộc lộ yêu cầu về handoff package, queue triage, priority scoring, customer snapshot, sentiment tagging và agent assist / next best action.

### Journey 5: Người tích hợp hệ thống mở rộng dữ liệu và kênh mà không làm hỏng chất lượng tư vấn

Ở giai đoạn mở rộng, người phụ trách kỹ thuật hoặc vận hành hệ thống cần kết nối chatbot với CRM, đơn hàng, membership, social channels hoặc tồn kho. Journey này không chỉ là việc tích hợp kỹ thuật; nó quyết định chatbot có còn đáng tin hay không. Nếu mapping sai, source-of-truth không rõ hoặc đồng bộ lỗi, chatbot sẽ tư vấn sai và làm mất niềm tin của cả khách hàng lẫn đội vận hành.

Hành trình bắt đầu từ việc xác định hệ thống nào là nguồn dữ liệu chính, trường dữ liệu nào được phép dùng để tư vấn, và kết nối nào cần kiểm tra trước khi đưa vào production. Trong quá trình tích hợp, người này cần khả năng xác nhận mapping, kiểm tra chất lượng dữ liệu sau đồng bộ và có phương án rollback nếu integration làm giảm độ chính xác tư vấn. Hành trình thành công khi mở rộng dữ liệu và kênh mà không phá vỡ trải nghiệm đang chạy, và khi chất lượng tích hợp được nhìn thấy trực tiếp qua độ tin cậy của recommendation.

Journey này bộc lộ yêu cầu về source-of-truth, integration validation, data quality checks, rollback workflow, auditability và theo dõi tác động tích hợp lên recommendation accuracy.

### Journey Requirements Summary

Các journeys trên làm lộ ra các capability bắt buộc sau:
- Thu thập ngữ cảnh người dùng để cá nhân hóa tư vấn.
- Gợi ý sản phẩm hoặc combo có giải thích rõ vì sao phù hợp.
- Trả lời grounded theo knowledge base với guardrails rõ ràng.
- Safe fallback và handoff sang người thật có trấn an, có bước tiếp theo rõ ràng.
- Dashboard vận hành hỗ trợ quyết định ưu tiên tối ưu.
- Đo tác động trước/sau khi cập nhật knowledge base.
- Handoff package đầy đủ ngữ cảnh cùng queue triage và next best action cho CSKH.
- Tích hợp dữ liệu có kiểm định, rollback và gắn trực tiếp với trust / accuracy.
