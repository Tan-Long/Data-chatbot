# Implementation Readiness Assessment Report

**Date:** 2026-05-10
**Project:** Data-Chatbot

## Document Inventory

### Included Documents

- PRD: `E:\Data-Chatbot\_bmad-output\planning-artifacts\prd.md`

### Missing Documents

- Architecture document
- UX design document
- Epics and stories document

### Assessment Scope

Current readiness assessment will proceed using the PRD as the primary planning artifact. Findings will explicitly call out missing downstream planning documents that prevent full implementation-readiness validation.

## PRD Analysis

### Functional Requirements

FR1: Khách hàng có thể bắt đầu cuộc trò chuyện với chatbot trên `Zalo`.
FR2: Khách hàng có thể đặt câu hỏi về sản phẩm, thành phần, công dụng, chính sách và cách sử dụng.
FR3: Chatbot có thể trả lời dựa trên knowledge base đã được phê duyệt.
FR4: Chatbot có thể hỏi ngược lại khách hàng để làm rõ nhu cầu trước khi tư vấn.
FR5: Chatbot có thể thu thập ngữ cảnh cơ bản như mục tiêu sử dụng, mối quan tâm và loại sản phẩm khách đang tìm.
FR6: Chatbot có thể gợi ý sản phẩm hoặc combo phù hợp dựa trên ngữ cảnh đã thu thập.
FR7: Chatbot có thể giải thích vì sao một sản phẩm hoặc combo được đề xuất.
FR8: Khách hàng có thể tiếp tục hỏi thêm để làm rõ đề xuất trước khi quyết định mua.
FR9: Chatbot có thể cung cấp thông tin hỗ trợ quyết định mua như review, thành phần và chính sách liên quan.
FR10: Hệ thống có thể lưu lại lịch sử hội thoại để duy trì continuity trong cùng một phiên tư vấn.
FR11: Chatbot có thể nhận diện câu hỏi vượt ngoài phạm vi knowledge base hoặc vượt phạm vi tư vấn an toàn.
FR12: Chatbot có thể từ chối trả lời các câu hỏi mang tính chẩn đoán hoặc thay thế tư vấn y khoa.
FR13: Chatbot có thể thừa nhận giới hạn khi không đủ độ tin cậy để trả lời.
FR14: Chatbot có thể đưa ra thông điệp fallback an toàn thay vì suy diễn câu trả lời.
FR15: Chatbot có thể trấn an khách hàng và hướng dẫn bước tiếp theo phù hợp khi không thể tiếp tục tư vấn.
FR16: Hệ thống có thể áp dụng các guardrails riêng cho câu hỏi liên quan đến bệnh lý, sức khỏe đặc biệt hoặc case nhạy cảm.
FR17: Chatbot có thể chuyển cuộc trò chuyện sang người thật khi gặp case vượt phạm vi hoặc cần xử lý đặc biệt.
FR18: Hệ thống có thể tạo bản tóm tắt cuộc trò chuyện trước khi handoff.
FR19: Hệ thống có thể chuyển cho CSKH toàn bộ lịch sử hội thoại liên quan.
FR20: Hệ thống có thể chuyển kèm nhu cầu khách hàng, sản phẩm đang quan tâm và các điểm chatbot chưa xử lý được.
FR21: Hệ thống có thể gắn intent dự đoán cho cuộc trò chuyện trước khi handoff.
FR22: Hệ thống có thể gắn trạng thái cảm xúc cơ bản của khách hàng để hỗ trợ ưu tiên xử lý.
FR23: CSKH có thể tiếp nhận handoff mà không cần yêu cầu khách hàng lặp lại thông tin từ đầu.
FR24: Hệ thống có thể hỗ trợ CSKH xác định mức độ ưu tiên của từng case handoff.
FR25: Hệ thống có thể hỗ trợ CSKH bằng gợi ý bước xử lý tiếp theo phù hợp với bối cảnh cuộc trò chuyện.
FR26: Team vận hành có thể tạo mới, cập nhật và ngừng sử dụng các nội dung trong knowledge base.
FR27: Team vận hành có thể quản lý thông tin sản phẩm, FAQ, chính sách và claims được phép sử dụng.
FR28: Team vận hành có thể kiểm soát nội dung nào được chatbot dùng để tư vấn.
FR29: Hệ thống có thể lưu vết các thay đổi đối với knowledge base.
FR30: Team vận hành có thể rà soát các câu trả lời sai hoặc thiếu của chatbot để cải thiện tri thức.
FR31: Team vận hành có thể bổ sung các FAQ và tình huống mới phát sinh từ hội thoại thực tế.
FR32: Hệ thống có thể phân biệt giữa tri thức đã được phê duyệt và nội dung chưa sẵn sàng để dùng cho tư vấn.
FR33: Team vận hành có thể xem lịch sử hội thoại và các case quan trọng cần chú ý.
FR34: Team vận hành có thể gắn tag cho các cuộc trò chuyện để phục vụ phân tích và tối ưu.
FR35: Team vận hành có thể theo dõi các chỉ số vận hành cốt lõi của chatbot.
FR36: Team vận hành có thể xác định các nhóm hội thoại lỗi hoặc có rủi ro cao.
FR37: Team vận hành có thể so sánh tác động trước và sau khi cập nhật knowledge base.
FR38: Team vận hành có thể ưu tiên các vấn đề cần sửa dựa trên ảnh hưởng đến accuracy, handoff, conversion hoặc risk.
FR39: Hệ thống có thể hỗ trợ vòng lặp cải tiến liên tục từ feedback khách hàng và hội thoại thực tế.
FR40: Hệ thống có thể vận hành chatbot trên `Zalo` như kênh chính trong MVP.
FR41: Hệ thống có thể mở rộng sang `Facebook` ở giai đoạn sau mà vẫn giữ logic tư vấn nhất quán.
FR42: Hệ thống có thể duy trì source of truth rõ ràng cho dữ liệu sản phẩm và knowledge base.
FR43: Hệ thống có thể đồng bộ dữ liệu cần thiết cho tư vấn giữa các thành phần liên quan.
FR44: Hệ thống có thể kiểm tra tính hợp lệ của dữ liệu tích hợp trước khi đưa vào sử dụng cho chatbot.
FR45: Hệ thống có thể rollback hoặc ngừng sử dụng dữ liệu tích hợp khi dữ liệu đó làm giảm độ tin cậy tư vấn.
FR46: Hệ thống có thể theo dõi tác động của tích hợp mới lên chất lượng recommendation và độ tin cậy của chatbot.
FR47: Hệ thống có thể gắn thông tin khách hàng liên quan với cuộc trò chuyện khi dữ liệu đó có sẵn.
FR48: Hệ thống có thể sử dụng lịch sử tương tác hoặc mua hàng sẵn có để hỗ trợ tư vấn ở các giai đoạn sau MVP.
FR49: Hệ thống có thể phân biệt các loại cuộc trò chuyện như mua hàng, tư vấn sâu, khiếu nại hoặc khách VIP.
FR50: Hệ thống có thể giữ continuity ngữ cảnh giữa chatbot, CSKH và các thành phần vận hành liên quan.

Total FRs: 50

### Non-Functional Requirements

NFR1: Hệ thống phải trả về phản hồi đầu tiên của chatbot trong dưới `3 giây` ở điều kiện vận hành bình thường.
NFR2: Hệ thống không được vượt quá `5 giây` cho các tình huống truy xuất và tư vấn cơ bản trong MVP.
NFR3: Luồng handoff phải chuyển ngữ cảnh gần như tức thời cho CSKH.
NFR4: Hệ thống phải kiểm soát truy cập dữ liệu khách hàng và tri thức nội bộ theo phân quyền vai trò.
NFR5: Hệ thống phải lưu log cho các hành động quan trọng liên quan đến knowledge base và dữ liệu khách hàng.
NFR6: Dữ liệu phải được bảo vệ khi truyền và khi lưu trữ bằng cơ chế mã hóa phù hợp với phạm vi MVP.
NFR7: MVP phải hỗ trợ ổn định tối thiểu `50` cuộc trò chuyện đồng thời.
NFR8: Hệ thống phải cho phép mở rộng dần khi tăng hội thoại, kênh và dữ liệu tích hợp.
NFR9: Giao diện vận hành web phải `mobile-first`, dễ đọc và dễ thao tác trên màn hình nhỏ.
NFR10: Tích hợp `Zalo` phải vận hành ổn định và giữ continuity cho hội thoại, handoff và ngữ cảnh.
NFR11: Các tích hợp mới phải có cơ chế xác nhận dữ liệu đầu vào và kiểm tra tính nhất quán.
NFR12: Lỗi tích hợp không được làm tê liệt toàn bộ trải nghiệm; phải có fallback sang người thật khi cần.

Total NFRs: 12

### Additional Requirements

- Domain posture: `healthcare-adjacent, non-diagnostic, governed recommendations`
- Compliance requirements: consent, claims control, audit nội bộ cho knowledge base và nội dung tư vấn
- Project type constraints: `Zalo-first`, web admin hỗ trợ vận hành, mobile-first, SEO không phải ưu tiên
- Scope constraints: phased delivery với `Experience MVP`, chưa đưa `voice AI` vào roadmap hiện tại
- Resource constraints: đội MVP tối thiểu gồm `1 PM/Product owner`, `1 backend/AI engineer`, `1 CSKH`

### PRD Completeness Assessment

PRD hiện đầy đủ về mặt cấu trúc nền tảng cho một assessment ở mức planning-first: có Executive Summary, Success Criteria, Product Scope, User Journeys, Domain-Specific Requirements, Project-Type Requirements, Functional Requirements và Non-Functional Requirements. FR coverage dày và traceable từ journeys, scope và guardrails. Tuy nhiên, readiness tổng thể cho implementation vẫn chưa thể xác nhận đầy đủ vì thiếu ba artifact downstream quan trọng: Architecture, UX design, và Epics/Stories. Điều này có nghĩa bước tiếp theo phải tập trung vào khả năng chuyển hóa 50 FR và 12 NFR thành coverage logic ở cấp epic, đồng thời đánh dấu rõ các khoảng trống do thiếu tài liệu kiến trúc và UX.

## Epic Coverage Validation

### Epic FR Coverage Extracted

Không tìm thấy tài liệu Epics & Stories trong inventory của dự án.

Total FRs in epics: 0

### Coverage Matrix

| FR Number | PRD Requirement | Epic Coverage | Status |
| --------- | --------------- | ------------- | ------ |
| FR1 | Khách hàng có thể bắt đầu cuộc trò chuyện với chatbot trên `Zalo`. | **NOT FOUND** | ❌ MISSING |
| FR2 | Khách hàng có thể đặt câu hỏi về sản phẩm, thành phần, công dụng, chính sách và cách sử dụng. | **NOT FOUND** | ❌ MISSING |
| FR3 | Chatbot có thể trả lời dựa trên knowledge base đã được phê duyệt. | **NOT FOUND** | ❌ MISSING |
| FR4 | Chatbot có thể hỏi ngược lại khách hàng để làm rõ nhu cầu trước khi tư vấn. | **NOT FOUND** | ❌ MISSING |
| FR5 | Chatbot có thể thu thập ngữ cảnh cơ bản như mục tiêu sử dụng, mối quan tâm và loại sản phẩm khách đang tìm. | **NOT FOUND** | ❌ MISSING |
| FR6 | Chatbot có thể gợi ý sản phẩm hoặc combo phù hợp dựa trên ngữ cảnh đã thu thập. | **NOT FOUND** | ❌ MISSING |
| FR7 | Chatbot có thể giải thích vì sao một sản phẩm hoặc combo được đề xuất. | **NOT FOUND** | ❌ MISSING |
| FR8 | Khách hàng có thể tiếp tục hỏi thêm để làm rõ đề xuất trước khi quyết định mua. | **NOT FOUND** | ❌ MISSING |
| FR9 | Chatbot có thể cung cấp thông tin hỗ trợ quyết định mua như review, thành phần và chính sách liên quan. | **NOT FOUND** | ❌ MISSING |
| FR10 | Hệ thống có thể lưu lại lịch sử hội thoại để duy trì continuity trong cùng một phiên tư vấn. | **NOT FOUND** | ❌ MISSING |
| FR11 | Chatbot có thể nhận diện câu hỏi vượt ngoài phạm vi knowledge base hoặc vượt phạm vi tư vấn an toàn. | **NOT FOUND** | ❌ MISSING |
| FR12 | Chatbot có thể từ chối trả lời các câu hỏi mang tính chẩn đoán hoặc thay thế tư vấn y khoa. | **NOT FOUND** | ❌ MISSING |
| FR13 | Chatbot có thể thừa nhận giới hạn khi không đủ độ tin cậy để trả lời. | **NOT FOUND** | ❌ MISSING |
| FR14 | Chatbot có thể đưa ra thông điệp fallback an toàn thay vì suy diễn câu trả lời. | **NOT FOUND** | ❌ MISSING |
| FR15 | Chatbot có thể trấn an khách hàng và hướng dẫn bước tiếp theo phù hợp khi không thể tiếp tục tư vấn. | **NOT FOUND** | ❌ MISSING |
| FR16 | Hệ thống có thể áp dụng các guardrails riêng cho câu hỏi liên quan đến bệnh lý, sức khỏe đặc biệt hoặc case nhạy cảm. | **NOT FOUND** | ❌ MISSING |
| FR17 | Chatbot có thể chuyển cuộc trò chuyện sang người thật khi gặp case vượt phạm vi hoặc cần xử lý đặc biệt. | **NOT FOUND** | ❌ MISSING |
| FR18 | Hệ thống có thể tạo bản tóm tắt cuộc trò chuyện trước khi handoff. | **NOT FOUND** | ❌ MISSING |
| FR19 | Hệ thống có thể chuyển cho CSKH toàn bộ lịch sử hội thoại liên quan. | **NOT FOUND** | ❌ MISSING |
| FR20 | Hệ thống có thể chuyển kèm nhu cầu khách hàng, sản phẩm đang quan tâm và các điểm chatbot chưa xử lý được. | **NOT FOUND** | ❌ MISSING |
| FR21 | Hệ thống có thể gắn intent dự đoán cho cuộc trò chuyện trước khi handoff. | **NOT FOUND** | ❌ MISSING |
| FR22 | Hệ thống có thể gắn trạng thái cảm xúc cơ bản của khách hàng để hỗ trợ ưu tiên xử lý. | **NOT FOUND** | ❌ MISSING |
| FR23 | CSKH có thể tiếp nhận handoff mà không cần yêu cầu khách hàng lặp lại thông tin từ đầu. | **NOT FOUND** | ❌ MISSING |
| FR24 | Hệ thống có thể hỗ trợ CSKH xác định mức độ ưu tiên của từng case handoff. | **NOT FOUND** | ❌ MISSING |
| FR25 | Hệ thống có thể hỗ trợ CSKH bằng gợi ý bước xử lý tiếp theo phù hợp với bối cảnh cuộc trò chuyện. | **NOT FOUND** | ❌ MISSING |
| FR26 | Team vận hành có thể tạo mới, cập nhật và ngừng sử dụng các nội dung trong knowledge base. | **NOT FOUND** | ❌ MISSING |
| FR27 | Team vận hành có thể quản lý thông tin sản phẩm, FAQ, chính sách và claims được phép sử dụng. | **NOT FOUND** | ❌ MISSING |
| FR28 | Team vận hành có thể kiểm soát nội dung nào được chatbot dùng để tư vấn. | **NOT FOUND** | ❌ MISSING |
| FR29 | Hệ thống có thể lưu vết các thay đổi đối với knowledge base. | **NOT FOUND** | ❌ MISSING |
| FR30 | Team vận hành có thể rà soát các câu trả lời sai hoặc thiếu của chatbot để cải thiện tri thức. | **NOT FOUND** | ❌ MISSING |
| FR31 | Team vận hành có thể bổ sung các FAQ và tình huống mới phát sinh từ hội thoại thực tế. | **NOT FOUND** | ❌ MISSING |
| FR32 | Hệ thống có thể phân biệt giữa tri thức đã được phê duyệt và nội dung chưa sẵn sàng để dùng cho tư vấn. | **NOT FOUND** | ❌ MISSING |
| FR33 | Team vận hành có thể xem lịch sử hội thoại và các case quan trọng cần chú ý. | **NOT FOUND** | ❌ MISSING |
| FR34 | Team vận hành có thể gắn tag cho các cuộc trò chuyện để phục vụ phân tích và tối ưu. | **NOT FOUND** | ❌ MISSING |
| FR35 | Team vận hành có thể theo dõi các chỉ số vận hành cốt lõi của chatbot. | **NOT FOUND** | ❌ MISSING |
| FR36 | Team vận hành có thể xác định các nhóm hội thoại lỗi hoặc có rủi ro cao. | **NOT FOUND** | ❌ MISSING |
| FR37 | Team vận hành có thể so sánh tác động trước và sau khi cập nhật knowledge base. | **NOT FOUND** | ❌ MISSING |
| FR38 | Team vận hành có thể ưu tiên các vấn đề cần sửa dựa trên ảnh hưởng đến accuracy, handoff, conversion hoặc risk. | **NOT FOUND** | ❌ MISSING |
| FR39 | Hệ thống có thể hỗ trợ vòng lặp cải tiến liên tục từ feedback khách hàng và hội thoại thực tế. | **NOT FOUND** | ❌ MISSING |
| FR40 | Hệ thống có thể vận hành chatbot trên `Zalo` như kênh chính trong MVP. | **NOT FOUND** | ❌ MISSING |
| FR41 | Hệ thống có thể mở rộng sang `Facebook` ở giai đoạn sau mà vẫn giữ logic tư vấn nhất quán. | **NOT FOUND** | ❌ MISSING |
| FR42 | Hệ thống có thể duy trì source of truth rõ ràng cho dữ liệu sản phẩm và knowledge base. | **NOT FOUND** | ❌ MISSING |
| FR43 | Hệ thống có thể đồng bộ dữ liệu cần thiết cho tư vấn giữa các thành phần liên quan. | **NOT FOUND** | ❌ MISSING |
| FR44 | Hệ thống có thể kiểm tra tính hợp lệ của dữ liệu tích hợp trước khi đưa vào sử dụng cho chatbot. | **NOT FOUND** | ❌ MISSING |
| FR45 | Hệ thống có thể rollback hoặc ngừng sử dụng dữ liệu tích hợp khi dữ liệu đó làm giảm độ tin cậy tư vấn. | **NOT FOUND** | ❌ MISSING |
| FR46 | Hệ thống có thể theo dõi tác động của tích hợp mới lên chất lượng recommendation và độ tin cậy của chatbot. | **NOT FOUND** | ❌ MISSING |
| FR47 | Hệ thống có thể gắn thông tin khách hàng liên quan với cuộc trò chuyện khi dữ liệu đó có sẵn. | **NOT FOUND** | ❌ MISSING |
| FR48 | Hệ thống có thể sử dụng lịch sử tương tác hoặc mua hàng sẵn có để hỗ trợ tư vấn ở các giai đoạn sau MVP. | **NOT FOUND** | ❌ MISSING |
| FR49 | Hệ thống có thể phân biệt các loại cuộc trò chuyện như mua hàng, tư vấn sâu, khiếu nại hoặc khách VIP. | **NOT FOUND** | ❌ MISSING |
| FR50 | Hệ thống có thể giữ continuity ngữ cảnh giữa chatbot, CSKH và các thành phần vận hành liên quan. | **NOT FOUND** | ❌ MISSING |

### Missing Requirements

#### Critical Missing FRs

Toàn bộ `FR1–FR50` hiện chưa có đường traceability sang bất kỳ Epic hoặc Story nào vì chưa tồn tại tài liệu Epics & Stories trong workspace. Điều này là blocker trực tiếp cho implementation readiness.

- Impact: Không có capability nào trong PRD hiện có implementation path ở cấp planning execution.
- Recommendation: Tạo tài liệu Epics & Stories với coverage map cho toàn bộ FR trước khi đánh giá readiness cho implementation.

### Coverage Statistics

- Total PRD FRs: 50
- FRs covered in epics: 0
- Coverage percentage: 0%

## UX Alignment Assessment

### UX Document Status

Not Found

### Alignment Issues

- Không thể xác thực alignment giữa UX, PRD và Architecture vì thiếu cả tài liệu UX lẫn Architecture.
- PRD đã mô tả rõ các user journeys cho khách hàng, CSKH, admin vận hành và người tích hợp hệ thống, nhưng chưa có artifact UX nào chuyển các journeys này thành interaction flows, screen states, handoff transitions hoặc admin workflows.
- Các capability nhạy cảm về trải nghiệm như `context capture`, `explainability of recommendation`, `safe fallback messaging`, `handoff continuity`, `queue triage` và `next best action` hiện chưa có đặc tả UX để đảm bảo chúng được thể hiện đúng trong trải nghiệm thực tế.

### Warnings

- UX là implied requirement rõ ràng vì đây là sản phẩm user-facing trên `Zalo` và có web admin `mobile-first` cho vận hành nội bộ.
- Thiếu tài liệu UX không chặn việc tiếp tục planning, nhưng làm tăng rủi ro triển khai sai hành vi hội thoại, handoff và trải nghiệm vận hành.
- Khuyến nghị tạo ít nhất một tài liệu UX hoặc interaction spec cho các luồng sau trước khi triển khai: tư vấn happy path, edge-case fallback, handoff sang người thật, admin knowledge-base update, CSKH queue triage.

## Epic Quality Review

### Review Status

Not Executable

### Critical Violations

- Không có tài liệu Epics & Stories để review.
- Không thể xác thực rằng epics deliver user value thay vì technical milestones.
- Không thể kiểm tra tính độc lập giữa epics, forward dependencies, story sizing, acceptance criteria hoặc traceability từ story sang FR.

### Major Issues

- Mọi capability trong `FR1–FR50` hiện chưa có implementation path ở cấp epic/story.
- Không có cách chứng minh phạm vi MVP hiện tại là thực thi được với đội `1 PM/Product owner`, `1 backend/AI engineer`, `1 CSKH`.
- Không có cơ sở để xác thực sequencing giữa `Zalo-first`, handoff, knowledge base, admin vận hành và tích hợp phase sau.

### Recommendations

- Tạo tài liệu Epics & Stories trước khi tiếp tục readiness review sâu hơn.
- Mỗi epic phải map rõ về user value và FR coverage.
- Mỗi story phải có acceptance criteria testable và không có forward dependency.
- Khuyến nghị ưu tiên một workflow tạo epics/stories ngay sau PRD để biến capability contract thành kế hoạch thực thi.

## Summary and Recommendations

### Overall Readiness Status

NOT READY

### Critical Issues Requiring Immediate Action

- Thiếu tài liệu Epics & Stories nên `50/50 FR` hiện chưa có implementation path ở cấp planning execution.
- Thiếu tài liệu Architecture nên chưa thể xác thực hệ thống dự kiến có hỗ trợ được `Zalo-first`, handoff continuity, guardrails, source-of-truth và các NFR đã chốt hay không.
- Thiếu tài liệu UX nên chưa có interaction specification cho các luồng quan trọng như context capture, explainability, safe fallback, handoff, queue triage và admin workflows.
- Do thiếu ba artifact trên, readiness review không thể xác thực dependency chain từ `Vision -> Success Criteria -> Journeys -> FR/NFR -> Epics/Stories -> Implementation`.

### Recommended Next Steps

1. Tạo tài liệu `Epics & Stories` với FR coverage map cho toàn bộ `FR1–FR50`.
2. Tạo tài liệu `Architecture` để chuyển các yêu cầu domain, project-type, integration và NFR thành cấu trúc hệ thống khả thi.
3. Tạo tài liệu `UX` hoặc interaction spec cho các luồng tư vấn chính, edge-case fallback, handoff, admin vận hành và CSKH queue triage.
4. Chạy lại `Implementation Readiness` sau khi có đủ ba artifact trên để xác thực alignment và coverage thực sự.

### Final Note

Assessment này phát hiện blocker ở `3` nhóm artifact downstream: `Architecture`, `UX`, và `Epics/Stories`. PRD hiện có chất lượng tốt và đủ dày để làm foundation, nhưng chưa thể xem là implementation-ready khi chưa có coverage logic, thiết kế tương tác và kiến trúc hỗ trợ thực thi. Tiếp tục implementation ngay ở thời điểm này sẽ đẩy rủi ro sang giai đoạn delivery thay vì giải quyết ở planning.
