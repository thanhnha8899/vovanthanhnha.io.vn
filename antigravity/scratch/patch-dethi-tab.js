// Script to add Đề thi tab to all exam pages
const fs = require('fs');
const path = require('path');

const pages = [
    'de-thi-toan.html',
    'de-thi-vatli.html', 
    'de-thi-hoahoc.html',
    'de-thi-sinhhoc.html',
    'de-thi-nguvan.html',
    'de-thi-lichsu.html',
    'de-thi-diali.html',
    'de-thi-ktpl.html'
];

const CSS_BLOCK = `
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
        @media (max-width: 640px) {
            .dethi-card { padding: 16px; }
            .dethi-actions { flex-direction: column; }
        }
`;

const HTML_BLOCK = `
    <!-- ===== Tab Content: De Thi ===== -->
    <div class="tab-content" id="content-dethi">
        <div class="dethi-container">
            <div class="dethi-card">
                <div class="dethi-title" id="dethi-title">Đề thi</div>
                <div class="dethi-actions">
                    <button class="dethi-btn-create" id="btn-generate-exam">
                        <i class="fas fa-wand-magic-sparkles"></i> Tạo đề thi (trừ 2 điểm)
                    </button>
                    <button class="dethi-btn-secondary" id="btn-back-cauhinh">
                        <i class="fas fa-rotate-left"></i> Quay lại cấu hình
                    </button>
                    <button class="dethi-btn-secondary" id="btn-download-exam-docx" style="display:none;">
                        <i class="fas fa-download"></i> Tải về .docx
                    </button>
                </div>
                <div class="dethi-warning" id="dethi-warning" style="display:none;">
                    <i class="fas fa-circle-info"></i>
                    <span>Hãy tải đề thi trước khi tạo đề thi khác; khi quay lại sẽ không thể tải đề thi này. Mỗi lần bấm "Tạo đề thi (trừ 2 điểm)" trừ 2 điểm.</span>
                </div>
                <div class="dethi-content-area" id="dethi-content-area">
                    <div class="dethi-placeholder" id="dethi-placeholder">
                        <i class="fas fa-file-circle-plus"></i>
                        <h3>Chưa có đề thi</h3>
                        <p>Nhấn nút "Tạo đề thi" để AI tự động sinh đề dựa trên ma trận và đặc tả đã cấu hình.</p>
                    </div>
                    <div class="dethi-loading" id="dethi-loading">
                        <div class="dethi-loading-spinner"></div>
                        <div class="dethi-loading-text">Đang tạo đề thi...</div>
                        <div class="dethi-loading-sub">AI đang phân tích ma trận và tạo câu hỏi</div>
                    </div>
                    <div class="exam-rendered" id="exam-rendered" style="display:none;"></div>
                </div>
            </div>
        </div>
    </div>
`;

const JS_BUTTON_HANDLERS = `
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
`;

const JS_EXAM_FUNCTIONS = `
    // ===== Exam Generation with Gemini API =====
    const GEMINI_API_KEY = 'AIzaSyCU4t0if_aZptoB53MNkz9t-epjD2SRT1k';
    const GEMINI_MODEL = 'gemini-2.0-flash';
    let lastExamMarkdown = '';

    async function generateExamWithAI() {
        if (selectedTopics.size === 0) {
            showNotification('Vui lòng chọn nội dung kiểm tra ở tab Cấu hình!', 'warning');
            return;
        }
        const loading = document.getElementById('dethi-loading');
        const placeholder = document.getElementById('dethi-placeholder');
        const rendered = document.getElementById('exam-rendered');
        const btn = document.getElementById('btn-generate-exam');
        const warning = document.getElementById('dethi-warning');

        loading.classList.add('active');
        placeholder.style.display = 'none';
        rendered.style.display = 'none';
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo đề thi...';

        try {
            const prompt = buildExamPrompt();
            const text = await callGeminiAPI(prompt);
            lastExamMarkdown = text;
            renderExamContent(text);
            warning.style.display = 'flex';
            document.getElementById('btn-download-exam-docx').style.display = '';
            showNotification('Đề thi đã được tạo thành công!', 'success');
        } catch (err) {
            console.error('Exam generation error:', err);
            showNotification('Lỗi: ' + err.message, 'error');
            placeholder.style.display = 'flex';
        } finally {
            loading.classList.remove('active');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> Tạo đề thi (trừ 2 điểm)';
        }
    }

    function buildExamPrompt() {
        const g = id => { const e = document.getElementById(id); return e ? (e.tagName === 'SELECT' ? e.options[e.selectedIndex].text : e.value) : ''; };
        const n = id => parseInt(document.getElementById(id)?.value) || 0;
        const monHoc = g('mon-hoc'), khoiLop = g('khoi-lop'), thoiGian = g('thoi-gian');
        const tnSoCau = n('tn-socau'), dsSoCau = n('ds-socau'), tlnSoCau = n('tln-socau'), tlSoCau = n('tl-socau');
        const diemTL = document.getElementById('diem-tuluan')?.textContent || '4';

        let topics = '';
        selectedTopics.forEach(id => {
            const t = physicsTopics.find(x => x.id === id);
            if (t) {
                const s = selectedSubTopics[id] ? Array.from(selectedSubTopics[id]) : t.subtopics;
                topics += '- ' + t.fullName + ': ' + s.join(', ') + '\\n';
            }
        });

        let struct = '';
        if (tnSoCau > 0) struct += '\\n- PHẦN I: ' + tnSoCau + ' câu TN nhiều lựa chọn (' + g('tn-diem') + ' điểm/câu), 4 đáp án A/B/C/D, chỉ 1 đúng';
        if (dsSoCau > 0) struct += '\\n- PHẦN II: ' + dsSoCau + ' câu Đúng/Sai (' + g('ds-diem') + ' điểm/câu), mỗi câu có 4 phát biểu a,b,c,d';
        if (tlnSoCau > 0) struct += '\\n- PHẦN III: ' + tlnSoCau + ' câu trả lời ngắn (' + g('tln-diem') + ' điểm/câu)';
        if (tlSoCau > 0) struct += '\\n- PHẦN IV: ' + tlSoCau + ' câu tự luận (tổng ' + diemTL + ' điểm)';

        return 'Bạn là giáo viên ' + monHoc + ' THPT giỏi, nhiều năm kinh nghiệm ra đề thi. Hãy tạo MỘT ĐỀ KIỂM TRA hoàn chỉnh bằng tiếng Việt theo đúng format bên dưới.\\n\\n' +
            '===THÔNG TIN ĐỀ THI===\\n' +
            'Trường: ' + g('ten-truong') + '\\n' +
            'Đề: ' + g('ten-de') + '\\n' +
            'Môn: ' + monHoc + ' (' + khoiLop + ')\\n' +
            'Thời gian: ' + thoiGian + ' phút\\n' +
            g('nam-hoc') + ' — ' + g('ky-kiem-tra') + '\\n' +
            'Độ khó: ' + g('do-kho') + '\\n\\n' +
            '===CẤU TRÚC ĐỀ===' + struct + '\\nTổng điểm: 10\\n\\n' +
            '===MỨC ĐỘ NHẬN THỨC===\\nBiết: ' + g('biet') + '% | Hiểu: ' + g('hieu') + '% | Vận dụng: ' + g('vandung') + '%\\n\\n' +
            '===NỘI DUNG KIỂM TRA===\\n' + topics + '\\n' +
            '===YÊU CẦU===\\n' +
            '1. Bám sát SGK chương trình GDPT 2018, đúng kiến thức ' + khoiLop + '\\n' +
            '2. Câu hỏi rõ ràng, chính xác, không sai khoa học\\n' +
            '3. Phân bổ đều câu hỏi theo các chủ đề đã chọn\\n' +
            '4. Phần Đúng/Sai: mỗi câu gồm 1 đoạn mô tả ngữ cảnh + 4 phát biểu a), b), c), d) — mỗi phát biểu hoặc Đúng hoặc Sai\\n' +
            '5. Phần Tự luận: chia thang điểm rõ ràng cho từng ý (VD: Ý 1 (1 điểm): ..., Ý 2 (0.5 điểm): ...)\\n' +
            '6. Câu hỏi sắp xếp từ dễ đến khó trong mỗi phần\\n' +
            '7. Cuối cùng phải có phần ĐÁP ÁN đầy đủ\\n\\n' +
            '===FORMAT OUTPUT (Markdown) — tuân thủ chính xác===\\n\\n' +
            '**' + g('ten-truong') + '** \\u00a0\\u00a0\\u00a0\\u00a0\\u00a0 **ĐỀ KIỂM TRA ' + khoiLop.toUpperCase() + '**\\n\\n' +
            '**' + g('ten-de') + '** \\u00a0\\u00a0\\u00a0\\u00a0\\u00a0 **Môn: ' + monHoc + '**\\n\\n' +
            '\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0 Thời gian làm bài: ' + thoiGian + ' phút, không kể thời gian phát đề\\n\\n' +
            'Họ, tên thí sinh: ...............................................\\n\\n' +
            'Số báo danh: ...............................................\\n\\n---\\n\\n' +
            (tnSoCau > 0 ? '## PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn.\\n\\n' +
                'Thí sinh trả lời từ câu 1 đến câu ' + tnSoCau + '. Mỗi câu trả lời đúng thí sinh được ' + g('tn-diem') + ' điểm.\\n\\n' +
                '**Câu 1.** [nội dung]\\n\\nA. ...\\nB. ...\\nC. ...\\nD. ...\\n\\n(tương tự cho đủ ' + tnSoCau + ' câu)\\n\\n' : '') +
            (dsSoCau > 0 ? '## PHẦN II\\n\\n' +
                'Điểm tối đa của 01 câu hỏi là ' + g('ds-diem') + ' điểm.\\n' +
                'Thí sinh chỉ lựa chọn chính xác 01 ý trong 1 câu hỏi được 0,1 điểm.\\n' +
                'Thí sinh chỉ lựa chọn chính xác 02 ý trong 1 câu hỏi được 0,25 điểm.\\n' +
                'Thí sinh chỉ lựa chọn chính xác 03 ý trong 1 câu hỏi được 0,50 điểm.\\n' +
                'Thí sinh lựa chọn chính xác cả 04 ý trong 1 câu hỏi được 1 điểm.\\n\\n' +
                '(Mỗi câu gồm đoạn mô tả + 4 phát biểu a, b, c, d. Tạo đủ ' + dsSoCau + ' câu)\\n\\n' : '') +
            (tlnSoCau > 0 ? '## PHẦN III. Trả lời ngắn\\n\\nMỗi câu trả lời đúng được ' + g('tln-diem') + ' điểm. (Tạo đủ ' + tlnSoCau + ' câu)\\n\\n' : '') +
            (tlSoCau > 0 ? '## PHẦN IV. Tự luận.\\n\\nHướng dẫn chấm cụ thể theo từng ý. (Tạo đủ ' + tlSoCau + ' câu, tổng ' + diemTL + ' điểm)\\n\\n' : '') +
            '---\\n\\n' +
            '------------ HẾT ------------\\n\\n---\\n\\n' +
            '## ĐÁP ÁN ' + g('ten-de') + ' Môn: ' + monHoc + '\\n\\n' +
            (tnSoCau > 0 ? '### PHẦN I\\n\\nMỗi câu trả lời đúng thí sinh được ' + g('tn-diem') + ' điểm.\\n\\n' +
                '| Câu |' + Array.from({length: tnSoCau}, (_, i) => ' ' + (i+1) + ' |').join('') + '\\n' +
                '|---|' + Array.from({length: tnSoCau}, () => '---|').join('') + '\\n' +
                '| Chọn |' + Array.from({length: tnSoCau}, () => ' ? |').join('') + '\\n\\n' : '') +
            (dsSoCau > 0 ? '### PHẦN II\\n\\n' +
                '| Câu | a | b | c | d |\\n|---|---|---|---|---|\\n' +
                Array.from({length: dsSoCau}, (_, i) => '| ' + (tnSoCau + i + 1) + ' | Đ/S | Đ/S | Đ/S | Đ/S |').join('\\n') + '\\n\\n' : '') +
            (tlSoCau > 0 ? '### PHẦN IV\\n\\nHướng dẫn chấm chi tiết với thang điểm từng ý.\\n\\n' : '') +
            '\\nTRẢ VỀ ĐỀ THI HOÀN CHỈNH. KHÔNG giải thích gì thêm. Thay các placeholder bằng nội dung thực tế.';
    }

    async function callGeminiAPI(prompt) {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + GEMINI_MODEL + ':generateContent?key=' + GEMINI_API_KEY;
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                contents: [{parts: [{text: prompt}]}],
                generationConfig: {temperature: 0.8, maxOutputTokens: 16384}
            })
        });
        if (!res.ok) {
            const e = await res.json().catch(() => ({}));
            throw new Error(e.error?.message || 'HTTP ' + res.status);
        }
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('AI không trả về kết quả. Vui lòng thử lại.');
        return text;
    }

    function renderExamContent(md) {
        const el = document.getElementById('exam-rendered');
        if (typeof marked !== 'undefined') {
            el.innerHTML = marked.parse(md);
        } else {
            let h = md;
            h = h.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
            h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
            h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>');
            h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>');
            h = h.replace(/^---+$/gm, '<hr>');
            h = h.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
            h = h.replace(/\\*(.+?)\\*/g, '<em>$1</em>');
            h = h.replace(/\\n\\n/g, '</p><p>');
            h = h.replace(/\\n/g, '<br>');
            el.innerHTML = '<p>' + h + '</p>';
        }
        el.style.display = 'block';
        document.getElementById('dethi-placeholder').style.display = 'none';
    }

    async function exportExamToDocx() {
        if (!lastExamMarkdown) { showNotification('Chưa có đề thi!', 'warning'); return; }
        const {Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, VerticalAlign} = docx;
        const lines = lastExamMarkdown.split('\\n');
        const children = [];

        const makeRuns = (text, extra) => {
            const runs = [];
            text.split(/(\\*\\*[^*]+\\*\\*)/g).forEach(p => {
                if (p.startsWith('**') && p.endsWith('**'))
                    runs.push(new TextRun({text: p.slice(2,-2), bold: true, size: 24, font: 'Times New Roman', ...extra}));
                else if (p)
                    runs.push(new TextRun({text: p, size: 24, font: 'Times New Roman', ...extra}));
            });
            return runs;
        };

        let tableRows = [];
        const flushTable = () => {
            if (tableRows.length < 2) { tableRows = []; return; }
            try {
                const rows = tableRows.filter(r => !r.match(/^[\\|\\s\\-:]+$/));
                const trs = rows.map((row, ri) => {
                    const cells = row.split('|').map(c => c.trim()).filter(c => c);
                    return new TableRow({
                        children: cells.map(cell => new TableCell({
                            children: [new Paragraph({children: [new TextRun({text: cell, bold: ri === 0, size: 22, font: 'Times New Roman'})], alignment: AlignmentType.CENTER})],
                            verticalAlign: VerticalAlign.CENTER
                        }))
                    });
                });
                if (trs.length > 0) {
                    children.push(new Table({rows: trs, width: {size: 100, type: WidthType.PERCENTAGE}}));
                    children.push(new Paragraph({spacing: {after: 80}}));
                }
            } catch(e) { console.warn('Table parse error', e); }
            tableRows = [];
        };

        for (const line of lines) {
            const t = line.trim();
            if (t.startsWith('|')) { tableRows.push(t); continue; }
            if (tableRows.length > 0) flushTable();
            if (!t) { children.push(new Paragraph({spacing: {after: 60}})); continue; }
            if (t.startsWith('# '))
                children.push(new Paragraph({alignment: AlignmentType.CENTER, spacing: {after: 200, before: 200}, children: [new TextRun({text: t.slice(2), bold: true, size: 28, font: 'Times New Roman'})]}));
            else if (t.startsWith('## '))
                children.push(new Paragraph({spacing: {after: 120, before: 240}, children: [new TextRun({text: t.slice(3), bold: true, size: 26, font: 'Times New Roman'})]}));
            else if (t.startsWith('### '))
                children.push(new Paragraph({spacing: {after: 80, before: 160}, children: [new TextRun({text: t.slice(4), bold: true, size: 24, font: 'Times New Roman'})]}));
            else if (t.match(/^---+$/))
                children.push(new Paragraph({spacing: {after: 80}, children: [new TextRun({text: '\\u2500'.repeat(40), size: 20, font: 'Times New Roman'})]}));
            else
                children.push(new Paragraph({spacing: {after: 60}, children: makeRuns(t)}));
        }
        if (tableRows.length > 0) flushTable();

        const tenDe = document.getElementById('ten-de')?.value || 'De_Thi';
        const doc = new Document({
            sections: [{
                properties: {page: {margin: {top: 1134, right: 1134, bottom: 1134, left: 1418}}},
                children
            }]
        });
        try {
            const blob = await Packer.toBlob(doc);
            saveAs(blob, tenDe.replace(/\\s+/g, '_') + '.docx');
            showNotification('Đã tải đề thi thành công!', 'success');
        } catch (err) {
            console.error(err);
            showNotification('Lỗi xuất file!', 'error');
        }
    }
`;

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    // Skip if already patched
    if (content.includes('content-dethi')) {
        console.log(`  SKIP: ${fileName} (already patched)`);
        return;
    }

    // 1. Add CSS before the closing </style> or before @media that follows footnote sup
    const cssTarget = '.spec-table-footnote sup { color: var(--primary); font-weight: 600; }';
    if (content.includes(cssTarget)) {
        content = content.replace(cssTarget, cssTarget + '\n' + CSS_BLOCK);
    }

    // 2. Add HTML: content-dethi before <!-- docx library -->
    const htmlTarget = '<!-- docx library for Word export -->';
    if (content.includes(htmlTarget)) {
        content = content.replace(htmlTarget, HTML_BLOCK + '\n\n    ' + htmlTarget);
    }

    // 3. Add marked.js CDN after FileSaver.js
    const fileSaverTarget = '<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>';
    if (content.includes(fileSaverTarget) && !content.includes('marked.min.js')) {
        content = content.replace(fileSaverTarget, fileSaverTarget + '\n    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>');
    }

    // 4. Replace/add button handlers
    const oldHandlers = /\/\/ ===== Button Handlers =====[\s\S]*?document\.addEventListener\('DOMContentLoaded',[\s\S]*?\}\);/;
    const oldHandlersSimple = "// ===== Button Handlers =====\n    document.addEventListener('DOMContentLoaded', () => {\n        // Switch to De thi tab\n        const btnSwitchDethi = document.getElementById('btn-switch-dethi');\n        if (btnSwitchDethi) {\n            btnSwitchDethi.addEventListener('click', () => {\n                switchTab('dethi');\n            });\n        }\n\n        // Download docx\n        const btnDownload = document.getElementById('btn-download-docx');\n        if (btnDownload) {\n            btnDownload.addEventListener('click', () => {\n                exportDactaToDocx();\n            });\n        }\n    });";
    
    if (content.includes(oldHandlersSimple)) {
        content = content.replace(oldHandlersSimple, JS_BUTTON_HANDLERS.trim());
    } else if (content.match(oldHandlers)) {
        content = content.replace(oldHandlers, JS_BUTTON_HANDLERS.trim());
    }

    // 5. Add switchTab dethi handling
    // Find the pattern where switchTab handles 'dacta' and add 'dethi' handling
    const switchTabDacta = "if (tabName === 'dacta') {\n            generateSpecTable();\n        }\n    }";
    const switchTabDactaAlt = "if(tabName==='dacta'){generateSpecTable();}\n";
    const switchTabDethiCode = `if (tabName === 'dacta') {
            generateSpecTable();
        }

        // When switching to dethi, update dynamic title
        if (tabName === 'dethi') {
            const kl = document.getElementById('khoi-lop');
            const dt = document.getElementById('dethi-title');
            if (dt && kl) dt.textContent = 'Đề thi ' + kl.options[kl.selectedIndex].text;
        }
    }`;

    if (content.includes(switchTabDacta) && !content.includes("tabName === 'dethi'")) {
        content = content.replace(switchTabDacta, switchTabDethiCode);
    } else if (content.includes(switchTabDactaAlt) && !content.includes("tabName === 'dethi'")) {
        content = content.replace(switchTabDactaAlt, switchTabDethiCode.replace(/\n        /g, '') + '\n');
    }

    // 6. Add exam generation functions before </script>
    const scriptEnd = '    </script>';
    if (!content.includes('generateExamWithAI')) {
        // Find the last </script> before </body>
        const lastScriptIdx = content.lastIndexOf(scriptEnd);
        if (lastScriptIdx !== -1) {
            content = content.substring(0, lastScriptIdx) + '\n' + JS_EXAM_FUNCTIONS + '\n' + scriptEnd + content.substring(lastScriptIdx + scriptEnd.length);
        }
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  OK: ${fileName} patched successfully`);
}

console.log('Patching exam pages with Đề thi tab...\n');
for (const page of pages) {
    const filePath = path.join(__dirname, page);
    if (fs.existsSync(filePath)) {
        patchFile(filePath);
    } else {
        console.log(`  MISSING: ${page}`);
    }
}
console.log('\nDone!');
