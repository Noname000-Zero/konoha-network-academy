# Kiểm tra bản công khai — 25/11/2026

Phạm vi: snapshot mã nguồn đã làm sạch, không nhập lịch sử repository riêng tư. Bản dùng cá nhân gốc không bị sửa hoặc dừng. Tài khoản/định danh Git được xác minh trước khi tạo repository; cấu hình tác giả chỉ đặt cho repository công khai.

Loại trừ PDF, .openai và cấu hình Sites, .git cũ, các báo cáo cũ chứa đường dẫn máy, bản trích xuất trang/email, node_modules, cache, tệp tạm và tiến độ cá nhân. Các dữ liệu thử trong test là fixture tổng hợp. Hình trong gói là SVG/CSS dựng bằng mã; không có ảnh Naruto chính thức.

Các phép kiểm tra phải chạy trước bàn giao:

- `npm ci`: cài từ lockfile trên Node 24.
- `npm test`: 56 nhóm hồi quy/mô phỏng và 3 nhóm riêng cho bản công khai; không cần PDF. Các kiểm tra hash chỉ áp dụng khi có PDF local, không xem thiếu PDF là đã kiểm chứng lại file nguồn.
- `npm run build`: cú pháp/tài nguyên tĩnh và metadata.
- `npm run audit:public`: quét file và mọi blob lịch sử Git công khai theo mẫu credential, khóa riêng, email, đường dẫn máy và file bị cấm. Không phải chứng nhận phát hiện mọi secret.
- Clone qua HTTPS không dùng credential, cài đặt, test và build lại từ bản public; xác minh README và liên kết tương đối.

Trạng thái kết quả thực tế được báo trong bàn giao sau khi chạy các lệnh; danh sách trên không tự khẳng định đã đạt. Kiểm tra UI thực/ảnh chụp desktop-mobile đang chờ vì native pipe trình duyệt không khả dụng. Chưa có screenshot thật; không dùng ảnh dựng thay thế.

## Kết quả đã chạy

Ngày 25/11/2026, trên Node 24.20.0 và npm 11.19.0:

- Bản nguồn công khai: `npm ci`, **59/59 test**, build và audit đều đạt. npm báo 0 lỗ hổng đã biết trong các gói được cài tại thời điểm chạy; không phải chứng nhận bảo mật toàn bộ ứng dụng.
- Đã xác minh repo GitHub là public, nhánh mặc định main và README tồn tại qua GitHub API.
- Đã clone HTTPS khi tắt credential helper, không dùng cấu hình Git cá nhân và không cho hiện lời nhắc xác thực. Trên clone không có PDF, chạy lại `npm ci`, **59/59 test**, build và audit lịch sử đều đạt.
- Server kiểm thử chạy trên loopback với cổng tạm tự cấp; trang chủ/module trả HTTP 200, PDF thiếu trả HTML hướng dẫn với HTTP 404, truy cập vượt thư mục dist bị chặn. Server thử được dừng sau test, không dừng dịch vụ của dự án khác.
- Lịch sử nguồn riêng tư không được đưa lên. Quét toàn bộ blob của lịch sử công khai theo các mẫu trong audit-public.mjs đã đạt; kiểm tra có giới hạn phát hiện và vẫn cần rà soát khi thêm tài nguyên mới.
- Chưa có ảnh thật hoặc xác minh thao tác UI bằng trình duyệt, chưa có demo public/GitHub Pages, chưa kiểm thử cài tự khởi động Windows. Những nội dung đó không được trình bày là đã hoàn thành.
