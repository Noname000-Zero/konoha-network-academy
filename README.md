# Học viện Mạng • Làng Lá

Ứng dụng học Mạng máy tính bằng thẻ hỏi đáp, trắc nghiệm, bài tính và minh họa SVG 2D, dành cho người mới thích học qua thực hành. Phong cách nhiệm vụ ninja/Naruto giúp gợi nhớ; thuật ngữ và cơ chế mạng được giải thích riêng.

**Bản công khai không kèm PDF bài giảng, tài nguyên Naruto chính thức, tài khoản hoặc tiến độ cá nhân.** Có thể chạy các chức năng học mà không bổ sung PDF.

## Chức năng đã triển khai

- 45 bài học, 136 câu chuẩn (34/chương), 136 cách hỏi lại, 28 bài chuyển giao cố định và 36 biến thể số cố định. Không cộng số đề sinh tiềm năng vào số câu chuẩn.
- Lượt mặc định 10 thẻ: trắc nghiệm, tự nhớ, trả lời ngắn, bài tính theo bước và tự giải; chọn chương hoặc tổng hợp.
- “Chưa biết”, gợi ý, dễ/khó hơn, hỏi lại câu sai, lịch ôn và hồ sơ kiến thức. Tự đánh giá được tách khỏi bằng chứng làm độc lập.
- Phím 1–4 chọn đáp án, Enter chuyển sau khi trả lời; tự lưu phiên, bản nháp và thứ tự lựa chọn.
- Kỳ thi có phạm vi, thời gian, ma trận, đánh dấu/quay lại và tự nộp khi hết giờ.
- Minh họa đóng gói, hàng đợi, độ trễ, thông lượng, DNS/HTTP, TCP, Stop-and-wait/GBN/SR, checksum, subnet, phân mảnh và định tuyến. Có từng bước, chạy/dừng, tốc độ và tham số thử.
- Xuất/nhập tiến độ JSON, giảm chuyển động; âm thanh mặc định tắt. Dữ liệu lưu bằng localStorage theo từng địa chỉ truy cập, không đồng bộ máy chủ.

## Cài đặt và chạy

Yêu cầu **Node.js 24 trở lên** và npm. Tại thư mục clone:

```powershell
npm ci
npm test
npm run build
npm start
```

Mở **http://127.0.0.1:4173**. Trên Windows nếu PowerShell chặn npm.ps1, dùng `npm.cmd` thay `npm`.

`npm run build` xác minh đầu ra tĩnh `dist`, cú pháp JavaScript và metadata; dự án không dùng bundler. Chỉ cần Node để phục vụ ứng dụng; jsdom phục vụ kiểm thử. Nếu cổng 4173 đã có ứng dụng khác chạy, dừng bản đó hoặc chọn cổng khác:

```powershell
$env:PORT = '4180'
npm.cmd start
```

Đổi cổng tạo origin khác nên localStorage khác; dùng xuất/nhập để chuyển tiến độ. Đây là cách chạy thủ công cho bản mã nguồn; chưa có bộ cài tự khởi động Windows trong repository này.

## Công nghệ và cấu trúc

HTML/CSS/JavaScript ES modules, SVG, localStorage, Node.js HTTP server; Node Test Runner và jsdom.

| Đường dẫn | Vai trò |
|---|---|
| `dist/app.js`, `cards-*`, `exams-*` | Luồng học, thẻ và kỳ thi |
| `dist/data.js`, `expansion.js`, `advanced-content.js` | Bài học và câu hỏi |
| `dist/adaptive.js`, `review.js`, `core.js` | Theo dõi kết quả, lịch ôn, phép tính |
| `dist/visual-*`, `math-*` | Mô hình tính, ánh xạ dữ kiện, dựng SVG và điều khiển |
| `dist/source-audit.json`, `visual-audit.json` | Chỉ mục nguồn và ánh xạ minh họa, không chứa toàn văn PDF |
| `*.test.mjs`, `build.mjs`, `audit-public.mjs` | Kiểm thử, build và rà soát bản công khai |
| `dist/sources/README.md` | Cách bổ sung PDF tùy chọn tại máy |

## Demo và ảnh giao diện

[Demo hiện có](https://konoha-network-academy-vn.pebblybug.chatgpt.site) là bản riêng tư, **cần chủ sở hữu cấp quyền**; không phải demo public của repository. Demo có thể khác bản công khai ở tài liệu PDF đi kèm. Repository này chưa triển khai GitHub Pages.

Chưa có ảnh chụp giao diện thật: công cụ trình duyệt của phiên bàn giao không kết nối được. Không dùng ảnh dựng hoặc ảnh mô phỏng thay cho screenshot đã chụp.

## Nguồn tài nguyên và phạm vi

Xem [RESOURCES.md](RESOURCES.md). PDF bài giảng chưa có bằng chứng cho phép phân phối nên không được commit; [hướng dẫn bổ sung tại máy](dist/sources/README.md). Tên tài liệu/trang/hash là tham chiếu nguồn lịch sử, không khẳng định các PDF có sẵn trong bản clone. Kiểm thử hash chỉ chạy khi người dùng tự bổ sung PDF local.

Các hình được dựng bằng mã SVG trong dự án; không đóng gói tranh, ảnh nhân vật hay logo Naruto chính thức. Tên gọi theo chủ đề được dùng cho dự án học tập không chính thức, không thể hiện sự liên kết hay bảo trợ của chủ sở hữu Naruto. Repository chưa công bố giấy phép tái phân phối cho toàn bộ nội dung; không suy ra quyền với tài nguyên của bên thứ ba từ việc mã nguồn được hiển thị công khai.

## Vai trò và quá trình có AI hỗ trợ

Tôi định hướng mục tiêu học, yêu cầu trải nghiệm, cung cấp tài liệu và điều chỉnh phạm vi, tiêu chí nghiệm thu. AI hỗ trợ phần lớn việc lập trình, biên soạn diễn giải/câu hỏi, xây mô phỏng, viết/chạy kiểm thử, tích hợp và chuẩn bị bản công khai. Tôi giữ vai trò chủ dự án và quyết định định hướng; không trình bày rằng toàn bộ mã được tôi tự viết hoặc toàn bộ kiểm thử do tôi thao tác thủ công.

Mã công khai bắt đầu bằng snapshot đã làm sạch, tách khỏi lịch sử phát triển riêng tư có tài liệu không phân phối. Các commit trong repository công khai không phản ánh đầy đủ lịch sử tạo ra sản phẩm.

## Kiểm chứng và giới hạn

Kết quả bàn giao được ghi tại [RELEASE-CHECK.md](RELEASE-CHECK.md). Chạy lại `npm test`, `npm run build`, `npm run audit:public` để tự kiểm tra. Kiểm thử DOM không thay thế thao tác trong trình duyệt thật.

- Chưa xác minh trực quan desktop/mobile, cảm ứng và trình đọc màn hình thật trong phiên bàn giao.
- Trả lời ngắn dùng tập alias; câu đúng khác cách viết có thể chưa được nhận ra.
- Mô hình TCP/HTTP giản lược, DV chưa mô phỏng đầy đủ sự cố động/count-to-infinity. Hình/tốc độ được điều chỉnh cho dễ quan sát; đọc giả thiết từng mô hình.
- Tài liệu và câu hỏi phục vụ tự học, không phải đề thi chính thức; chưa đối chiếu đề thi thật. Metadata kiểm tra nguồn trước đây không thay thế giấy phép phân phối.
- Chưa có tài khoản, backend đồng bộ tiến độ hoặc kiểm chứng hiệu quả học trên một nghiên cứu người dùng.
