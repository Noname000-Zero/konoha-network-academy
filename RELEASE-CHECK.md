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
