# Walkthrough: Exam Format Standardization

## Summary
All 4 exam-generating files have been standardized to match the official Ministry exam template.

## Changes Applied

### Files Updated
| File | Prompt | CSS | Header | Answer Regex |
|------|--------|-----|--------|-------------|
| de-thi-tinhoc.html | ✅ | ✅ | ✅ | ✅ |
| de-thi-vatli.html | ✅ | ✅ | ✅ | ✅ |
| de-thi-toan.html | ✅ | ✅ | ✅ | ✅ |
| de-thi-hoahoc.html | ✅ | ✅ | ✅ | ✅ |

> [!NOTE]
> The remaining 5 files (sinhhoc, diali, lichsu, nguvan, ktpl) do NOT have exam generation functionality yet.

---

### 1. Header (`buildExamHeader`)
- **Underline** under school name (TRƯỜNG THPT) via `border-bottom: 1px solid #000`
- **"(không kể thời gian phát đề)"** with parentheses
- Full format: "Thời gian làm bài: 45 phút (không kể thời gian phát đề)"
- Two-column layout: School info (left) / Exam info (right)

### 2. CSS (`exam-render-css`)
- **Answer tables: NO BORDER** (`border: none` for `table:not(.exam-header-table)`)
- Header table also borderless via `.exam-header-table`
- Red bold for correct answers: `.dap-an-dung { color: #dc2626; font-weight: 700 }`

### 3. AI Prompt (`buildExamPrompt`)
- **KHÔNG TẠO HEADER** - system generates header
- **Câu numbering**: "**Câu 1.** ... **Câu 2.** ... **Câu 3.** ..."
- **Answer table format**: Markdown table with `|---|---|` separator
- **Đ/S format**: Situation 4-6 lines → "Xác định Đúng hay Sai:" → a,b,c,d phát biểu ĐỘC LẬP
  - a) nhận biết, b) thông hiểu, c) suy luận, d) vận dụng
- **Section titles**: Proper format matching CV 7991

### 4. Answer Detection (`renderExamContent`)
- Simplified regex: matches `<strong>A.</strong>` → wraps in `<span class="dap-an-dung">`
- Works in both table cells and paragraphs
- Tinhoc also has table preprocessing for standalone pipe-separated lines
