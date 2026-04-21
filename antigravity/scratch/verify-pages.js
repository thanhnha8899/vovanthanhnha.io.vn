const fs = require('fs');

const files = [
  'de-thi-toan.html',
  'de-thi-hoahoc.html', 
  'de-thi-sinhhoc.html',
  'de-thi-nguvan.html',
  'de-thi-lichsu.html',
  'de-thi-diali.html',
  'de-thi-ktpl.html',
  'de-thi-tinhoc.html'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const title = content.match(/<title>(.*?)<\/title>/)?.[1] || 'NOT FOUND';
  const hasAutoCalc = content.includes('initAutoCalculate');
  const hasTopics = content.includes('const physicsTopics');
  const hasVatLiText = content.includes('Vật Lí') && !content.includes('THPT');
  
  console.log(`${file}:`);
  console.log(`  Title: ${title}`);
  console.log(`  Auto-calc: ${hasAutoCalc}`);
  console.log(`  Topics: ${hasTopics}`);
  console.log(`  Still has "Vat Li" references: ${content.includes('Vật Lí')}`);
  console.log('');
});
