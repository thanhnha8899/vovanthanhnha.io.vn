const fs = require('fs');
const path = require('path');
const dir = 'C:\\Users\\thanh\\.gemini\\antigravity\\scratch';
const files = fs.readdirSync(dir).filter(f => f.startsWith('de-thi-') && f.endsWith('.html'));
files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const hasOld = content.includes("'ba-dinh-luat-newton'");
    console.log(f + ': ' + (hasOld ? 'NEEDS FIX' : 'FIXED'));
});
