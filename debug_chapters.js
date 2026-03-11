const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const chaptersDir = path.join(__dirname, 'content/chapters');
const files = fs.readdirSync(chaptersDir);

console.log('Found files:', files);

files.forEach(file => {
  if (file.endsWith('.md')) {
    const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
    const { data } = matter(content);
    console.log(`\n${file}:`);
    console.log('  chapter:', data.chapter, typeof data.chapter);
    console.log('  title:', data.title);
    console.log('  quote:', data.quote);
  }
});
