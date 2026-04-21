const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter((f) => /^de-thi-.*\.html$/i.test(f));

const sanitizeBlock = `function sanitizeExamMarkdown(md) {
        const optionRegex = /^\\s*(?:\\*\\*)?([A-D])\\.(?:\\*\\*)?\\s*(.+)$/i;
        const formulaRegex = /[\\[\\]\\{\\}\\(\\)=+\\-*/%<>]|:\\s*$|;\\s*$|\\b(print|input|for|while|if|else|elif|append|remove|len|def|return)\\b/i;
        const normalizeOption = (txt) => {
            let t = (txt || '').replace(/\\*\\*/g, '').replace(/==/g, '').trim();
            if (/^cả\\s*[A-D](\\s*,\\s*[A-D])+/i.test(t) || /^tất cả các ý trên$/i.test(t)) t = 'Tất cả các phương án trên';
            const hasPunc = /[.!?)]$/.test(t);
            if (!formulaRegex.test(t) && !hasPunc) t += '.';
            return t;
        };

        const lines = (md || '').split('\\n');
        const out = [];
        let i = 0;
        while (i < lines.length) {
            const line = lines[i] || '';
            const trimmed = line.trim();

            if (trimmed.startsWith('|')) {
                const table = [];
                let j = i;
                while (j < lines.length && (lines[j] || '').trim().startsWith('|')) {
                    table.push((lines[j] || '').trim());
                    j++;
                }

                const found = [];
                table.forEach((row) => {
                    if (/^[\\|\\s\\-:]+$/.test(row)) return;
                    row.split('|').map((c) => c.trim()).filter(Boolean).forEach((cell) => {
                        const m = cell.match(optionRegex);
                        if (m) found.push({ key: m[1].toUpperCase(), value: normalizeOption(m[2]) });
                    });
                });

                if (found.length) {
                    const map = { A: '', B: '', C: '', D: '' };
                    found.forEach((f) => { if (!map[f.key]) map[f.key] = f.value; });
                    ['A', 'B', 'C', 'D'].forEach((k) => { if (map[k]) out.push(k + '. ' + map[k]); });
                }

                i = j;
                continue;
            }

            const m = trimmed.match(optionRegex);
            if (m) {
                out.push(m[1].toUpperCase() + '. ' + normalizeOption(m[2]));
            } else if (!/^[\\|\\s\\-:]+$/.test(trimmed)) {
                out.push(line);
            }
            i++;
        }
        return out.join('\\n');
    }`;

function replaceBlock(content, startMarker, endMarker, newBlock) {
    const s = content.indexOf(startMarker);
    if (s === -1) return content;
    const e = content.indexOf(endMarker, s);
    if (e === -1) return content;
    return content.slice(0, s) + newBlock + '\n    ' + endMarker + content.slice(e + endMarker.length);
}

let updated = 0;
for (const file of files) {
    const fp = path.join(dir, file);
    let c = fs.readFileSync(fp, 'utf8');
    const original = c;

    c = replaceBlock(c, 'function sanitizeExamMarkdown(md) {', 'async function callAI(prompt) {', sanitizeBlock);
    c = c.replace(/html = html\.replace\(/g, 'html = html.replace(');
    c = c.replace(/html = html\.replace\(\/<strong>\(\[A-D\]\)\\\.<\\\/strong>\/g, '<span class="dap-an-dung"><strong>\$1.<\/strong><\/span>'\);\\n\s*html = html\.replace\(\/>\\\(\\\\s\*\)\(\[A-D\]\)\\\.\\\s\/g, '>\$1<span class="opt-label">\$2.<\/span> '\);/g, "html = html.replace(/<strong>([A-D])\\.<\\/strong>/g, '<span class=\"dap-an-dung\"><strong>$1.</strong></span>');\n        html = html.replace(/>(\\s*)([A-D])\\.\\s/g, '>$1<span class=\"opt-label\">$2.</span> ');");
    c = c.replace(/\\.opt-label\\{display:inline-block;min-width:20px;padding:0 3px;border:1px solid #000;font-weight:700;margin-right:4px;line-height:1\\.1;text-align:center\\}\\.opt-label\\{display:inline-block;min-width:20px;padding:0 3px;border:1px solid #000;font-weight:700;margin-right:4px;line-height:1\\.1;text-align:center\\}/g, '.opt-label{display:inline-block;min-width:20px;padding:0 3px;border:1px solid #000;font-weight:700;margin-right:4px;line-height:1.1;text-align:center}');

    if (c !== original) {
        fs.writeFileSync(fp, c, 'utf8');
        updated++;
        console.log('UPDATED:', file);
    }
}
console.log('DONE', updated, '/', files.length);
