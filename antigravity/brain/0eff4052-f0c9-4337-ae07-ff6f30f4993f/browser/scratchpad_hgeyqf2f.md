# Task: Verify Vietnamese diacritics in de-thi-tinhoc.html

## Plan
1. Navigate to http://127.0.0.1:8080/de-thi-tinhoc.html
2. Capture a screenshot of the form area.
3. Inspect the values of input fields:
    - #schoolName (TRƯỜNG THPT)
    - #deptName (TỔ CHUYÊN MÔN)
    - #examName (ĐỀ KIỂM TRA TIN HỌC 10)
4. Verify if diacritics (hook, ngã, grave, circumflex, horn) are displayed correctly.
5. Report findings.

## Findings
- **de-thi-tinhoc.html**:
    - `Tên trường`: `TRƯỜNG THPT` (Appears correct with horn and grave).
    - `Tổ chuyên môn`: `TÔ CHUYÊN MÔN` (Incorrect, missing hook on `Ổ`).
    - `Tên đề kiểm tra`: `ĐÊ KIÊM TRA TIN HỌC 10` (Incorrect, missing grave on `Ề` and hook on `Ể`).
    - Observation: Labels above input fields ARE correct, but the input values themselves are missing some diacritics. This suggests the issue is in the default value strings in the JS or HTML `value` attribute.
