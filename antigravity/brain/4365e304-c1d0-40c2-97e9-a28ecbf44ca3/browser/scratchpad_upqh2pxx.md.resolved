# Task: Test Gemini API in de-thi-tinhoc.html

## Checklist
- [x] Navigate to http://127.0.0.1:8080/de-thi-tinhoc.html?t=gemini2
- [x] Wait for page load and resize window
- [x] Go to "Cấu hình" tab
- [x] Select first topic
- [x] Go to "Đề thi" tab
- [x] Click "Tạo đề thi (trừ 2 điểm)"
- [x] Wait for API response (up to 60s)
- [x] Capture result screenshots
- [ ] Report success or failure

## Findings
- Gemini API returned 429 error: "You exceeded your current quota".
- Specific error: `Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 0, model: gemini-2.0-flash`.
- This suggests the API key does not have quota for Gemini 2.0 Flash or the free tier limit is currently 0.
