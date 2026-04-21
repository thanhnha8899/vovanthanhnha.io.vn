# Task Plan: Testing "Tạo đề thi" on de-thi-tinhoc.html

## Checklist:
- [x] Load de-thi-tinhoc.html with cache-busting (?v=2)
- [x] Select a topic in section 3 (Selected "Thông tin và dữ liệu")
- [x] Switch to "Ma trận" tab and populate it
- [x] Click "Tạo đặc tả" and verify specialization table
- [x] Switch to "Đề thi" tab
- [x] Click "Tạo đề thi (trừ 2 điểm)"
- [x] Wait for AI response (up to 40s) - No response, error persists
- [ ] Verify result and capture screenshot

## Findings:
- Hard refresh (Ctrl+Shift+R) performed.
- "Ma trận" and "Đặc tả" tables were successfully generated.
- "Tạo đề thi" button clicked multiple times.
- Visual confirmation of quota error (seen in click feedback): `model: gemini-2.0-flash`.
- **CRITICAL**: The code seems to still be using `gemini-2.0-flash` despite the reported update to `gemini-2.0-flash-lite`.
- Console logs are empty.
- Network requests tool is unavailable due to connection error.
- Cache-busting URL navigate failed due to block on `file:///` URLs with parameters.
