import { describe, it, expect } from 'vitest';
import { readFileSync, accessSync, constants } from 'fs';
import { resolve } from 'path';

const projectSlugs = ['storyverse', '7drl', 'paranoia-agent', 'yapperbot'];

describe('Project Pages', () => {
  for (const slug of projectSlugs) {
    describe(slug, () => {
      let html;

      it(`should produce ${slug}/index.html in build output`, () => {
        const filePath = resolve(`./_site/projects/${slug}/index.html`);
        expect(() => accessSync(filePath, constants.F_OK)).not.toThrow();
        html = readFileSync(filePath, 'utf-8');
      });

      it('should be valid HTML5', () => {
        if (!html) html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
        expect(html).toMatch(/^<!DOCTYPE html>/i);
      });

      it('should load project.css', () => {
        if (!html) html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
        expect(html).toContain('href="/css/project.css"');
      });

      it('should have an h1 with the project title', () => {
        if (!html) html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
        document.body.innerHTML = html;
        const h1 = document.querySelector('h1');
        expect(h1).toBeTruthy();
        expect(h1.textContent.trim().length).toBeGreaterThan(0);
      });

      it('should have a back link to index', () => {
        if (!html) html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
        document.body.innerHTML = html;
        const backLink = document.querySelector('.project-nav a');
        expect(backLink).toBeTruthy();
        expect(backLink.getAttribute('href')).toBe('/');
      });

      it('should have section headings', () => {
        if (!html) html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
        document.body.innerHTML = html;
        const headings = Array.from(document.querySelectorAll('h2'))
          .map(h => h.textContent.trim());
        expect(headings).toContain('What it is');
        expect(headings).toContain('Why it\'s hard');
        expect(headings).toContain('How it works');
        expect(headings).toContain('Decisions and tradeoffs');
        expect(headings).toContain('Metrics and outcomes');
      });
    });
  }

  it('should have project.css in build output', () => {
    expect(() => accessSync(resolve('./_site/css/project.css'), constants.F_OK)).not.toThrow();
  });
});

describe('Mermaid Rendering', () => {
  it('should not have unrendered mermaid code blocks in output', () => {
    for (const slug of projectSlugs) {
      const html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
      expect(html).not.toContain('class="language-mermaid"');
    }
  });

  it('should have rendered SVG elements in project pages with mermaid diagrams', () => {
    let foundSvg = false;
    for (const slug of projectSlugs) {
      const html = readFileSync(resolve(`./_site/projects/${slug}/index.html`), 'utf-8');
      if (html.includes('<svg')) {
        foundSvg = true;
        break;
      }
    }
    expect(foundSvg).toBe(true);
  });
});
