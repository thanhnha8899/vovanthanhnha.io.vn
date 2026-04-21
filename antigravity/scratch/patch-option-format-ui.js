const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter((f) => /^de-thi-.*\.html$/i.test(f));

const sanitizeFn = `
    function sanitizeExamMarkdown(md) {
        const optionRegex = /^\\s*([A-D])\\.\\s*(.+)$/i;
        const formulaRegex = /[\\[\\]\\{\\}\\(\\)=+\\-*/%<>]|` + "`" + `|:\\s*$|;\\s*$|\\b(print|input|for|while|if|else|elif|append|remove|len|def|return)\\b/i;
        const sanitizeOptionText = (text) => {
            let t = (text || '').trim();
            if (/^cả\\s*[A-D](\\s*,\\s*[A-D])+/i.test(t)) t = 'Tất cả các phương án trên';
            if (/^tất cả các ý trên$/i.test(t)) t = 'Tất cả các phương án trên';
            const hasPunc = /[.!?)]$/.test(t);
            if (!formulaRegex.test(t) && !hasPunc) t += '.';
            return t;
        };
        return md.split('\\n').map((line) => {
            const m = line.match(optionRegex);
            if (m) return m[1].toUpperCase() + '. ' + sanitizeOptionText(m[2]);
            if (line.trim().startsWith('|')) {
                const cells = line.split('|');
                const mapped = cells.map((cell) => {
                    const cm = cell.trim().match(optionRegex);
                    if (!cm) return cell;
                    return ' ' + cm[1].toUpperCase() + '. ' + sanitizeOptionText(cm[2]) + ' ';
                });
                return mapped.join('|');
            }
            return line;
        }).join('\\n');
    }
`;

let updated = 0;
for (const file of files) {
    const fp = path.join(dir, file);
    let c = fs.readFileSync(fp, 'utf8');
    const original = c;

    c = c.replace('lastExamMarkdown = text; renderExamContent(text);', 'const cleaned = sanitizeExamMarkdown(text); lastExamMarkdown = cleaned; renderExamContent(cleaned);');
    c = c.replace('if (typeof marked !== \'undefined\') { html = marked.parse(md); }', 'if (typeof marked !== \'undefined\') { html = marked.parse(sanitizeExamMarkdown(md)); }');
    c = c.replace('html = html.replace(/<strong>([A-D])\\.<\\/strong>/g, \'<span class="dap-an-dung"><strong>$1.</strong></span>\');', 'html = html.replace(/<strong>([A-D])\\.<\\/strong>/g, \'<span class="dap-an-dung"><strong>$1.</strong></span>\');\\n        html = html.replace(/>(\\\\s*)([A-D])\\\\.\\\\s/g, \'>$1<span class="opt-label">$2.</span> \');');
    c = c.replace('border:none}.exam-document table:not(.exam-header-table) td,.exam-document table:not(.exam-header-table) th{padding:4px 10px;font-size:12pt;font-family:"Times New Roman",serif;border:none;text-align:left}', 'border:1px solid #000}.exam-document table:not(.exam-header-table) td,.exam-document table:not(.exam-header-table) th{padding:4px 10px;font-size:12pt;font-family:"Times New Roman",serif;border:1px solid #000;text-align:left}');
    c = c.replace('.dap-an-dung{color:#dc2626!important;font-weight:700!important}', '.dap-an-dung{color:#dc2626!important;font-weight:700!important}.opt-label{display:inline-block;min-width:20px;padding:0 3px;border:1px solid #000;font-weight:700;margin-right:4px;line-height:1.1;text-align:center}');
    c = c.replace('Trả đề, KHÔNG giải thích.\';', 'KHÔNG tạo đáp án kiểu "Cả A, B, C...". Với đáp án là câu/ý diễn đạt bằng ngôn ngữ tự nhiên phải có dấu chấm cuối câu. Với đáp án là công thức, biểu thức, cú pháp câu lệnh, đoạn code thì không thêm dấu chấm cuối. Trả đề, KHÔNG giải thích.\';');

    if (!c.includes('function sanitizeExamMarkdown(md)')) {
        c = c.replace('    async function callAI(prompt) {', sanitizeFn + '\n    async function callAI(prompt) {');
    }

    if (c !== original) {
        fs.writeFileSync(fp, c, 'utf8');
        updated++;
        console.log('UPDATED:', file);
    }
}

console.log('DONE', updated, '/', files.length);
