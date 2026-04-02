import { describe, it, expect, beforeEach } from 'vitest';
import { accessSync, readFileSync, constants } from 'fs';
import { resolve } from 'path';

describe('Eleventy Build Output', () => {
  it('should produce _site/index.html', () => {
    const filePath = resolve('./_site/index.html');
    expect(() => accessSync(filePath, constants.F_OK)).not.toThrow();
  });

  it('should produce valid HTML5 with DOCTYPE', () => {
    const content = readFileSync(resolve('./_site/index.html'), 'utf-8');
    expect(content).toMatch(/^<!DOCTYPE html>/i);
  });

  it('should have CNAME in output', () => {
    const filePath = resolve('./_site/CNAME');
    expect(() => accessSync(filePath, constants.F_OK)).not.toThrow();
    const content = readFileSync(filePath, 'utf-8');
    expect(content.trim()).toBe('vaillant.ai');
  });
});

describe('Base Layout', () => {
  let indexHtml;

  beforeEach(() => {
    indexHtml = readFileSync(resolve('./_site/index.html'), 'utf-8');
  });

  it('should have viewport meta tag', () => {
    expect(indexHtml).toContain('width=device-width');
  });

  it('should load site.css', () => {
    expect(indexHtml).toContain('href="/css/site.css"');
  });

  it('should load IBM Plex Mono', () => {
    expect(indexHtml).toContain('IBM+Plex+Mono');
  });

  it('should have grid-bg div', () => {
    expect(indexHtml).toContain('class="grid-bg"');
  });

  it('should have drift div', () => {
    expect(indexHtml).toContain('class="drift"');
  });

  it('should load name-switch.js', () => {
    expect(indexHtml).toContain('src="/js/name-switch.js"');
  });
});
