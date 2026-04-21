const fs = require('fs');
const files = ['de-thi-hoahoc.html', 'de-thi-toan.html', 'de-thi-vatli.html'];

const oldSaveAs = `const blob = await Packer.toBlob(doc); saveAs(blob, tenDe.replace(/\\s+/g, '_') + '.docx');`;
const newDownload = `const blob = await Packer.toBlob(doc);
            const docxBlob = new Blob([blob], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
            const fName = (tenDe + '_' + (document.getElementById('mon-hoc')?.options[document.getElementById('mon-hoc')?.selectedIndex]?.text || '')).replace(/[^a-zA-Z0-9\\u00C0-\\u1EF9\\s_-]/g, '').replace(/\\s+/g, '_') + '.docx';
            const url = URL.createObjectURL(docxBlob);
            const a = document.createElement('a');
            a.href = url; a.download = fName;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1000);`;

files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    // Match various saveAs patterns
    const patterns = [
        /const blob = await Packer\.toBlob\(doc\);\s*saveAs\(blob,\s*tenDe\.replace\([^)]+\)\s*\+\s*'\.docx'\);/g,
        /const blob = await Packer\.toBlob\(doc\);\s*saveAs\(blob,\s*[^;]+\.docx[^;]*\);/g,
    ];
    let replaced = false;
    for (const p of patterns) {
        if (p.test(c)) {
            c = c.replace(p, newDownload);
            replaced = true;
            break;
        }
    }
    if (replaced) {
        fs.writeFileSync(f, c, 'utf8');
        console.log(f + ': PATCHED download');
    } else {
        console.log(f + ': pattern not found');
    }
});
