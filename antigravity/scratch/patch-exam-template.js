const fs = require('fs');

const newCallAI = `    async function callAI(prompt) {
        const res = await fetch(AI_ENDPOINT, { method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + AI_API_KEY}, body: JSON.stringify({ model: AI_MODEL, messages: [{role: 'user', content: prompt}], temperature: 0.8, max_tokens: 4096 }) });
        if (!res.ok) { const e = await res.json().catch(() => ({})); console.error('API Error:', JSON.stringify(e)); throw new Error(e.error?.message || 'HTTP ' + res.status); }
        const data = await res.json();
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error('AI kh\u00f4ng tr\u1ea3 v\u1ec1 k\u1ebft qu\u1ea3.');
        return text;
    }`;

const newRender = `    function renderExamContent(md) {
        const el = document.getElementById('exam-rendered');
        if (typeof marked !== 'undefined') { el.innerHTML = '<div class="exam-document">' + marked.parse(md) + '</div>'; }
        else { let h = md; h = h.replace(/^#### (.+)$/gm, '<h4>$1</h4>'); h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>'); h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>'); h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>'); h = h.replace(/^---+$/gm, '<hr>'); h = h.replace(/\\*\\*\\*(.+?)\\*\\*\\*/g, '<strong><em>$1</em></strong>'); h = h.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>'); h = h.replace(/\\*(.+?)\\*/g, '<em>$1</em>'); h = h.replace(/\\n\\n/g, '</p><p>'); h = h.replace(/\\n/g, '<br>'); el.innerHTML = '<div class="exam-document"><p>' + h + '</p></div>'; }
        if (!document.getElementById('exam-render-css')) { const s = document.createElement('style'); s.id = 'exam-render-css'; s.textContent = '.exam-document{font-family:"Times New Roman",serif;font-size:12pt;color:#000;line-height:1.4;max-width:800px;margin:0 auto;padding:20px}.exam-document h2{font-size:14pt;margin:16px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}.exam-document p{margin:4px 0;text-align:justify}.exam-document hr{border:none;border-top:1px solid #999;margin:12px 0}.exam-document table{width:100%;border-collapse:collapse;margin:4px 0}.exam-document td,.exam-document th{padding:3px 8px;font-size:12pt;font-family:"Times New Roman",serif}.exam-document ul,.exam-document ol{margin:4px 0;padding-left:24px}.exam-document li{margin:2px 0;text-align:justify}'; document.head.appendChild(s); }
        el.style.display = 'block'; document.getElementById('dethi-placeholder').style.display = 'none';
    }`;

const newBuildPrompt = `    function buildExamPrompt() {
        const g = id => { const e = document.getElementById(id); return e ? (e.tagName === 'SELECT' ? e.options[e.selectedIndex].text : e.value) : ''; };
        const n = id => parseInt(document.getElementById(id)?.value) || 0;
        const monHoc = g('mon-hoc'), khoiLop = g('khoi-lop'), thoiGian = g('thoi-gian');
        const tnSoCau = n('tn-socau'), dsSoCau = n('ds-socau'), tlnSoCau = n('tln-socau'), tlSoCau = n('tl-socau');
        const tnDiem = g('tn-diem'), dsDiem = g('ds-diem');
        const diemTL = document.getElementById('diem-tuluan')?.textContent || '4';
        const tenTruong = g('ten-truong'), tenDe = g('ten-de'), namHoc = g('nam-hoc');
        let topics = ''; selectedTopics.forEach(id => { const t = physicsTopics.find(x => x.id === id); if (t) { const s = selectedSubTopics[id] ? Array.from(selectedSubTopics[id]) : t.subtopics; topics += '- ' + t.fullName + ': ' + s.join(', ') + '\\n'; } });
        const pTN = tnSoCau > 0 ? (tnSoCau * parseFloat(tnDiem.replace(',','.'))).toFixed(1) : '0';
        const pDS = dsSoCau > 0 ? (dsSoCau * parseFloat(dsDiem.replace(',','.'))).toFixed(1) : '0';
        let secs = '';
        if (tnSoCau > 0) secs += '\\n**Ph\u1ea7n I. C\u00e2u tr\u1eafc nghi\u1ec7m nhi\u1ec1u ph\u01b0\u01a1ng \u00e1n l\u1ef1a ch\u1ecdn (' + pTN + ' \u0111i\u1ec3m)**\\n***Th\u00ed sinh tr\u1ea3 l\u1eddi t\u1eeb c\u00e2u 1 \u0111\u1ebfn c\u00e2u ' + tnSoCau + '. M\u1ed7i c\u00e2u ' + tnDiem + ' \u0111i\u1ec3m.***\\n(T\u1ea1o \u0111\u1ee7 ' + tnSoCau + ' c\u00e2u, 4 \u0111\u00e1p \u00e1n A/B/C/D. \u0110\u00e1p \u00e1n \u0111\u00fang t\u00f4 \u0111\u1eadm \u0111\u1ecf)\\n';
        if (dsSoCau > 0) secs += '\\n**Ph\u1ea7n II. Tr\u1eafc nghi\u1ec7m \u0111\u00fang sai (' + pDS + ' \u0111i\u1ec3m)**\\n***M\u1ed7i \u00fd a), b), c), d) ch\u1ecdn \u0111\u00fang ho\u1eb7c sai.***\\n(T\u1ea1o \u0111\u1ee7 ' + dsSoCau + ' c\u00e2u, m\u1ed7i c\u00e2u c\u00f3 t\u00ecnh hu\u1ed1ng + 4 ph\u00e1t bi\u1ec3u a,b,c,d. \u0110\u00e1p \u00e1n \u0111\u00fang g\u1ea1ch ch\u00e2n)\\n';
        if (tlSoCau > 0) secs += '\\n**Ph\u1ea7n III. T\u1ef1 lu\u1eadn (' + diemTL + ' \u0111i\u1ec3m)**\\n(T\u1ea1o \u0111\u1ee7 ' + tlSoCau + ' c\u00e2u t\u1ef1 lu\u1eadn c\u00f3 thang \u0111i\u1ec3m)\\n';
        return 'T\u1ea1o \u0110\u1ec0 KI\u1ec2M TRA ho\u00e0n ch\u1ec9nh b\u1eb1ng ti\u1ebfng Vi\u1ec7t (Markdown). Font 12pt Times New Roman.\\n' +
            'Tr\u01b0\u1eddng: ' + tenTruong + ' | ' + tenDe + ' | ' + namHoc + '\\n' +
            'M\u00f4n: ' + monHoc + ' (' + khoiLop + ') | TG: ' + thoiGian + ' ph\u00fat\\nN\u1ed9i dung:\\n' + topics +
            '\\nFORMAT:\\n**S\u1ede GD&\u0110T ...**\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0**' + tenDe.toUpperCase() + '**\\n' +
            '**' + tenTruong.toUpperCase() + '**\\u00a0\\u00a0\\u00a0\\u00a0\\u00a0**M\u00d4N: ' + monHoc + '**\\n' +
            '***Th\u1eddi gian: ' + thoiGian + ' ph\u00fat***\\n**H\u1ecd t\u00ean:** ______ **S\u1ed1 BD:** ______\\n---\\n' +
            secs + '\\n---\\n**--------- H\u1ebeT --------**\\n---\\n## \u0110\u00c1P \u00c1N\\n' +
            'Y\u00eau c\u1ea7u: SGK GDPT2018, \u0111\u00fang ' + khoiLop + ', \u0110/S 4 ph\u00e1t bi\u1ec3u a-d, **C\u00e2u x.** in \u0111\u1eadm. Tr\u1ea3 v\u1ec1 \u0111\u1ec1 ho\u00e0n ch\u1ec9nh.';
    }`;

function patch(file) {
    let c = fs.readFileSync(file, 'utf8');
    
    // Replace buildExamPrompt
    const bp_start = c.indexOf('    function buildExamPrompt() {');
    if (bp_start < 0) { console.log(file + ': buildExamPrompt not found'); return; }
    // Find end of buildExamPrompt - look for closing }
    let bp_end = c.indexOf('\n    async function callAI(', bp_start);
    if (bp_end < 0) bp_end = c.indexOf('\n    function callAI(', bp_start);
    if (bp_end < 0) { console.log(file + ': callAI not found'); return; }
    
    // Replace callAI
    let ca_end = c.indexOf('\n    function renderExamContent(', bp_end);
    if (ca_end < 0) { console.log(file + ': renderExamContent not found'); return; }
    
    // Replace renderExamContent
    let re_end = c.indexOf('\n    async function exportExamToDocx(', ca_end);
    if (re_end < 0) { console.log(file + ': exportExamToDocx not found'); return; }
    
    const newCode = newBuildPrompt + '\n' + newCallAI + '\n' + newRender + '\n';
    const result = c.substring(0, bp_start) + newCode + c.substring(re_end + 1);
    
    fs.writeFileSync(file, result, 'utf8');
    console.log(file + ': DONE (' + (c.length - result.length) + ' chars reduced)');
}

patch('de-thi-toan.html');
patch('de-thi-vatli.html');
