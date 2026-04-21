# Task Checklist
- [x] Navigate to http://127.0.0.1:8080/de-thi-tinhoc.html?v=5
- [x] Wait 3 seconds
- [x] Scroll down, click on ONE topic checkbox
- [x] Click "Đề thi" tab
- [x] Click "Tạo đề thi (trừ 2 điểm)" button
- [x] Wait 90 seconds for the response
- [ ] Take screenshots showing the result (FAILED due to rate limit)
- [ ] Scroll down if exam content appeared
- [ ] Report success or error

## Findings:
- Error: `rate_limit_exceeded`. Request was 8450 tokens, limit is 6000 TPM for `llama-3.1-8b-instant`.
- Need to reduce prompt size or change model to one with higher TPM (e.g., `llama3-8b-8192` or `gemma2-9b-it`).
