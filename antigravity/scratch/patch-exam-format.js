/**
 * Patch all exam pages to add:
 * 1. Two-column header styling (exam-header-table CSS)
 * 2. Red correct-answer highlighting (dap-an-dung CSS)
 * 3. buildExamHeader function
 * 4. Updated renderExamContent with post-processing
 * 5. Updated AI prompt - no header, use **X.** for correct answers
 */
const fs = require('fs');
const path = require('path');

const dir = path.join('C:','Users','thanh','.gemini','antigravity','scratch');
const files = fs.readdirSync(dir).filter(f => f.startsWith('de-thi-') && f.endsWith('.html') && f !== 'de-thi-tinhoc.html');

const cssToAdd = `
        /* Exam header two-column layout */
        .exam-header-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; border: none !important; }
        .exam-header-table td { border: none !important; padding: 2px 8px; vertical-align: top; font-family: 'Times New Roman', serif; font-size: 12pt; }
        .exam-header-table .col-left { width: 45%; text-align: center; }
        .exam-header-table .col-right { width: 55%; text-align: center; }
        .exam-header-table .underline-short { display: inline-block; width: 80px; border-bottom: 1px solid #000; }
        /* Correct answer red highlight */
        .dap-an-dung { color: #dc2626 !important; font-weight: 700 !important; }
        /* Student info box */
        .exam-student-info { border: 1px solid #000; padding: 8px 14px; margin: 10px 0; font-size: 12pt; }
        /* Multi-column answer grid */
        .exam-answer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px 16px; margin: 4px 0 8px 20px; }
        .exam-answer-grid .answer-item { font-size: 12pt; }`;

const buildExamHeaderFunc = `
    function buildExamHeader(html) {
        const tenTruong = document.getElementById('ten-truong')?.value || 'TR\\u01af\\u1edcNG THPT';
        const tenDe = document.getElementById('ten-de')?.value || '\\u0110\\u1ec0 KI\\u1ec2M TRA';
        const monHoc = document.getElementById('mon-hoc');
        const monText = monHoc ? monHoc.options[monHoc.selectedIndex].text : '';
        const khoiLop = document.getElementById('khoi-lop');
        const lopText = khoiLop ? khoiLop.options[khoiLop.selectedIndex].text : '';
        const thoiGian = document.getElementById('thoi-gian')?.value || '45';
        const namHoc = document.getElementById('nam-hoc')?.value || 'N\\u0102M H\\u1eccC 2026 - 2027';
        const toCM = document.getElementById('to-chuyen-mon')?.value || 'T\\u1ed4 CHUY\\u00caN M\\u00d4N';
        const header = \`
<table class="exam-header-table">
  <tr>
    <td class="col-left"><strong>S\\u1ede GD&\\u0110T TP.C\\u1ea6N TH\\u01a0</strong></td>
    <td class="col-right"><strong>\${tenDe.toUpperCase()}</strong></td>
  </tr>
  <tr>
    <td class="col-left"><strong>\${tenTruong.toUpperCase()}</strong></td>
    <td class="col-right"><strong>M\\u00d4N: \${monText} \${lopText ? '- ' + lopText : ''}</strong></td>
  </tr>
  <tr>
    <td class="col-left"><strong>\${toCM.toUpperCase()}</strong></td>
    <td class="col-right"><em>Th\\u1eddi gian l\\u00e0m b\\u00e0i: \${thoiGian} ph\\u00fat kh\\u00f4ng k\\u1ec3 th\\u1eddi gian ph\\u00e1t \\u0111\\u1ec1</em></td>
  </tr>
  <tr>
    <td class="col-left"><em>(\\u0110\\u1ec1 thi c\\u00f3 ... trang)</em></td>
    <td class="col-right"><strong>\${namHoc}</strong></td>
  </tr>
</table>
<div class="exam-student-info">
  <strong>H\\u1ecd v\\u00e0 t\\u00ean th\\u00ed sinh:</strong> \\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>M\\u00e3 \\u0111\\u1ec1: \\u0110\\u1ec0 G\\u1ed0C</strong><br>
  <strong>S\\u1ed1 BD:</strong> \\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026\\u2026
</div>
<hr>\`;
        const firstPartIdx = html.search(/Ph\\u1ea7n\\s+I|PH\\u1ea6N\\s+I|<strong>Ph\\u1ea7n|<h[23]>Ph|C\\u00e2u\\s+1\\.|<strong>C\\u00e2u\\s+1/);
        if (firstPartIdx > 0) {
            html = header + html.substring(firstPartIdx);
        } else {
            const hrIdx = html.indexOf('<hr>');
            if (hrIdx > 0) {
                html = header + html.substring(hrIdx + 4);
            } else {
                html = header + html;
            }
        }
        return html;
    }`;

let count = 0;
for (const filename of files) {
    const filepath = path.join(dir, filename);
    let content = fs.readFileSync(filepath, 'utf8');

    // 1. Add CSS before @media
    if (!content.includes('.exam-header-table')) {
        const mediaIdx = content.indexOf('@media (max-width: 640px)');
        if (mediaIdx > 0) {
            // Find the line start
            const lineStart = content.lastIndexOf('\n', mediaIdx);
            content = content.substring(0, lineStart) + cssToAdd + content.substring(lineStart);
            console.log(`  [${filename}] Added CSS`);
        }
    }

    // 2. Update renderExamContent to add post-processing
    if (!content.includes('dap-an-dung') || !content.includes('buildExamHeader')) {
        // Find renderExamContent function
        const renderStart = content.indexOf('function renderExamContent(md)');
        if (renderStart > -1) {
            // Find the closing of the function
            let braceCount = 0;
            let inFunc = false;
            let renderEnd = -1;
            for (let i = renderStart; i < content.length; i++) {
                if (content[i] === '{') { braceCount++; inFunc = true; }
                else if (content[i] === '}') {
                    braceCount--;
                    if (inFunc && braceCount === 0) { renderEnd = i + 1; break; }
                }
            }
            if (renderEnd > 0) {
                const newRender = `function renderExamContent(md) {
        const el = document.getElementById('exam-rendered');
        let html;
        if (typeof marked !== 'undefined') {
            html = marked.parse(md);
        } else {
            let h = md;
            h = h.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
            h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
            h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>');
            h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>');
            h = h.replace(/^---+$/gm, '<hr>');
            h = h.replace(/\\*\\*\\*(.+?)\\*\\*\\*/g, '<strong><em>$1</em></strong>');
            h = h.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
            h = h.replace(/\\*(.+?)\\*/g, '<em>$1</em>');
            h = h.replace(/\\n\\n/g, '</p><p>');
            h = h.replace(/\\n/g, '<br>');
            html = '<p>' + h + '</p>';
        }
        // Post-process: highlight correct answers in red
        html = html.replace(/==([A-Da-d])\\.\\s*(.+?)==/g, '<span class="dap-an-dung">$1. $2</span>');
        html = html.replace(/<mark>([A-Da-d])\\.\\s*(.+?)<\\/mark>/g, '<span class="dap-an-dung">$1. $2</span>');
        html = html.replace(/<del>([A-Da-d])\\.\\s*(.+?)<\\/del>/g, '<span class="dap-an-dung">$1. $2</span>');
        html = html.replace(/<strong>([A-D])\\.\\s*<\\/strong>\\s*(.+?)(?=<br|<\\/p|<\\/li|$)/g, '<span class="dap-an-dung"><strong>$1.</strong> $2</span>');
        html = html.replace(/<strong>([A-D])\\.<\\/strong>\\s*(.+?)(?=<br|<\\/p|<\\/li|$)/g, '<span class="dap-an-dung"><strong>$1.</strong> $2</span>');
        html = buildExamHeader(html);
        el.innerHTML = '<div class="exam-document">' + html + '</div>';
        if (!document.getElementById('exam-render-css')) {
            const s = document.createElement('style');
            s.id = 'exam-render-css';
            s.textContent = '.exam-document{font-family:"Times New Roman",serif;font-size:12pt;color:#000;line-height:1.4;max-width:800px;margin:0 auto;padding:20px}.exam-document h2{font-size:14pt;margin:16px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}.exam-document h3{font-size:13pt;margin:12px 0 4px}.exam-document p{margin:4px 0;text-align:justify}.exam-document hr{border:none;border-top:1px solid #999;margin:12px 0}.exam-document table{width:100%;border-collapse:collapse;margin:4px 0}.exam-document td,.exam-document th{padding:3px 8px;font-size:12pt;font-family:"Times New Roman",serif}.exam-document ul,.exam-document ol{margin:4px 0;padding-left:24px}.exam-document li{margin:2px 0;text-align:justify}.dap-an-dung{color:#dc2626!important;font-weight:700!important}';
            document.head.appendChild(s);
        }
        el.style.display = 'block';
        document.getElementById('dethi-placeholder').style.display = 'none';
    }`;
                // Find the indentation
                let actualStart = renderStart;
                while (actualStart > 0 && content[actualStart - 1] === ' ') actualStart--;
                const indent = content.substring(actualStart, renderStart);
                content = content.substring(0, actualStart) + indent + newRender + content.substring(renderEnd);
                console.log(`  [${filename}] Updated renderExamContent`);
            }
        }
    }

    // 3. Add buildExamHeader function after renderExamContent
    if (!content.includes('function buildExamHeader')) {
        const afterRender = content.indexOf('async function exportExamToDocx');
        if (afterRender > 0) {
            let insertPoint = afterRender;
            while (insertPoint > 0 && content[insertPoint - 1] === ' ') insertPoint--;
            content = content.substring(0, insertPoint) + '\n' + buildExamHeaderFunc + '\n\n    ' + content.substring(afterRender);
            console.log(`  [${filename}] Added buildExamHeader`);
        }
    }

    // 4. Update prompt - remove header generation, add **X.** answer format
    // Replace the old prompt sections
    if (content.includes('Đáp án đúng tô đậm đỏ') || content.includes('SỞ GD&ĐT')) {
        // Remove header FORMAT section from prompt
        content = content.replace(
            /'\\.\\n' \+\s*'\\nFORMAT:\\\\n' \+[^;]+?'---\\\\n' \+\s*secs/,
            match => {
                // Don't try complex regex, just look for the specific pattern
                return match; // Keep as is if regex fails
            }
        );
        
        // Simpler approach: find and replace the prompt builder
        const oldPromptMarkers = [
            "Đáp án đúng tô đậm đỏ",
            "**SỞ GD&ĐT ...**",
            "CÂUHOÀN CHỈNH"
        ];
        
        // Fix "CÂUHOÀN CHỈNH" typo
        content = content.replace('CÂUHOÀN CHỈNH', 'CÂU HOÀN CHỈNH');
        
        // Fix prompt to not include header
        content = content.replace(
            /(return 'Tạo ĐỀ KIỂM TRA hoàn chỉnh bằng tiếng Việt \(Markdown\)\. Font 12pt Times New Roman\.\\n' \+\s*)'Trường: ' \+ tenTruong \+ ' \| ' \+ tenDe \+ ' \| ' \+ namHoc \+ '\\n' \+\s*'Môn:/,
            "$1'Môn:"
        );
        
        // Replace FORMAT section with KHÔNG CẦN HEADER instruction
        content = content.replace(
            /\\nFORMAT:\\\\n' \+\s*'\*\*SỞ GD&ĐT \.\.\.\*\*[^;]+?'---\\\\n' \+\s*secs/g,
            "\\nKHÔNG CẦN TẠO PHẦN HEADER (tên trường, tên đề, họ tên thí sinh...) - hệ thống tự tạo header.\\\\n' +\n            'Bắt đầu NGAY từ nội dung đề thi:\\\\n' +\n            secs"
        );
        
        // Add answer marking rules after ĐÁP ÁN section
        content = content.replace(
            /HẾT --------\*\*\\\\n---\\\\n## ĐÁP ÁN\\\\n\\\\n' \+\s*'YÊU CẦU/g,
            "HẾT --------**\\\\n\\\\n---\\\\n## ĐÁP ÁN\\\\n\\\\n' +\n            'QUY TẮC ĐÁNH DẤU ĐÁP ÁN ĐÚNG (BẮT BUỘC):\\\\n' +\n            '- Với câu trắc nghiệm: Đáp án đúng viết dạng **X.** (in đậm chữ cái). Ví dụ nếu B đúng: A. sai  **B.** đúng  C. sai  D. sai\\\\n' +\n            '- Phần ĐÁP ÁN cuối đề: liệt kê đáp án mỗi câu\\\\n\\\\n' +\n            'YÊU CẦU"
        );
        
        console.log(`  [${filename}] Updated prompt`);
    }

    fs.writeFileSync(filepath, content, 'utf8');
    count++;
    console.log(`DONE: ${filename}`);
}

console.log(`\nPatched ${count} files.`);
