# Patch all exam files to change "Trắc nghiệm Đúng/Sai" to use "lệnh hỏi" concept
# 1 câu = 4 lệnh hỏi, 1 lệnh hỏi = 0.25 điểm
# Default: 16 lệnh hỏi (= 4 câu Đúng/Sai)

$files = @(
    "de-thi-toan.html",
    "de-thi-vatli.html",
    "de-thi-tinhoc.html",
    "de-thi-sinhhoc.html",
    "de-thi-hoahoc.html",
    "de-thi-nguvan.html",
    "de-thi-lichsu.html",
    "de-thi-diali.html",
    "de-thi-ktpl.html"
)

$basePath = "C:\Users\thanh\.gemini\antigravity\scratch"

foreach ($file in $files) {
    $filePath = Join-Path $basePath $file
    if (-not (Test-Path $filePath)) {
        Write-Host "SKIP: $file not found" -ForegroundColor Yellow
        continue
    }

    $content = Get-Content $filePath -Raw -Encoding UTF8

    # 1. Change the HTML label from "Trắc nghiệm Đúng/Sai" to include "(lệnh hỏi)" hint
    # The row has: <span class="question-type-name">Trắc nghiệm Đúng/Sai</span>
    $content = $content -replace '<span class="question-type-name">Trắc nghiệm Đúng/Sai</span>', '<span class="question-type-name">Trắc nghiệm Đúng/Sai<br><small style="font-weight:400;color:#94a3b8;font-size:11px">(1 câu = 4 lệnh hỏi)</small></span>'

    # 2. Change the default value of ds-socau from 4 to 16
    $content = $content -replace 'id="ds-socau" value="4"', 'id="ds-socau" value="16"'

    # 3. Change the header "Số câu" to "Số lệnh" in the question table header
    # Already says "Số câu" for all types. We need to keep it as "Số câu" but 
    # add a note. Actually, looking at the image, for ĐS it should say number of lệnh hỏi.
    # The header is shared, so we keep it. The label change above handles clarity.

    # Save
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "PATCHED: $file" -ForegroundColor Green
}

Write-Host "`nDone! All files patched with 'lệnh hỏi' for Đúng/Sai." -ForegroundColor Cyan
