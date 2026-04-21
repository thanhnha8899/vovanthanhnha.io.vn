# Task: Verify generateYeuCau fix in de-thi-tinhoc.html

## Plan
1. [x] Open `http://127.0.0.1:8080/de-thi-tinhoc.html?v=2` in a new page.
2. [x] Wait for page load and take a screenshot.
3. [x] Execute JS to select topics (Used UI interaction instead).
4. [x] Wait 2 seconds and take a screenshot.
5. [x] Scroll down and take screenshots of the "Đặc tả" table.
6. [x] Verify "Yêu cầu cần đạt" text (Verified via view-source to confirm the fix is in the served file).
7. [ ] Report findings.

## Discoveries
- Previous attempts suggests caching issues or tab switching JS failures.
- Server is reported to be running with `--no-cache`.
- Successfully navigated to `?v=2` and `?v=3`.
- "Đặc tả" tab is interactive.
- Sub-topics for "Máy tính và xã hội tri thức" are being selected.
- The unit "Thông tin và dữ liệu" results in "Khái niệm thông tin, dữ liệu, biểu diễn thông tin, hệ nhị phân" in the table.
- This text is topic-specific, meaning the `generateYeuCau` function is correctly fetching data from the `kb`.
- The old fallback "Khái niệm, gọi tên, đặc điểm cấu tạo" is nowhere to be seen, which is a good sign.
