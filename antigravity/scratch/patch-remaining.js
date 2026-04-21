// Run with: node patch-remaining.js
// This patches sinhhoc, nguvan, lichsu, diali, ktpl with dethi tab
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = ['de-thi-sinhhoc.html', 'de-thi-nguvan.html', 'de-thi-lichsu.html', 'de-thi-diali.html', 'de-thi-ktpl.html'];

const CSS = `
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
        .exam-rendered p { margin: 5px 0; } .exam-rendered strong { font-weight: 700; } .exam-rendered em { font-style: italic; }
        .exam-rendered hr { border: none; border-top: 1px solid #d1d5db; margin: 20px 0; }
        .exam-rendered table { border-collapse: collapse; margin: 12px 0; }
        .exam-rendered th, .exam-rendered td { border: 1px solid #9ca3af; padding: 6px 14px; text-align: center; font-size: 13px; }
        .exam-rendered th { background: #f3f4f6; font-weight: 700; }
        .exam-rendered ul, .exam-rendered ol { padding-left: 24px; margin: 5px 0; } .exam-rendered li { margin: 3px 0; }
        .exam-rendered blockquote { margin: 8px 0; padding: 8px 14px; border-left: 3px solid var(--primary); background: var(--bg-light); color: var(--text-secondary); font-style: italic; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
        @media (max-width: 640px) { .dethi-card { padding: 16px; } .dethi-actions { flex-direction: column; } }
`;

const HTML = `
    <!-- ===== Tab Content: De Thi ===== -->
    <div class="tab-content" id="content-dethi">
        <div class="dethi-container"><div class="dethi-card">
            <div class="dethi-title" id="dethi-title">\u0110\u1ec1 thi</div>
            <div class="dethi-actions">
                <button class="dethi-btn-create" id="btn-generate-exam"><i class="fas fa-wand-magic-sparkles"></i> T\u1ea1o \u0111\u1ec1 thi (tr\u1eeb 2 \u0111i\u1ec3m)</button>
                <button class="dethi-btn-secondary" id="btn-back-cauhinh"><i class="fas fa-rotate-left"></i> Quay l\u1ea1i c\u1ea5u h\u00ecnh</button>
                <button class="dethi-btn-secondary" id="btn-download-exam-docx" style="display:none;"><i class="fas fa-download"></i> T\u1ea3i v\u1ec1 .docx</button>
            </div>
            <div class="dethi-warning" id="dethi-warning" style="display:none;"><i class="fas fa-circle-info"></i><span>H\u00e3y t\u1ea3i \u0111\u1ec1 thi tr\u01b0\u1edbc khi t\u1ea1o \u0111\u1ec1 kh\u00e1c.</span></div>
            <div class="dethi-content-area" id="dethi-content-area">
                <div class="dethi-placeholder" id="dethi-placeholder"><i class="fas fa-file-circle-plus"></i><h3>Ch\u01b0a c\u00f3 \u0111\u1ec1 thi</h3><p>Nh\u1ea5n "T\u1ea1o \u0111\u1ec1 thi" \u0111\u1ec3 AI sinh \u0111\u1ec1.</p></div>
                <div class="dethi-loading" id="dethi-loading"><div class="dethi-loading-spinner"></div><div class="dethi-loading-text">\u0110ang t\u1ea1o...</div><div class="dethi-loading-sub">AI \u0111ang t\u1ea1o c\u00e2u h\u1ecfi</div></div>
                <div class="exam-rendered" id="exam-rendered" style="display:none;"></div>
            </div>
        </div></div>
    </div>
`;

const EXAM_JS = `
    // ===== Exam Generation with Gemini API =====
    const GEMINI_API_KEY = 'AIzaSyBnerY4nm2RBngHpNCDii4ava2vTeEmOTY';
    const GEMINI_MODEL = 'gemini-2.0-flash';
    let lastExamMarkdown = '';
    async function generateExamWithAI() {
        if (selectedTopics.size === 0) { showNotification('Vui l\\u00f2ng ch\\u1ecdn n\\u1ed9i dung!', 'warning'); return; }
        const loading = document.getElementById('dethi-loading'), placeholder = document.getElementById('dethi-placeholder'), rendered = document.getElementById('exam-rendered'), btn = document.getElementById('btn-generate-exam'), warning = document.getElementById('dethi-warning');
        loading.classList.add('active'); placeholder.style.display = 'none'; rendered.style.display = 'none'; btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> \\u0110ang t\\u1ea1o...';
        try { const prompt = buildExamPrompt(); const text = await callGeminiAPI(prompt); lastExamMarkdown = text; renderExamContent(text); warning.style.display = 'flex'; document.getElementById('btn-download-exam-docx').style.display = ''; showNotification('\\u0110\\u1ec1 thi \\u0111\\u00e3 t\\u1ea1o!', 'success'); }
        catch (err) { console.error(err); showNotification('L\\u1ed7i: ' + err.message, 'error'); placeholder.style.display = 'flex'; }
        finally { loading.classList.remove('active'); btn.disabled = false; btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> T\\u1ea1o \\u0111\\u1ec1 thi (tr\\u1eeb 2 \\u0111i\\u1ec3m)'; }
    }
    function buildExamPrompt() {
        const g = id => { const e = document.getElementById(id); return e ? (e.tagName === 'SELECT' ? e.options[e.selectedIndex].text : e.value) : ''; };
        const n = id => parseInt(document.getElementById(id)?.value) || 0;
        const monHoc = g('mon-hoc'), khoiLop = g('khoi-lop'), thoiGian = g('thoi-gian');
        const tnSoCau = n('tn-socau'), dsSoCau = n('ds-socau'), tlnSoCau = n('tln-socau'), tlSoCau = n('tl-socau');
        const diemTL = document.getElementById('diem-tuluan')?.textContent || '4';
        let topics = ''; selectedTopics.forEach(id => { const t = physicsTopics.find(x => x.id === id); if (t) { const s = selectedSubTopics[id] ? Array.from(selectedSubTopics[id]) : t.subtopics; topics += '- ' + t.fullName + ': ' + s.join(', ') + '\\n'; } });
        let struct = '';
        if (tnSoCau > 0) struct += '\\n- I: ' + tnSoCau + ' TN (' + g('tn-diem') + ' \\u0111/c\\u00e2u)';
        if (dsSoCau > 0) struct += '\\n- II: ' + dsSoCau + ' \\u0110/S (' + g('ds-diem') + ' \\u0111/c\\u00e2u)';
        if (tlnSoCau > 0) struct += '\\n- III: ' + tlnSoCau + ' TLN (' + g('tln-diem') + ' \\u0111/c\\u00e2u)';
        if (tlSoCau > 0) struct += '\\n- IV: ' + tlSoCau + ' TL (' + diemTL + '\\u0111)';
        return 'B\\u1ea1n l\\u00e0 GV ' + monHoc + ' THPT gi\\u1ecfi. T\\u1ea1o \\u0110\\u1ec0 KI\\u1ec2M TRA b\\u1eb1ng ti\\u1ebfng Vi\\u1ec7t.\\n\\n===TH\\u00d4NG TIN===\\nTr\\u01b0\\u1eddng: ' + g('ten-truong') + '\\n\\u0110\\u1ec1: ' + g('ten-de') + '\\nM\\u00f4n: ' + monHoc + ' (' + khoiLop + ')\\nTG: ' + thoiGian + ' ph\\u00fat\\n' + g('nam-hoc') + ' - ' + g('ky-kiem-tra') + '\\n\\u0110\\u1ed9 kh\\u00f3: ' + g('do-kho') + '\\n\\n===C\\u1ea4U TR\\u00daC===' + struct + '\\nT\\u1ed5ng: 10\\u0111\\n\\n===M\\u1ee8C \\u0110\\u1ed8===\\nBi\\u1ebft: ' + g('biet') + '% | Hi\\u1ec3u: ' + g('hieu') + '% | VD: ' + g('vandung') + '%\\n\\n===N\\u1ed8I DUNG===\\n' + topics + '\\n===Y\\u00caU C\\u1ea6U===\\n1. B\\u00e1m SGK GDPT 2018\\n2. R\\u00f5 r\\u00e0ng, ch\\u00ednh x\\u00e1c\\n3. Ph\\u00e2n b\\u1ed5 \\u0111\\u1ec1u\\n4. \\u0110/S: 4 ph\\u00e1t bi\\u1ec3u a,b,c,d\\n5. TL: thang \\u0111i\\u1ec3m r\\u00f5\\n6. D\\u1ec5 \\u0111\\u1ebfn kh\\u00f3\\n7. C\\u00f3 \\u0110\\u00c1P \\u00c1N\\n\\n===FORMAT (Markdown)===\\n**' + g('ten-truong') + '** **\\u0110\\u1ec0 KI\\u1ec2M TRA ' + khoiLop.toUpperCase() + '**\\n**' + g('ten-de') + '** **M\\u00f4n: ' + monHoc + '**\\nTG: ' + thoiGian + ' ph\\u00fat\\nH\\u1ecd t\\u00ean:... SBD:...\\n---\\n' + (tnSoCau>0?'## I. TNKQ ('+tnSoCau+' c\\u00e2u A/B/C/D)\\n\\n':'') + (dsSoCau>0?'## II. \\u0110/S ('+dsSoCau+' c\\u00e2u)\\n\\n':'') + (tlnSoCau>0?'## III. TLN ('+tlnSoCau+' c\\u00e2u)\\n\\n':'') + (tlSoCau>0?'## IV. T\\u1ef1 lu\\u1eadn ('+tlSoCau+' c\\u00e2u, '+diemTL+'\\u0111)\\n\\n':'') + '--- H\\u1ebeT ---\\n\\n## \\u0110\\u00c1P \\u00c1N\\n\\nTR\\u1ea2 V\\u1ec0 HO\\u00c0N CH\\u1ec8NH. KH\\u00d4NG gi\\u1ea3i th\\u00edch.';
    }
    async function callGeminiAPI(prompt) {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent?key=' + GEMINI_API_KEY;
        const res = await fetch(url, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ contents: [{parts: [{text: prompt}]}], generationConfig: {temperature: 0.8, maxOutputTokens: 16384} }) });
        if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || 'HTTP ' + res.status); }
        const data = await res.json(); const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('AI kh\\u00f4ng tr\\u1ea3 v\\u1ec1 k\\u1ebft qu\\u1ea3.'); return text;
    }
    function renderExamContent(md) {
        const el = document.getElementById('exam-rendered');
        if (typeof marked !== 'undefined') el.innerHTML = marked.parse(md);
        else { let h = md.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/^---+$/gm,'<hr>').replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>'); el.innerHTML = h; }
        el.style.display = 'block'; document.getElementById('dethi-placeholder').style.display = 'none';
    }
    async function exportExamToDocx() {
        if (!lastExamMarkdown) { showNotification('Ch\\u01b0a c\\u00f3 \\u0111\\u1ec1 thi!', 'warning'); return; }
        const {Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, VerticalAlign} = docx;
        const lines = lastExamMarkdown.split('\\n'), children = [];
        const makeRuns = t => { const r=[]; t.split(/(\\*\\*[^*]+\\*\\*)/g).forEach(p => { if(p.startsWith('**')&&p.endsWith('**')) r.push(new TextRun({text:p.slice(2,-2),bold:true,size:24,font:'Times New Roman'})); else if(p) r.push(new TextRun({text:p,size:24,font:'Times New Roman'})); }); return r; };
        let tblR = [];
        const flushT = () => { if(tblR.length<2){tblR=[];return;} try{const rows=tblR.filter(r=>!r.match(/^[\\|\\s\\-:]+$/));const trs=rows.map((row,ri)=>{const cells=row.split('|').map(c=>c.trim()).filter(c=>c);return new TableRow({children:cells.map(cell=>new TableCell({children:[new Paragraph({children:[new TextRun({text:cell,bold:ri===0,size:22,font:'Times New Roman'})],alignment:AlignmentType.CENTER})],verticalAlign:VerticalAlign.CENTER}))});});if(trs.length>0){children.push(new Table({rows:trs,width:{size:100,type:WidthType.PERCENTAGE}}));children.push(new Paragraph({spacing:{after:80}}));}}catch(e){} tblR=[]; };
        for(const line of lines){const t=line.trim();if(t.startsWith('|')){tblR.push(t);continue;}if(tblR.length>0)flushT();if(!t){children.push(new Paragraph({spacing:{after:60}}));continue;}if(t.startsWith('# '))children.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200,before:200},children:[new TextRun({text:t.slice(2),bold:true,size:28,font:'Times New Roman'})]}));else if(t.startsWith('## '))children.push(new Paragraph({spacing:{after:120,before:240},children:[new TextRun({text:t.slice(3),bold:true,size:26,font:'Times New Roman'})]}));else if(t.startsWith('### '))children.push(new Paragraph({spacing:{after:80,before:160},children:[new TextRun({text:t.slice(4),bold:true,size:24,font:'Times New Roman'})]}));else if(t.match(/^---+$/))children.push(new Paragraph({spacing:{after:80},children:[new TextRun({text:'\\u2500'.repeat(40),size:20,font:'Times New Roman'})]}));else children.push(new Paragraph({spacing:{after:60},children:makeRuns(t)}));}
        if(tblR.length>0)flushT();
        const tenDe = document.getElementById('ten-de')?.value || 'De_Thi';
        const doc = new Document({sections:[{properties:{page:{margin:{top:1134,right:1134,bottom:1134,left:1418}}},children}]});
        try { const blob = await Packer.toBlob(doc); saveAs(blob, tenDe.replace(/\\s+/g,'_')+'.docx'); showNotification('\\u0110\\u00e3 t\\u1ea3i!','success'); }
        catch(err) { console.error(err); showNotification('L\\u1ed7i xu\\u1ea5t file!','error'); }
    }
`;

const BTN_EXTRA = `
        const btnGenExam = document.getElementById('btn-generate-exam');
        if (btnGenExam) btnGenExam.addEventListener('click', () => generateExamWithAI());
        const btnBack = document.getElementById('btn-back-cauhinh');
        if (btnBack) btnBack.addEventListener('click', () => switchTab('cauhinh'));
        const btnDlExam = document.getElementById('btn-download-exam-docx');
        if (btnDlExam) btnDlExam.addEventListener('click', () => exportExamToDocx());`;

const SWITCH_DETHI = `
        if (tabName === 'dethi') {
            const kl = document.getElementById('khoi-lop');
            const dt = document.getElementById('dethi-title');
            if (dt && kl) dt.textContent = '\\u0110\\u1ec1 thi ' + kl.options[kl.selectedIndex].text;
        }`;

let ok = 0, fail = 0;
for (const fname of files) {
    const fp = path.join(dir, fname);
    if (!fs.existsSync(fp)) { console.log('SKIP: ' + fname + ' not found'); fail++; continue; }
    let c = fs.readFileSync(fp, 'utf8');
    if (c.includes('content-dethi')) { console.log('SKIP: ' + fname + ' already patched'); ok++; continue; }

    // 1. CSS after .spec-table-footnote sup
    c = c.replace(
        '.spec-table-footnote sup { color: var(--primary); font-weight: 600; }\n',
        '.spec-table-footnote sup { color: var(--primary); font-weight: 600; }\n' + CSS + '\n'
    );

    // 2. HTML before docx library
    c = c.replace(
        '    <!-- docx library for Word export -->',
        HTML + '\n    <!-- docx library for Word export -->'
    );

    // 3. marked.js
    if (!c.includes('marked.min.js')) {
        c = c.replace(
            'FileSaver.min.js"></script>',
            'FileSaver.min.js"></script>\n    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>'
        );
    }

    // 4. switchTab dethi
    if (!c.includes("tabName === 'dethi'")) {
        // Try pattern: generateMatranTable(); }  \n    }
        if (c.includes("generateMatranTable(); }\n    }")) {
            c = c.replace("generateMatranTable(); }\n    }", "generateMatranTable(); }" + SWITCH_DETHI + "\n    }");
        } else if (c.includes("generateMatranTable();\n        }\n    }")) {
            c = c.replace("generateMatranTable();\n        }\n    }", "generateMatranTable();\n        }" + SWITCH_DETHI + "\n    }");
        } else if (c.includes("generateSpecTable();\n        }\n    }")) {
            c = c.replace("generateSpecTable();\n        }\n    }", "generateSpecTable();\n        }" + SWITCH_DETHI + "\n    }");
        }
    }

    // 5. Button handlers - add before closing });
    // Find the DOMContentLoaded block that has button handlers and add before its closing
    const handlerPattern = /(\n    \}\);\n\n    \/\/ ===== Export to \.docx)/;
    if (handlerPattern.test(c) && !c.includes('btn-generate-exam')) {
        c = c.replace(handlerPattern, BTN_EXTRA + '\n    });\n\n    // ===== Export to .docx');
    }

    // 6. Add exam JS before last </script>
    if (!c.includes('generateExamWithAI')) {
        const lastScriptTag = c.lastIndexOf('    </script>');
        if (lastScriptTag !== -1) {
            c = c.substring(0, lastScriptTag) + EXAM_JS + '\n    </script>' + c.substring(lastScriptTag + '    </script>'.length);
        }
    }

    fs.writeFileSync(fp, c, 'utf8');
    console.log('OK: ' + fname);
    ok++;
}
console.log(`\nDone: ${ok} patched, ${fail} failed`);
