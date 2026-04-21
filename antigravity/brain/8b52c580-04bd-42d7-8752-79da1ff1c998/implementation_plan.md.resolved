# Tạo giao diện Đề thi 7991 THPT cho tất cả các môn

## Mục tiêu
Tạo trang đề thi cho **9 môn THPT** (Toán, Vật Lí, Hóa học, Sinh Học, Ngữ Văn, Lịch Sử, Địa Lí, KT–PL, Tin học) với cùng layout giống `de-thi-vatli.html` hiện tại, nhưng:

1. **Mỗi môn có dữ liệu Mạch nội dung riêng** (topics & subtopics)
2. **Section 2 - Cấu trúc đề**: Logic tự động tính điểm:
   - Tổng điểm luôn = 10
   - Khi thay đổi số câu hoặc điểm/câu → Tính TNKQ trước → Điểm tự luận = 10 - Tổng TNKQ

## Yêu cầu đặc biệt về tính điểm

> [!IMPORTANT]
> **Logic tính điểm (từ hình mẫu và yêu cầu user):**
> - **Tổng TNKQ** = (Số câu TNMLC × Điểm/câu) + (Số câu TN Đúng/Sai × Điểm/câu) + (Số câu Trả lời ngắn × Điểm/câu)
> - **Điểm Tự luận** = 10 - Tổng TNKQ
> - Tự luận không có cột "Điểm/câu" (hiển thị dấu "—")
> - Khi TNKQ > 10 → hiển thị cảnh báo

## Thay đổi so với Template hiện tại

### Cải tiến Section 2 (`de-thi-vatli.html` hiện tại)
- Hiện tại: điểm tính cố định, không auto-update
- Mới: **Real-time auto-calculate** khi user thay đổi input

### Template chung
Tạo **1 file template** `de-thi-template.html` chứa toàn bộ CSS + JS chung, sau đó tạo 9 file cho 9 môn, mỗi file chỉ khác:
- Tên môn, icon, màu sắc
- Dữ liệu topics (Mạch nội dung)
- Khối lớp options

## Proposed Changes

### [NEW] Tạo 8 file mới (Vật Lí đã có)

| File | Môn | Icon | Màu |
|---|---|---|---|
| `de-thi-toan.html` | Toán | `fa-calculator` | blue |
| `de-thi-hoahoc.html` | Hóa học | `fa-flask` | teal |
| `de-thi-sinhhoc.html` | Sinh Học | `fa-dna` | orange |
| `de-thi-nguvan.html` | Ngữ Văn | `fa-book` | indigo |
| `de-thi-lichsu.html` | Lịch Sử | `fa-landmark` | red |
| `de-thi-diali.html` | Địa Lí | `fa-globe-americas` | cyan |
| `de-thi-ktpl.html` | KT – PL | `fa-scale-balanced` | purple |
| `de-thi-tinhoc.html` | Tin học | `fa-laptop-code` | cyan |

### [MODIFY] `de-thi-vatli.html`
- Thêm JS auto-calculate cho Section 2

### [MODIFY] `index.html`
- Cập nhật link href cho tất cả subject cards

## Verification Plan
- Mở từng trang, thay đổi số câu/điểm → verify tổng = 10
- Verify mạch nội dung hiển thị đúng cho mỗi môn
