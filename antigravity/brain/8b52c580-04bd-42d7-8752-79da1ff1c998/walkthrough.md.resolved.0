# Walkthrough: Đề thi 7991 THPT - Tất cả các môn

## Tóm tắt
Đã tạo giao diện đề thi cho **9 bộ môn THPT** với logic tự động tính điểm TNKQ + Tự luận = 10.

## Các file đã tạo/sửa

### Files mới (8 trang đề thi)
| File | Môn | Icon | Mạch nội dung |
|---|---|---|---|
| [de-thi-toan.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-toan.html) | Toán | `fa-calculator` | 10 mạch |
| [de-thi-hoahoc.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-hoahoc.html) | Hóa học | `fa-flask` | 8 mạch |
| [de-thi-sinhhoc.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-sinhhoc.html) | Sinh Học | `fa-dna` | 8 mạch |
| [de-thi-nguvan.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-nguvan.html) | Ngữ Văn | `fa-book` | 8 mạch |
| [de-thi-lichsu.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-lichsu.html) | Lịch Sử | `fa-landmark` | 7 mạch |
| [de-thi-diali.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-diali.html) | Địa Lí | `fa-globe-americas` | 8 mạch |
| [de-thi-ktpl.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-ktpl.html) | KT – PL | `fa-scale-balanced` | 8 mạch |
| [de-thi-tinhoc.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-tinhoc.html) | Tin học | `fa-laptop-code` | 8 mạch |

### Files đã sửa
| File | Thay đổi |
|---|---|
| [de-thi-vatli.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/de-thi-vatli.html) | Thêm JS auto-calculate, cập nhật giá trị mặc định |
| [index.html](file:///c:/Users/thanh/.gemini/antigravity/scratch/index.html) | Cập nhật `href` cho 7 subject cards |

---

## Logic tính điểm (Section 2)

```
TỔNG TNKQ = (TN_nhiều_lựa_chọn × điểm/câu) 
           + (TN_Đúng/Sai × điểm/câu) 
           + (Trả_lời_ngắn × điểm/câu)

ĐIỂM TỰ LUẬN = 10 - TỔNG TNKQ
```

### Giá trị mặc định (theo hình mẫu)
| Loại câu | Số câu | Điểm/câu | Tổng |
|---|---|---|---|
| TN nhiều lựa chọn | 12 | 0,25 | 3.0 |
| TN Đúng/Sai | 4 | 0,25 | 1.0 |
| Trả lời ngắn | 6 | 0,25 | 1.5 |
| Tự luận | 2 | — (auto) | 4.5 |
| **Tổng** | | | **10** |

### Tính năng auto-calculate
- Real-time update khi thay đổi bất kỳ input nào
- Hỗ trợ dấu phẩy kiểu Việt Nam (`0,25` → `0.25`)
- Cảnh báo đỏ khi TNKQ > 10 điểm
- Tự luận tự động = 10 - TNKQ

## Xác nhận
- ✅ Tất cả 8 file mới đều có auto-calculate JS
- ✅ Giá trị mặc định đúng: TNKQ=5.5, TL=4.5
- ✅ Mỗi môn có mạch nội dung riêng biệt
- ✅ Links từ dashboard hoạt động
