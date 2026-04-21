$pages = @(
    "de-thi-toan.html",
    "de-thi-vatli.html",
    "de-thi-hoahoc.html",
    "de-thi-sinhhoc.html",
    "de-thi-nguvan.html",
    "de-thi-lichsu.html",
    "de-thi-diali.html",
    "de-thi-ktpl.html"
)

$cssBlock = @'

        /* ===== Dethi Tab ===== */
        .dethi-container { max-width: 1400px; margin: 0 auto; padding: 24px; animation: fadeInUp 0.5s ease; }
        .dethi-card { background: var(--bg-white); border-radius: var(--radius-lg); border: 1px solid rgba(0,0,0,0.06); overflow: hidden; box-shadow: var(--shadow); padding: 28px; }
        .dethi-title { font-size: 20px; font-weight: 700; color: var(--navy); margin-bottom: 20px; }
        .dethi-actions { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
        .dethi-btn-create { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--primary); color: white; border: none; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; cursor: pointer; transition: all var(--transition); box-shadow: 0 2px 8px rgba(99,102,241,0.25); }
        .dethi-btn-create:hover:not(:disabled) { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.35); }
        .dethi-btn-create:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }
        .dethi-btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: var(--bg-white); color: var(--text-primary); border: 1.5px solid #e2e8f0; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; cursor: pointer; transition: all var(--transition); }
        .dethi-btn-secondary:hover { border-color: var(--primary); color: var(--primary); }
        .dethi-warning { display: flex; align-items: flex-start; gap: 10px; padding: 14px 18px; background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius-sm); margin-bottom: 24px; font-size: 13px; color: #92400e; line-height: 1.6; }
        .dethi-warning i { color: #f59e0b; margin-top: 3px; flex-shrink: 0; }
        .dethi-content-area { position: relative; min-height: 300px; }
        .dethi-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; text-align: center; color: var(--text-light); }
        .dethi-placeholder i { font-size: 56px; margin-bottom: 16px; color: #c7d2fe; }
        .dethi-placeholder h3 { font-size: 16px; font-weight: 700; color: var(--text-secondary); margin-bottom: 6px; }
        .dethi-placeholder p { font-size: 13px; max-width: 360px; line-height: 1.5; }
        .dethi-loading { display: none; position: absolute; inset: 0; background: rgba(255,255,255,0.95); z-index: 10; flex-direction: column; align-items: center; justify-content: center; }
        .dethi-loading.active { display: flex !important; }
        .dethi-loading-spinner { width: 44px; height: 44px; border: 4px solid #e2e8f0; border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 14px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .dethi-loading-text { font-size: 14px; font-weight: 600; color: var(--text-secondary); }
        .dethi-loading-sub { font-size: 12px; color: var(--text-light); margin-top: 4px; }
        .exam-rendered { font-family: 'Times New Roman', serif; font-size: 14.5px; line-height: 1.75; color: #1a1a1a; }
        .exam-rendered h1 { font-size: 16px; font-weight: 700; text-transform: uppercase; margin: 14px 0; text-align: center; }
        .exam-rendered h2 { font-size: 15px; font-weight: 700; margin: 20px 0 10px; }
        .exam-rendered h3 { font-size: 14.5px; font-weight: 700; margin: 14px 0 8px; }
        .exam-rendered p { margin: 5px 0; }
        .exam-rendered strong { font-weight: 700; }
        .exam-rendered em { font-style: italic; }
        .exam-rendered hr { border: none; border-top: 1px solid #d1d5db; margin: 20px 0; }
        .exam-rendered table { border-collapse: collapse; margin: 12px 0; }
        .exam-rendered th, .exam-rendered td { border: 1px solid #9ca3af; padding: 6px 14px; text-align: center; font-size: 13px; }
        .exam-rendered th { background: #f3f4f6; font-weight: 700; }
        .exam-rendered ul, .exam-rendered ol { padding-left: 24px; margin: 5px 0; }
        .exam-rendered li { margin: 3px 0; }
        .exam-rendered blockquote { margin: 8px 0; padding: 8px 14px; border-left: 3px solid var(--primary); background: var(--bg-light); color: var(--text-secondary); font-style: italic; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
        @media (max-width: 640px) { .dethi-card { padding: 16px; } .dethi-actions { flex-direction: column; } }
'@

$htmlBlock = @'

    <!-- ===== Tab Content: De Thi ===== -->
    <div class="tab-content" id="content-dethi">
        <div class="dethi-container">
            <div class="dethi-card">
                <div class="dethi-title" id="dethi-title">&#272;&#7873; thi</div>
                <div class="dethi-actions">
                    <button class="dethi-btn-create" id="btn-generate-exam">
                        <i class="fas fa-wand-magic-sparkles"></i> T&#7841;o &#273;&#7873; thi (tr&#7915; 2 &#273;i&#7875;m)
                    </button>
                    <button class="dethi-btn-secondary" id="btn-back-cauhinh">
                        <i class="fas fa-rotate-left"></i> Quay l&#7841;i c&#7845;u h&#236;nh
                    </button>
                    <button class="dethi-btn-secondary" id="btn-download-exam-docx" style="display:none;">
                        <i class="fas fa-download"></i> T&#7843;i v&#7873; .docx
                    </button>
                </div>
                <div class="dethi-warning" id="dethi-warning" style="display:none;">
                    <i class="fas fa-circle-info"></i>
                    <span>H&#227;y t&#7843;i &#273;&#7873; thi tr&#432;&#7899;c khi t&#7841;o &#273;&#7873; thi kh&#225;c; khi quay l&#7841;i s&#7869; kh&#244;ng th&#7875; t&#7843;i &#273;&#7873; thi n&#224;y. M&#7895;i l&#7847;n b&#7845;m "T&#7841;o &#273;&#7873; thi (tr&#7915; 2 &#273;i&#7875;m)" tr&#7915; 2 &#273;i&#7875;m.</span>
                </div>
                <div class="dethi-content-area" id="dethi-content-area">
                    <div class="dethi-placeholder" id="dethi-placeholder">
                        <i class="fas fa-file-circle-plus"></i>
                        <h3>Ch&#432;a c&#243; &#273;&#7873; thi</h3>
                        <p>Nh&#7845;n n&#250;t "T&#7841;o &#273;&#7873; thi" &#273;&#7875; AI t&#7921; &#273;&#7897;ng sinh &#273;&#7873; d&#7921;a tr&#234;n ma tr&#7853;n v&#224; &#273;&#7863;c t&#7843; &#273;&#227; c&#7845;u h&#236;nh.</p>
                    </div>
                    <div class="dethi-loading" id="dethi-loading">
                        <div class="dethi-loading-spinner"></div>
                        <div class="dethi-loading-text">&#272;ang t&#7841;o &#273;&#7873; thi...</div>
                        <div class="dethi-loading-sub">AI &#273;ang ph&#226;n t&#237;ch ma tr&#7853;n v&#224; t&#7841;o c&#226;u h&#7887;i</div>
                    </div>
                    <div class="exam-rendered" id="exam-rendered" style="display:none;"></div>
                </div>
            </div>
        </div>
    </div>
'@

$scriptMarkedJs = '    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>'

# Read the exam functions from the tinhoc file (lines 2367-2548)
$tinhocContent = Get-Content "C:\Users\thanh\.gemini\antigravity\scratch\de-thi-tinhoc.html" -Raw -Encoding UTF8

# Extract the exam functions block
$examFunctionsStart = $tinhocContent.IndexOf("// ===== Exam Generation with Gemini API =====")
$examFunctionsEnd = $tinhocContent.IndexOf("    </script>", $examFunctionsStart)
$examFunctions = $tinhocContent.Substring($examFunctionsStart, $examFunctionsEnd - $examFunctionsStart)

$newButtonHandlers = @'
    // ===== Button Handlers =====
    document.addEventListener('DOMContentLoaded', () => {
        // Switch to De thi tab
        const btnSwitchDethi = document.getElementById('btn-switch-dethi');
        if (btnSwitchDethi) btnSwitchDethi.addEventListener('click', () => switchTab('dethi'));

        // Download dacta docx
        const btnDownload = document.getElementById('btn-download-docx');
        if (btnDownload) btnDownload.addEventListener('click', () => exportDactaToDocx());

        // Generate exam
        const btnGenExam = document.getElementById('btn-generate-exam');
        if (btnGenExam) btnGenExam.addEventListener('click', () => generateExamWithAI());

        // Back to cauhinh from dethi
        const btnBack = document.getElementById('btn-back-cauhinh');
        if (btnBack) btnBack.addEventListener('click', () => switchTab('cauhinh'));

        // Download exam docx
        const btnDlExam = document.getElementById('btn-download-exam-docx');
        if (btnDlExam) btnDlExam.addEventListener('click', () => exportExamToDocx());
    });
'@

$switchTabDethi = @'
        // When switching to dacta, generate the spec table
        if (tabName === 'dacta') {
            generateSpecTable();
        }

        // When switching to dethi, update dynamic title
        if (tabName === 'dethi') {
            const kl = document.getElementById('khoi-lop');
            const dt = document.getElementById('dethi-title');
            if (dt && kl) dt.textContent = '\u0110\u1ec1 thi ' + kl.options[kl.selectedIndex].text;
        }
    }
'@

$oldSwitchTab = @'
        // When switching to dacta, generate the spec table
        if (tabName === 'dacta') {
            generateSpecTable();
        }
    }
'@

$oldButtonHandlers = @'
    // ===== Button Handlers =====
    document.addEventListener('DOMContentLoaded', () => {
        // Switch to De thi tab
        const btnSwitchDethi = document.getElementById('btn-switch-dethi');
        if (btnSwitchDethi) {
            btnSwitchDethi.addEventListener('click', () => {
                switchTab('dethi');
            });
        }

        // Download docx
        const btnDownload = document.getElementById('btn-download-docx');
        if (btnDownload) {
            btnDownload.addEventListener('click', () => {
                exportDactaToDocx();
            });
        }
    });
'@

foreach ($page in $pages) {
    $filePath = "C:\Users\thanh\.gemini\antigravity\scratch\$page"
    if (-not (Test-Path $filePath)) {
        Write-Host "MISSING: $page"
        continue
    }
    
    $content = Get-Content $filePath -Raw -Encoding UTF8
    
    if ($content.Contains("content-dethi")) {
        Write-Host "SKIP: $page (already patched)"
        continue
    }
    
    # 1. Add CSS
    $content = $content.Replace(
        ".spec-table-footnote sup { color: var(--primary); font-weight: 600; }",
        ".spec-table-footnote sup { color: var(--primary); font-weight: 600; }" + $cssBlock
    )
    
    # 2. Add HTML before docx library
    $content = $content.Replace(
        "    <!-- docx library for Word export -->",
        $htmlBlock + "`n`n    <!-- docx library for Word export -->"
    )
    
    # 3. Add marked.js
    $content = $content.Replace(
        '    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>',
        '    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>' + "`n" + $scriptMarkedJs
    )
    
    # 4. Replace button handlers
    $content = $content.Replace($oldButtonHandlers, $newButtonHandlers)
    
    # 5. Update switchTab
    $content = $content.Replace($oldSwitchTab, $switchTabDethi)
    
    # 6. Add exam functions before </script>
    $lastScriptTag = "    </script>`n`n</body>"
    $content = $content.Replace($lastScriptTag, "`n    $examFunctions`n    </script>`n`n</body>")
    
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    Write-Host "OK: $page patched"
}

Write-Host "`nDone!"
