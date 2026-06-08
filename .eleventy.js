import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export default function(eleventyConfig) {
  // Exclude drafts from output
  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: (data) => {
      if (data.draft) return false;
      return data.permalink;
    }
  });

  eleventyConfig.addPassthroughCopy({ 'public': '.' });
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');

  // Mermaid build-time transform: replace fenced mermaid blocks with inline SVGs
  eleventyConfig.addTransform('mermaid', function(content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith('.html')) {
      return content;
    }

    const mermaidRegex = /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g;
    let match;
    let result = content;

    while ((match = mermaidRegex.exec(content)) !== null) {
      const diagramSource = match[1]
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');

      const tempDir = join(tmpdir(), 'mermaid-' + Date.now());
      mkdirSync(tempDir, { recursive: true });
      const inputPath = join(tempDir, 'input.mmd');
      const outputPath = join(tempDir, 'output.svg');

      writeFileSync(inputPath, diagramSource);

      try {
        execSync(
          `npx mmdc -i "${inputPath}" -o "${outputPath}" -c .mermaidrc.json -b transparent`,
          { stdio: 'pipe', timeout: 30000 }
        );
        const svg = readFileSync(outputPath, 'utf-8');
        result = result.replace(match[0], svg);
      } catch (err) {
        console.error('Mermaid render failed:', err.message);
      }
    }

    return result;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}
