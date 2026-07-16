const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.tsx') && p.includes('page.tsx')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes('styles.headerBg')) {
        let modified = false;
        // Search for <Image ... />
        content = content.replace(/<Image\s+src="([^"]+)"\s+alt="([^"]+)"\s+fill(.*?)\/>/g, (match, src, alt, rest) => {
          if (!match.includes('priority')) {
            modified = true;
            return `<Image src="${src}" alt="${alt}" fill priority={true} fetchPriority="high"${rest}/>`;
          }
          return match;
        });
        if (modified) {
          fs.writeFileSync(p, content);
          console.log('Updated ' + p);
        }
      }
    }
  }
}

walk('src/app');
