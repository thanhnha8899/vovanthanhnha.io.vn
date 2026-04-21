const fs = require('fs');
const files = ['de-thi-hoahoc.html', 'de-thi-toan.html', 'de-thi-tinhoc.html'];

files.forEach(file => {
  const f = fs.readFileSync(file, 'utf8');
  console.log(`\n=== ${file} ===`);
  console.log('DS socau=4:', f.includes('id="ds-socau" value="4"'));
  console.log('DS diem=0,25:', f.includes('id="ds-diem" value="0,25"'));
  console.log('TLN socau=6:', f.includes('id="tln-socau" value="6"'));
  console.log('TL socau=2:', f.includes('id="tl-socau" value="2"'));
  console.log('Tong 5.5:', f.includes('>5.5<'));
  console.log('TuLuan 4.5:', f.includes('>4.5<'));
  console.log('Has autoCalc:', f.includes('initAutoCalculate'));
  console.log('Has calculateScores:', f.includes('calculateScores'));
});
