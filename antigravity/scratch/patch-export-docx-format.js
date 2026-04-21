const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const files = fs.readdirSync(targetDir).filter((f) => /^de-thi-.*\.html$/i.test(f));

const newExportFunction = `async function exportExamToDocx() {
        if (!lastExamMarkdown) { showNotification('Chưa có đề thi!', 'warning'); return; }
        const {Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, VerticalAlign, BorderStyle} = docx;

        const getText = (id, fallback = '') => {
            const el = document.getElementById(id);
            if (!el) return fallback;
            if (el.tagName === 'SELECT') return el.options[el.selectedIndex]?.text || fallback;
            return (el.value || '').trim() || fallback;
        };
        const stripMd = (txt) => (txt || '').replace(/\\*\\*/g, '').replace(/==/g, '').trim();
        const optionRegex = /^\\s*([A-D])\\.\\s*(.+)$/i;
        const isQuestionLine = (txt) => /^\\s*(\\*\\*)?Câu\\s*\\d+/i.test(txt);

        const getMeta = () => {
            const tenTruong = getText('ten-truong', 'TRƯỜNG THPT').toUpperCase();
            const tenDe = getText('ten-de', 'KIỂM TRA GIỮA HỌC KÌ I, NĂM HỌC 2025 - 2026').toUpperCase();
            const monHoc = getText('mon-hoc', 'Tin học');
            const khoiLop = getText('khoi-lop', '10');
            const thoiGian = getText('thoi-gian', '45');
            const namHoc = getText('nam-hoc', 'NĂM HỌC 2025 - 2026');
            const toCM = getText('to-chuyen-mon', 'TỔ CHUYÊN MÔN').toUpperCase();
            const maDe = getText('ma-de', 'ĐỀ GỐC');
            const monLower = monHoc.toLowerCase();
            const khoiLower = khoiLop.toLowerCase();
            const monDisplay = khoiLower.includes(monLower) ? khoiLop : (monHoc + (khoiLop ? ' ' + khoiLop : ''));
            return { tenTruong, tenDe, monHoc, monDisplay, thoiGian, namHoc, toCM, maDe };
        };

        const addHeader = (children, meta) => {
            const mkCell = (paras, align = AlignmentType.LEFT) => new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.TOP,
                children: paras.map((p) => new Paragraph({
                    alignment: align,
                    children: [new TextRun({ text: p.text, bold: !!p.bold, italics: !!p.italics, size: 24, font: 'Times New Roman' })],
                    spacing: { after: p.after ?? 40 }
                }))
            });
            children.push(new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: '000000' }
                },
                rows: [new TableRow({
                    children: [
                        mkCell([
                            { text: 'SỞ GD&ĐT TP.CẦN THƠ', bold: true, after: 20 },
                            { text: meta.tenTruong, bold: true, after: 20 },
                            { text: meta.toCM, bold: true, after: 20 },
                            { text: '(Đề thi có 4 trang)', italics: true, after: 0 }
                        ]),
                        mkCell([
                            { text: meta.tenDe, bold: true, after: 30 },
                            { text: 'MÔN: ' + meta.monDisplay, bold: true, after: 20 },
                            { text: 'Thời gian làm bài: ' + meta.thoiGian + ' phút (không kể thời gian phát đề)', italics: true, after: 20 },
                            { text: meta.namHoc, bold: true, after: 0 }
                        ], AlignmentType.CENTER)
                    ]
                })]
            }));
            children.push(new Paragraph({
                spacing: { before: 80, after: 40 },
                children: [
                    new TextRun({ text: 'Họ và tên thí sinh: ……………………………………………', bold: true, size: 24, font: 'Times New Roman' }),
                    new TextRun({ text: '        Mã đề: ' + meta.maDe, bold: true, size: 24, font: 'Times New Roman' })
                ]
            }));
            children.push(new Paragraph({
                spacing: { after: 80 },
                children: [new TextRun({ text: 'Số BD: …………………………………………………………', bold: true, size: 24, font: 'Times New Roman' })]
            }));
        };

        const rawLines = lastExamMarkdown.split('\\n');
        const firstBodyIdx = rawLines.findIndex((l) => /phần\\s*i|PHẦN\\s*I|câu\\s*1\\./i.test(l));
        const lines = firstBodyIdx > -1 ? rawLines.slice(firstBodyIdx) : rawLines;
        const children = [];
        const meta = getMeta();
        addHeader(children, meta);

        const makeRuns = (text) => {
            const runs = [];
            text.split(/(\\*\\*[^*]+\\*\\*)/g).forEach((part) => {
                if (!part) return;
                if (part.startsWith('**') && part.endsWith('**')) runs.push(new TextRun({ text: part.slice(2, -2), bold: true, size: 24, font: 'Times New Roman' }));
                else runs.push(new TextRun({ text: part, size: 24, font: 'Times New Roman' }));
            });
            return runs;
        };

        const parseStyledCell = (rawText) => {
            const raw = (rawText || '').trim();
            const cleaned = stripMd(raw);
            const isCorrect = /\\*\\*\\s*[A-D]\\./i.test(raw) || /==\\s*[A-D]\\./i.test(raw);
            return {
                text: cleaned,
                correct: isCorrect
            };
        };

        const pushOptionTable = (opts) => {
            const byKey = { A: null, B: null, C: null, D: null };
            opts.forEach((o) => { byKey[o.key] = o; });
            const rows = [[byKey.A, byKey.B], [byKey.C, byKey.D]].map((pair) => new TableRow({
                children: pair.map((opt) => new TableCell({
                    verticalAlign: VerticalAlign.CENTER,
                    children: [new Paragraph({
                        children: [new TextRun({
                            text: (opt ? opt.key + '. ' + stripMd(opt.text) : ''),
                            bold: !!(opt && opt.correct),
                            color: opt && opt.correct ? 'CC0000' : '000000',
                            size: 24,
                            font: 'Times New Roman'
                        })]
                    })]
                }))
            }));
            children.push(new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: '000000' }
                },
                rows
            }));
            children.push(new Paragraph({ spacing: { after: 80 } }));
        };

        const pushMarkdownTable = (tableLines) => {
            if (!tableLines || tableLines.length < 2) return;
            const rows = tableLines
                .map((ln) => ln.trim())
                .filter((ln) => ln.startsWith('|') && !/^[\\|\\s\\-:]+$/.test(ln))
                .map((ln) => ln.split('|').map((c) => c.trim()).filter(Boolean))
                .filter((cells) => cells.length > 0);
            if (!rows.length) return;

            const tableRows = rows.map((cells) => new TableRow({
                children: cells.map((cell) => {
                    const styled = parseStyledCell(cell);
                    return new TableCell({
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({
                            children: [new TextRun({
                                text: styled.text,
                                bold: styled.correct,
                                color: styled.correct ? 'CC0000' : '000000',
                                size: 24,
                                font: 'Times New Roman'
                            })]
                        })]
                    });
                })
            }));

            children.push(new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: '000000' },
                    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: '000000' }
                },
                rows: tableRows
            }));
            children.push(new Paragraph({ spacing: { after: 80 } }));
        };

        let i = 0;
        while (i < lines.length) {
            const t = lines[i].trim();
            if (!t) { children.push(new Paragraph({ spacing: { after: 60 } })); i++; continue; }
            if (/^---+$/.test(t)) { i++; continue; }
            if (t.startsWith('|')) {
                const tableLines = [];
                let k = i;
                while (k < lines.length && (lines[k] || '').trim().startsWith('|')) {
                    tableLines.push((lines[k] || '').trim());
                    k++;
                }
                pushMarkdownTable(tableLines);
                i = k;
                continue;
            }
            if (/^#{1,3}\\s+/.test(t)) {
                children.push(new Paragraph({ spacing: { before: 120, after: 60 }, children: [new TextRun({ text: stripMd(t.replace(/^#{1,3}\\s+/, '')), bold: true, size: 24, font: 'Times New Roman' })] }));
                i++;
                continue;
            }
            if (isQuestionLine(t)) {
                children.push(new Paragraph({ spacing: { after: 40 }, children: makeRuns(stripMd(t)) }));
                const opts = [];
                let j = i + 1;
                while (j < lines.length) {
                    const candidate = (lines[j] || '').trim();
                    const m = candidate.match(optionRegex);
                    if (!m) break;
                    const key = m[1].toUpperCase();
                    const raw = m[2];
                    const correct = /\\*\\*\\s*$/.test(raw) || /^\\*\\*/.test(raw);
                    opts.push({ key, text: raw, correct });
                    j++;
                }
                if (opts.length >= 2) {
                    pushOptionTable(opts);
                    i = j;
                    continue;
                }
                i++;
                continue;
            }
            children.push(new Paragraph({ spacing: { after: 40 }, children: makeRuns(stripMd(t)) }));
            i++;
        }

        const baseName = (meta.tenDe + '_' + meta.monHoc + '_' + meta.maDe).replace(/[^a-zA-Z0-9\\u00C0-\\u1EF9\\s_-]/g, '').replace(/\\s+/g, '_');
        const doc = new Document({
            sections: [{ properties: { page: { margin: { top: 1134, right: 850, bottom: 1134, left: 1134 } } }, children }]
        });
        try {
            const blob = await Packer.toBlob(doc);
            saveAs(blob, baseName + '.docx');
            showNotification('Đã tải đề thi thành công!', 'success');
        } catch (err) {
            console.error(err);
            showNotification('Lỗi xuất file!', 'error');
        }
    }`;

function replaceFunction(content, functionName, replacement) {
    const marker = `async function ${functionName}() {`;
    const start = content.indexOf(marker);
    if (start === -1) return { changed: false, content };

    let i = start + marker.length;
    let depth = 1;
    while (i < content.length && depth > 0) {
        const ch = content[i];
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
        i++;
    }
    if (depth !== 0) return { changed: false, content };

    const end = i;
    const nextChar = content[end] === '\n' ? end + 1 : end;
    const updated = content.slice(0, start) + replacement + content.slice(nextChar);
    return { changed: true, content: updated };
}

let updatedCount = 0;
for (const file of files) {
    const fullPath = path.join(targetDir, file);
    const original = fs.readFileSync(fullPath, 'utf8');
    const result = replaceFunction(original, 'exportExamToDocx', newExportFunction);
    if (result.changed) {
        fs.writeFileSync(fullPath, result.content, 'utf8');
        updatedCount++;
        console.log(`UPDATED: ${file}`);
    } else {
        console.log(`SKIPPED: ${file} (function not found or parse failed)`);
    }
}

console.log(`DONE: ${updatedCount}/${files.length} files updated.`);
