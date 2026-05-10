---
stepsCompleted:
  - "step-01-init"
  - "step-02-discovery"
  - "step-02b-vision"
  - "step-02c-executive-summary"
  - "step-03-success"
  - "step-04-journeys"
  - "step-05-domain"
  - "step-06-innovation"
  - "step-07-project-type"
  - "step-08-scoping"
  - "step-09-functional"
  - "step-10-nonfunctional"
  - "step-11-polish"
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-Data-Chatbot.md"
  - "_bmad-output/planning-artifacts/product-brief-Data-Chatbot-distillate.md"
  - "docs/He_thong_AI_chatbot_do_uong_healthy.md"
workflowType: "prd"
releaseMode: "phased"
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

MVP phải tập trung chứng minh rằng chatbot có thể tư vấn khách hàng hiệu quả và giảm tải nhân sự trong bối cảnh thực tế. Phạm vi bắt buộc gồm knowledge base sản phẩm được chuẩn hóa với FAQ, thông tin sản phẩm, giá, công dụng và chính sách; chatbot trả lời chính xác theo dữ liệu được cung cấp; khả năng tư vấn theo ngữ cảnh cơ bản để gợi ý sản phẩm phù hợp theo nhu cầu; vận hành `Zalo-first` với web admin tối giản để hỗ trợ quản trị và handoff; và cơ chế chuyển tiếp cho người thật khi chatbot không xử lý được.

### Growth Features (Post-MVP)

Sau khi chứng minh được giá trị cốt lõi, hệ thống mở rộng thành một AI sales và customer care assistant. Phạm vi Growth gồm cá nhân hóa tư vấn theo hành vi và lịch sử khách hàng, upsell/cross-sell thông minh, tích hợp CRM, đơn hàng, tồn kho và membership, khả năng học từ hội thoại để cải thiện phản hồi, phân tích cảm xúc và mức độ hài lòng, marketing automation cho nhắc mua lại, chăm sóc sau bán và gửi ưu đãi, cùng các agent workflow cho sale, CSKH, chăm sóc khách cũ và thu lead tự động.

### Vision (Future)

Trong tầm nhìn `2–3 năm`, sản phẩm phát triển thành một AI Customer Operating System toàn diện cho doanh nghiệp. Hệ thống lý tưởng sẽ hiểu dữ liệu sản phẩm, khách hàng, hành vi mua, marketing và vận hành trong một kiến trúc thống nhất; hỗ trợ AI đa nhân cách như sale expert, chăm sóc khách VIP, chuyên gia sản phẩm và mentor cộng đồng; tư vấn nhất quán trên nhiều điểm chạm số; tự động vận hành toàn bộ funnel từ thu hút lead đến nuôi dưỡng, chốt sale, chăm sóc, tái mua và affiliate/referral; tự học liên tục từ dữ liệu thực tế; dự đoán nhu cầu khách hàng trước khi họ chủ động hỏi; và kết nối omnichannel qua website, social, app, POS, CRM và call center. Kết quả cuối cùng là doanh nghiệp có thể “nhân bản chuyên gia bán hàng tốt nhất” thành AI hoạt động `24/7`.

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

## Domain-Specific Requirements

### Compliance & Regulatory

Hệ thống phải được định vị rõ là công cụ `wellness commerce` có kiểm soát, không phải công cụ chẩn đoán hay tư vấn y khoa. Mọi phản hồi của chatbot phải nằm trong phạm vi tư vấn sản phẩm, thành phần, cách dùng, chính sách và gợi ý phù hợp theo knowledge base đã được duyệt.

Hệ thống phải có cơ chế `consent` rõ ràng khi thu thập hoặc sử dụng dữ liệu liên quan đến mục tiêu sức khỏe, thói quen sống hoặc các tín hiệu cá nhân có thể ảnh hưởng đến tư vấn. Nội dung phản hồi phải tuân thủ nguyên tắc `claims control`: chatbot chỉ được sử dụng các claims đã được chuẩn hóa và phê duyệt trong knowledge base, không được tự suy diễn hoặc mở rộng sang ngôn ngữ mang tính điều trị, chẩn đoán hoặc thay thế chuyên gia y tế.

Ngoài ra, hệ thống cần lưu vết thay đổi của knowledge base và nội dung tư vấn để phục vụ review, audit nội bộ và kiểm soát chất lượng.

### Technical Constraints

Chatbot phải trả lời theo mô hình grounded trên knowledge base, với ưu tiên cao cho độ chính xác và tính nhất quán giữa các kênh. Hệ thống không được “bịa” câu trả lời khi thiếu dữ liệu hoặc khi truy xuất không đủ độ tin cậy. Trong các tình huống vượt ngoài phạm vi tri thức hoặc vượt guardrails, hệ thống phải chủ động dừng tư vấn và kích hoạt handoff.

Hệ thống phải có các cơ chế kỹ thuật để bảo vệ dữ liệu khách hàng, bao gồm phân quyền truy cập, log hành động quan trọng, kiểm soát nguồn dữ liệu và khả năng theo dõi thay đổi nội dung. Vì sản phẩm hoạt động trong môi trường đa kênh, chatbot cũng phải giữ được sự nhất quán về thông tin và hành vi giữa `Zalo` và `Facebook`, tránh tình trạng cùng một câu hỏi nhưng cho hai câu trả lời khác nhau.

### Integration Requirements

Trong giai đoạn đầu, hệ thống phải tích hợp vận hành tối thiểu trên `Zalo` và `Facebook`. Hai kênh này không chỉ là điểm vào của khách hàng mà còn là nơi cần giữ trải nghiệm tư vấn đồng nhất, lịch sử hội thoại liên tục và khả năng theo dõi hành vi khách hàng xuyên suốt.

Nguồn sự thật cho dữ liệu sản phẩm và knowledge base phải được xác định rõ. Các luồng tích hợp ban đầu cần hỗ trợ ít nhất các lớp dữ liệu sau: nội dung sản phẩm, FAQ, lịch sử hội thoại, tóm tắt handoff và thông tin ngữ cảnh cần thiết cho CSKH. Khi mở rộng sang CRM, đơn hàng, tồn kho hoặc membership, mọi tích hợp phải có cơ chế xác nhận mapping, kiểm tra chất lượng dữ liệu sau đồng bộ và rollback nếu việc tích hợp làm giảm độ tin cậy của tư vấn.

### Risk Mitigations

Rủi ro lớn nhất là chatbot trả lời vượt phạm vi và làm người dùng hiểu nhầm đây là công cụ tư vấn y khoa. Để giảm rủi ro này, hệ thống phải có guardrails cho các câu hỏi về bệnh lý, tình trạng sức khỏe đặc biệt, yêu cầu chẩn đoán hoặc các chủ đề vượt ngoài knowledge base. Trong các trường hợp đó, chatbot phải thừa nhận giới hạn, trấn an người dùng và chuyển tiếp cho người thật đúng lúc.

Rủi ro thứ hai là sai lệch dữ liệu hoặc tích hợp lỗi làm chatbot tư vấn sai. Vì vậy, mọi cập nhật knowledge base và tích hợp mới phải có cơ chế review, đo tác động trước/sau và khả năng rollback. Rủi ro thứ ba là trải nghiệm handoff bị đứt mạch; để giảm điều này, hệ thống phải chuyển đầy đủ lịch sử hội thoại, intent, sentiment và customer context cho CSKH để tránh việc khách hàng phải lặp lại thông tin.

## Web App Specific Requirements

### Project-Type Overview

Sản phẩm được triển khai theo mô hình `web_app` với trọng tâm vận hành là một chatbot tư vấn tích hợp trên `Zalo`, trong khi web giữ vai trò phụ trợ cho quản trị, giám sát và các điểm chạm hỗ trợ khác. Đây không phải một consumer web experience độc lập lấy website làm trung tâm, mà là một hệ thống tư vấn có lớp quản trị web đứng sau để điều phối dữ liệu, theo dõi hội thoại và hỗ trợ handoff.

### Technical Architecture Considerations

Kiến trúc cần tách rõ hai lớp. Lớp thứ nhất là lớp hội thoại đa kênh, trong đó `Zalo` là kênh ưu tiên số một và cần được tối ưu trước về tốc độ phản hồi, tính ổn định và chất lượng handoff. Lớp thứ hai là lớp quản trị web dành cho đội vận hành, CSKH hoặc product owner để cập nhật knowledge base, theo dõi lịch sử hội thoại, xem KPI và xử lý các trường hợp chatbot không đủ độ tin cậy để tiếp tục.

Yêu cầu realtime ở giai đoạn đầu chỉ cần tập trung vào `chat message flow` và `handoff flow`. Hệ thống chưa cần hỗ trợ realtime phức tạp cho trạng thái đơn hàng, tồn kho hoặc queue orchestration đa lớp. Điều này cho phép PRD giữ phạm vi kỹ thuật hợp lý trong MVP, tập trung vào tốc độ phản hồi, đồng bộ hội thoại và continuity giữa AI với người thật.

### Browser Matrix

Vì `Zalo` là kênh chính, web không cần tối ưu cho phạm vi browser quá rộng trong giai đoạn đầu. Web chỉ cần hỗ trợ tốt trên các trình duyệt hiện đại phổ biến, đặc biệt trong bối cảnh mobile browser là chính. Trọng tâm là đảm bảo đội vận hành và CSKH có thể truy cập ổn định từ thiết bị phổ biến mà không đặt gánh nặng compatibility không cần thiết lên MVP.

### Responsive Design

Giao diện web quản trị và các màn hỗ trợ phải theo hướng `mobile-first`, ưu tiên hiển thị rõ ràng, thao tác ngắn gọn, thông tin quan trọng nổi bật và usable trên màn hình nhỏ. Điều này đặc biệt quan trọng nếu đội vận hành hoặc CSKH xử lý nhanh các ca handoff ngay trên điện thoại hoặc thiết bị di động.

### Performance Targets

Hệ thống phải ưu tiên thời gian phản hồi nhanh ở luồng hội thoại, với mục tiêu phản hồi đầu tiên dưới `3 giây` và không vượt quá `5 giây` trong điều kiện bình thường. Đồng thời, luồng handoff phải đủ nhanh để CSKH nhận được toàn bộ context gần như tức thời, tránh cảm giác đứt mạch giữa AI và người thật.

### SEO Strategy

SEO không phải ưu tiên ở giai đoạn đầu. Hệ thống không cần thiết kế chatbot hoặc web quản trị theo mục tiêu index/search visibility. Nếu có website hỗ trợ, SEO chỉ nên được xem là một concern phụ cho content hoặc landing page, không phải driver của kiến trúc MVP.

### Accessibility Level

Ở giai đoạn đầu, yêu cầu accessibility nên tập trung vào mức thực dụng: `mobile-first`, nội dung dễ đọc, thao tác đơn giản, bố cục rõ ràng và giảm ma sát khi sử dụng trên thiết bị di động. Chưa cần đặt mục tiêu compliance formal như WCAG ở mức đầy đủ trong MVP, miễn là trải nghiệm cơ bản rõ ràng và dễ dùng cho nhóm người dùng chính.

### Implementation Considerations

Việc triển khai phải ưu tiên `Zalo-first` trong thứ tự delivery, với web admin là lớp hỗ trợ để vận hành knowledge base, theo dõi hội thoại và xử lý handoff. Điều này có nghĩa là yêu cầu kỹ thuật không nên bị kéo sang các phần web consumer không tạo giá trị ngay trong MVP. Mọi quyết định kiến trúc nên phục vụ ba mục tiêu trước: chatbot trả lời đúng theo knowledge base, handoff liền mạch khi cần người thật, và đội vận hành có đủ công cụ để cải thiện hệ thống liên tục.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** `Experience MVP`

Mục tiêu của giai đoạn đầu không phải là xây đầy đủ hệ sinh thái AI sales, mà là chứng minh rằng chatbot có thể mang lại trải nghiệm tư vấn đủ mượt, nhanh, đúng và đáng tin để người dùng cảm thấy được hỗ trợ như đang nói chuyện với một tư vấn viên thật. Giá trị cần được chứng minh trước là chất lượng trải nghiệm tư vấn, không phải độ rộng tính năng.

**Resource Requirements:**  
MVP được giả định triển khai với đội tối thiểu gồm `1 PM/Product owner`, `1 backend/AI engineer`, và `1 CSKH`. Với cấu hình nguồn lực này, các thành phần quản trị, analytics và workflow nội bộ phải được giữ ở mức tối giản, đủ dùng để vận hành và học từ dữ liệu, thay vì theo hướng xây một backoffice đầy đủ chức năng ngay từ đầu.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Khách hàng chính hỏi đáp và nhận tư vấn sản phẩm phù hợp trên `Zalo`
- Khách hàng edge case được chatbot dừng đúng lúc và handoff an toàn sang người thật
- CSKH nhận handoff với đủ context để xử lý tiếp không đứt mạch
- Team vận hành có thể cập nhật knowledge base và rà soát các lỗi quan trọng trong chatbot

**Must-Have Capabilities:**
- Knowledge base chuẩn hóa cho sản phẩm, FAQ, chính sách và thông tin tư vấn cốt lõi
- Chatbot grounded theo knowledge base, trả lời nhanh và nhất quán
- Tư vấn theo ngữ cảnh cơ bản để gợi ý sản phẩm hoặc combo phù hợp
- Tích hợp vận hành trên `Zalo` là kênh chính
- Handoff sang người thật với lịch sử hội thoại, tóm tắt nhu cầu, intent và trạng thái cảm xúc cơ bản
- Guardrails cho các câu hỏi vượt phạm vi, đặc biệt các câu hỏi sức khỏe hoặc yêu cầu chẩn đoán
- Giao diện quản trị tối giản để cập nhật dữ liệu và xem lịch sử hội thoại quan trọng
- Theo dõi các chỉ số vận hành cốt lõi như phản hồi, accuracy sơ bộ, handoff rate và mức hài lòng

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Mở rộng đa kênh ngoài `Zalo`, bao gồm `Facebook`
- Cá nhân hóa sâu hơn theo hành vi và lịch sử khách hàng
- Upsell/cross-sell thông minh
- Tích hợp CRM, đơn hàng, tồn kho và membership
- Dashboard vận hành đầy đủ hơn với đo tác động trước/sau và review queue tốt hơn
- Học từ hội thoại để cải thiện phản hồi
- Marketing automation cơ bản như nhắc mua lại và chăm sóc sau bán

**Phase 3 (Expansion):**
- Agent workflows chuyên biệt như sale agent, CSKH agent, chăm sóc khách cũ, thu lead tự động
- AI đa nhân cách và đa phương thức theo phạm vi text
- Omnichannel đầy đủ giữa website, social, app, POS, CRM và call center
- AI dự đoán nhu cầu khách hàng
- AI Customer Operating System hoàn chỉnh theo vision 2-3 năm

### Risk Mitigation Strategy

**Technical Risks:**  
Rủi ro kỹ thuật lớn nhất là hệ thống trả lời sai, vượt phạm vi hoặc handoff không liền mạch. Cách giảm rủi ro là giữ phạm vi MVP hẹp: một knowledge base chuẩn hóa, một kênh chính là `Zalo`, một lớp handoff rõ ràng, và guardrails nghiêm cho các case nhạy cảm.

**Market Risks:**  
Rủi ro thị trường là người dùng không cảm thấy chatbot đủ hữu ích để thay thế phần tư vấn ban đầu. MVP giải quyết rủi ro này bằng cách tập trung vào trải nghiệm tư vấn có ngữ cảnh, trả lời nhanh, giải thích rõ vì sao gợi ý phù hợp, và giữ cảm giác hỗ trợ tự nhiên thay vì chỉ FAQ automation.

**Resource Risks:**  
Rủi ro lớn nhất theo đánh giá hiện tại là đội quá nhỏ so với ambition của sản phẩm. Cách giảm rủi ro là giữ MVP ở mức `Zalo-first`, admin tối giản, analytics tối thiểu, và chưa đưa các capability như voice AI, CRM sâu hoặc omnichannel đầy đủ vào Phase 1. Với đội hiện tại, mục tiêu đúng không phải “xây nền tảng hoàn chỉnh”, mà là chứng minh trải nghiệm tư vấn AI có thể tạo giá trị thật trong phạm vi hẹp.

## Functional Requirements

### Tư vấn sản phẩm và hội thoại khách hàng

- FR1: Khách hàng có thể bắt đầu cuộc trò chuyện với chatbot trên `Zalo`.
- FR2: Khách hàng có thể đặt câu hỏi về sản phẩm, thành phần, công dụng, chính sách và cách sử dụng.
- FR3: Chatbot có thể trả lời dựa trên knowledge base đã được phê duyệt.
- FR4: Chatbot có thể hỏi ngược lại khách hàng để làm rõ nhu cầu trước khi tư vấn.
- FR5: Chatbot có thể thu thập ngữ cảnh cơ bản như mục tiêu sử dụng, mối quan tâm và loại sản phẩm khách đang tìm.
- FR6: Chatbot có thể gợi ý sản phẩm hoặc combo phù hợp dựa trên ngữ cảnh đã thu thập.
- FR7: Chatbot có thể giải thích vì sao một sản phẩm hoặc combo được đề xuất.
- FR8: Khách hàng có thể tiếp tục hỏi thêm để làm rõ đề xuất trước khi quyết định mua.
- FR9: Chatbot có thể cung cấp thông tin hỗ trợ quyết định mua như review, thành phần và chính sách liên quan.
- FR10: Hệ thống có thể lưu lại lịch sử hội thoại để duy trì continuity trong cùng một phiên tư vấn.

### Guardrails và an toàn tư vấn

- FR11: Chatbot có thể nhận diện câu hỏi vượt ngoài phạm vi knowledge base hoặc vượt phạm vi tư vấn an toàn.
- FR12: Chatbot có thể từ chối trả lời các câu hỏi mang tính chẩn đoán hoặc thay thế tư vấn y khoa.
- FR13: Chatbot có thể thừa nhận giới hạn khi không đủ độ tin cậy để trả lời.
- FR14: Chatbot có thể đưa ra thông điệp fallback an toàn thay vì suy diễn câu trả lời.
- FR15: Chatbot có thể trấn an khách hàng và hướng dẫn bước tiếp theo phù hợp khi không thể tiếp tục tư vấn.
- FR16: Hệ thống có thể áp dụng các guardrails riêng cho câu hỏi liên quan đến bệnh lý, sức khỏe đặc biệt hoặc case nhạy cảm.

### Handoff và phối hợp với người thật

- FR17: Chatbot có thể chuyển cuộc trò chuyện sang người thật khi gặp case vượt phạm vi hoặc cần xử lý đặc biệt.
- FR18: Hệ thống có thể tạo bản tóm tắt cuộc trò chuyện trước khi handoff.
- FR19: Hệ thống có thể chuyển cho CSKH toàn bộ lịch sử hội thoại liên quan.
- FR20: Hệ thống có thể chuyển kèm nhu cầu khách hàng, sản phẩm đang quan tâm và các điểm chatbot chưa xử lý được.
- FR21: Hệ thống có thể gắn intent dự đoán cho cuộc trò chuyện trước khi handoff.
- FR22: Hệ thống có thể gắn trạng thái cảm xúc cơ bản của khách hàng để hỗ trợ ưu tiên xử lý.
- FR23: CSKH có thể tiếp nhận handoff mà không cần yêu cầu khách hàng lặp lại thông tin từ đầu.
- FR24: Hệ thống có thể hỗ trợ CSKH xác định mức độ ưu tiên của từng case handoff.
- FR25: Hệ thống có thể hỗ trợ CSKH bằng gợi ý bước xử lý tiếp theo phù hợp với bối cảnh cuộc trò chuyện.

### Quản lý knowledge base và dữ liệu tư vấn

- FR26: Team vận hành có thể tạo mới, cập nhật và ngừng sử dụng các nội dung trong knowledge base.
- FR27: Team vận hành có thể quản lý thông tin sản phẩm, FAQ, chính sách và claims được phép sử dụng.
- FR28: Team vận hành có thể kiểm soát nội dung nào được chatbot dùng để tư vấn.
- FR29: Hệ thống có thể lưu vết các thay đổi đối với knowledge base.
- FR30: Team vận hành có thể rà soát các câu trả lời sai hoặc thiếu của chatbot để cải thiện tri thức.
- FR31: Team vận hành có thể bổ sung các FAQ và tình huống mới phát sinh từ hội thoại thực tế.
- FR32: Hệ thống có thể phân biệt giữa tri thức đã được phê duyệt và nội dung chưa sẵn sàng để dùng cho tư vấn.

### Vận hành, giám sát và cải thiện liên tục

- FR33: Team vận hành có thể xem lịch sử hội thoại và các case quan trọng cần chú ý.
- FR34: Team vận hành có thể gắn tag cho các cuộc trò chuyện để phục vụ phân tích và tối ưu.
- FR35: Team vận hành có thể theo dõi các chỉ số vận hành cốt lõi của chatbot.
- FR36: Team vận hành có thể xác định các nhóm hội thoại lỗi hoặc có rủi ro cao.
- FR37: Team vận hành có thể so sánh tác động trước và sau khi cập nhật knowledge base.
- FR38: Team vận hành có thể ưu tiên các vấn đề cần sửa dựa trên ảnh hưởng đến accuracy, handoff, conversion hoặc risk.
- FR39: Hệ thống có thể hỗ trợ vòng lặp cải tiến liên tục từ feedback khách hàng và hội thoại thực tế.

### Tích hợp kênh và đồng bộ dữ liệu

- FR40: Hệ thống có thể vận hành chatbot trên `Zalo` như kênh chính trong MVP.
- FR41: Hệ thống có thể mở rộng sang `Facebook` ở giai đoạn sau mà vẫn giữ logic tư vấn nhất quán.
- FR42: Hệ thống có thể duy trì source of truth rõ ràng cho dữ liệu sản phẩm và knowledge base.
- FR43: Hệ thống có thể đồng bộ dữ liệu cần thiết cho tư vấn giữa các thành phần liên quan.
- FR44: Hệ thống có thể kiểm tra tính hợp lệ của dữ liệu tích hợp trước khi đưa vào sử dụng cho chatbot.
- FR45: Hệ thống có thể rollback hoặc ngừng sử dụng dữ liệu tích hợp khi dữ liệu đó làm giảm độ tin cậy tư vấn.
- FR46: Hệ thống có thể theo dõi tác động của tích hợp mới lên chất lượng recommendation và độ tin cậy của chatbot.

### Quản lý khách hàng và ngữ cảnh cuộc trò chuyện

- FR47: Hệ thống có thể gắn thông tin khách hàng liên quan với cuộc trò chuyện khi dữ liệu đó có sẵn.
- FR48: Hệ thống có thể sử dụng lịch sử tương tác hoặc mua hàng sẵn có để hỗ trợ tư vấn ở các giai đoạn sau MVP.
- FR49: Hệ thống có thể phân biệt các loại cuộc trò chuyện như mua hàng, tư vấn sâu, khiếu nại hoặc khách VIP.
- FR50: Hệ thống có thể giữ continuity ngữ cảnh giữa chatbot, CSKH và các thành phần vận hành liên quan.

## Non-Functional Requirements

### Performance

Hệ thống phải hỗ trợ trải nghiệm tư vấn gần thời gian thực cho luồng chatbot và handoff. Phản hồi đầu tiên của chatbot phải được trả về trong dưới `3 giây` ở điều kiện vận hành bình thường, và không vượt quá `5 giây` đối với các tình huống truy xuất và tư vấn cơ bản trong MVP.

Luồng handoff phải đảm bảo CSKH nhận được ngữ cảnh cuộc trò chuyện gần như tức thời sau khi chatbot xác định cần chuyển người thật. Mục tiêu là tránh đứt mạch trải nghiệm và giảm tối đa việc khách hàng phải chờ hoặc lặp lại thông tin khi chuyển sang người xử lý thủ công.

### Security

Hệ thống phải bảo vệ dữ liệu khách hàng và tri thức nội bộ ở mức cơ bản nhưng rõ ràng ngay từ MVP. Tất cả dữ liệu nhạy cảm trong phạm vi sản phẩm phải được kiểm soát truy cập phù hợp, có phân quyền rõ giữa các vai trò vận hành, và có log cho các hành động quan trọng như cập nhật knowledge base, thay đổi nội dung tư vấn hoặc truy cập thông tin liên quan đến khách hàng.

Dữ liệu phải được bảo vệ trong quá trình truyền và lưu trữ theo nguyên tắc mã hóa phù hợp với phạm vi MVP. Hệ thống cũng phải hạn chế việc sử dụng dữ liệu khách hàng ngoài mục đích tư vấn và vận hành đã được xác định trong PRD.

### Scalability

Trong MVP, hệ thống phải hỗ trợ ổn định tối thiểu `50` cuộc trò chuyện đồng thời mà không làm suy giảm nghiêm trọng trải nghiệm tư vấn cơ bản. Khi tải tăng đến ngưỡng này, chatbot vẫn phải giữ được khả năng phản hồi, truy xuất tri thức và handoff trong phạm vi chấp nhận được cho người dùng.

Thiết kế hệ thống cần cho phép mở rộng dần về sau khi sản phẩm tăng số lượng hội thoại, mở thêm kênh như `Facebook`, hoặc tích hợp thêm dữ liệu và capability mới. Tuy nhiên, MVP chưa cần tối ưu cho quy mô rất lớn vượt xa mức sử dụng ban đầu.

### Accessibility

Yêu cầu accessibility trong MVP tập trung ở mức thực dụng: giao diện vận hành và các thành phần hỗ trợ web phải `mobile-first`, dễ đọc, dễ thao tác và phù hợp với màn hình nhỏ. Những thông tin quan trọng như trạng thái handoff, tóm tắt hội thoại, cảnh báo lỗi hoặc tín hiệu ưu tiên phải được hiển thị rõ ràng để giảm nhầm lẫn khi sử dụng trên thiết bị di động.

MVP chưa cần đặt mục tiêu tuân thủ đầy đủ một chuẩn accessibility chính thức, nhưng phải đảm bảo trải nghiệm cơ bản không gây cản trở cho nhóm người dùng chính trong bối cảnh sử dụng thực tế.

### Integration

Hệ thống phải tích hợp ổn định với `Zalo` như kênh vận hành chính trong MVP, và phải duy trì continuity của hội thoại, handoff và ngữ cảnh giữa lớp chatbot với lớp xử lý nội bộ. Khi tích hợp thêm kênh hoặc nguồn dữ liệu, hệ thống phải có cơ chế xác nhận dữ liệu đầu vào, kiểm tra tính nhất quán và ngừng sử dụng dữ liệu tích hợp nếu phát hiện ảnh hưởng tiêu cực đến chất lượng tư vấn.

Vì doanh nghiệp chấp nhận downtime ngắn nếu có fallback sang người thật, các tích hợp phải được thiết kế sao cho lỗi tích hợp không làm tê liệt toàn bộ trải nghiệm. Trong trường hợp lỗi kênh hoặc lỗi đồng bộ, hệ thống phải vẫn hỗ trợ phương án tiếp quản thủ công phù hợp để duy trì dịch vụ khách hàng.
