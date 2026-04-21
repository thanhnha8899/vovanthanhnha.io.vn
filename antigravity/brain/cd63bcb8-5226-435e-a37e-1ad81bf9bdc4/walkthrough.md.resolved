# Cập nhật `generateYeuCau` cho tất cả các môn

## Vấn đề
Tất cả 7 file môn học (trừ Toán và Vật Lí) đều có hàm `generateYeuCau()` sử dụng sai `yeuCauMap` — các key trong map vẫn là ID của môn Vật Lí (ví dụ: `ba-dinh-luat-newton`, `bien-dang-va-keo`, ...) thay vì ID đúng của từng môn.

Điều này khiến cột **"Yêu cầu cần đạt"** trong bảng Đặc tả luôn hiển thị giá trị mặc định (`'Khái niệm, gọi tên, đặc điểm cấu tạo'`) thay vì nội dung chính xác theo từng chủ đề.

## Các file đã cập nhật

| File | Môn | Trạng thái |
|------|-----|------------|
| `de-thi-hoahoc.html` | Hóa học | ✅ Đã sửa |
| `de-thi-sinhhoc.html` | Sinh học | ✅ Đã sửa |
| `de-thi-nguvan.html` | Ngữ văn | ✅ Đã sửa |
| `de-thi-lichsu.html` | Lịch sử | ✅ Đã sửa |
| `de-thi-diali.html` | Địa lí | ✅ Đã sửa |
| `de-thi-ktpl.html` | KT-PL | ✅ Đã sửa |
| `de-thi-tinhoc.html` | Tin học | ✅ Đã sửa |
| `de-thi-toan.html` | Toán | ✔️ Đã đúng sẵn |
| `de-thi-vatli.html` | Vật Lí | ✔️ Đã đúng sẵn |

## Thay đổi cụ thể

Mỗi file được cập nhật hàm `generateYeuCau(topic)` để:
1. **Keys trong `yeuCauMap`** khớp với `id` trong mảng `physicsTopics` của môn đó
2. **Values** mô tả chính xác yêu cầu cần đạt theo chương trình giáo dục của từng môn
3. **Default fallback** phù hợp với đặc thù từng môn học

## Kiểm tra

Đã kiểm tra trên trình duyệt tại `http://127.0.0.1:8080/de-thi-hoahoc.html`:
- Chọn chủ đề → Tạo ma trận → Tạo bản đặc tả
- Cột "Nội dung/đơn vị kiến thức" hiển thị đúng subtopics của Hóa học
- Cột "Yêu cầu cần đạt" hiển thị đúng nội dung tương ứng (không còn fallback mặc định)

![Kết quả kiểm tra Hóa học](C:/Users/thanh/.gemini/antigravity/brain/cd63bcb8-5226-435e-a37e-1ad81bf9bdc4/.system_generated/click_feedback/click_feedback_1775723060501.png)
