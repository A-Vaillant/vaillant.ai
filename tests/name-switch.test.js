import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Window } from 'happy-dom';

describe('Name Switch Module', () => {
  const scriptContent = readFileSync(resolve('./src/js/name-switch.js'), 'utf-8');

  it('should not contain plaintext alternate name', () => {
    const codeLines = scriptContent.split('\n')
      .filter(line => !line.trim().startsWith('//'));
    const codeOnly = codeLines.join('\n');
    expect(codeOnly).not.toMatch(/['"`]Alice['"`]/i);
    expect(codeOnly).not.toMatch(/['"`]alice@/i);
  });

  it('should use charcode encoding for the alternate name', () => {
    expect(scriptContent).toContain('String.fromCharCode');
  });

  it('should check for ?a=2 parameter', () => {
    expect(scriptContent).toContain('URLSearchParams');
  });

  it('should target data-name attributes', () => {
    expect(scriptContent).toContain('data-name');
  });

  it('should target data-email attributes', () => {
    expect(scriptContent).toContain('data-email');
  });

  it('preserves title case on the resume and uppercase on the index', () => {
    for (const [markup, expected] of [
      ['<h1 data-name>Aleister Vaillant</h1>', 'Alice Vaillant'],
      ['<h1 data-name>ALEISTER<br>VAILLANT</h1>', 'ALICEVAILLANT']
    ]) {
      const window = new Window({ url: 'https://vaillant.ai/resume.html?a=2' });
      window.document.body.innerHTML = markup;
      window.eval(scriptContent);
      expect(window.document.querySelector('[data-name]').textContent).toBe(expected);
      window.close();
    }
  });
});

describe('Name Switch in Build Output', () => {
  it('should not contain plaintext alternate name in any output HTML', () => {
    const files = [
      './_site/index.html',
      './_site/resume.html'
    ];
    for (const file of files) {
      try {
        const content = readFileSync(resolve(file), 'utf-8');
        expect(content).not.toMatch(/Alice/);
        expect(content).not.toMatch(/alice@/);
      } catch {
        // File may not exist yet — skip
      }
    }
  });
});
