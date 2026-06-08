import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Landing Page', () => {
  let html;

  beforeEach(() => {
    html = readFileSync(resolve('./_site/index.html'), 'utf-8');
    document.body.innerHTML = html;
  });

  it('should have h1 with name', () => {
    const h1 = document.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toContain('ALEISTER');
    expect(h1.textContent).toContain('VAILLANT');
  });

  it('should have data-name attribute on h1', () => {
    const h1 = document.querySelector('h1');
    expect(h1.hasAttribute('data-name')).toBe(true);
  });

  it('should have 2 project cards', () => {
    const cards = document.querySelectorAll('.project-card');
    expect(cards.length).toBe(2);
  });

  it('should display project cards in order', () => {
    const titles = Array.from(document.querySelectorAll('.project-card-title'))
      .map(el => el.textContent.trim());
    expect(titles).toEqual([
      'Eyes of Maia',
      'A Long Day in Hell'
    ]);
  });

  it('should have subtitles on each card', () => {
    const subtitles = document.querySelectorAll('.project-card-subtitle');
    expect(subtitles.length).toBe(2);
    subtitles.forEach(sub => {
      expect(sub.textContent.trim().length).toBeGreaterThan(0);
    });
  });

  it('should have meta-links section with Resume, GitHub, LinkedIn, Email', () => {
    const metaLinks = document.querySelectorAll('.meta-links a');
    const texts = Array.from(metaLinks).map(a => a.textContent.trim());
    expect(texts).toContain('Resume');
    expect(texts).toContain('GitHub');
    expect(texts).toContain('LinkedIn');
    expect(texts.some(t => t.includes('@vaillant.ai'))).toBe(true);
  });

  it('should have data-email attribute on email link', () => {
    const emailLink = document.querySelector('.meta-links a[data-email]');
    expect(emailLink).toBeTruthy();
  });

  it('project card links should point to project pages', () => {
    const links = Array.from(document.querySelectorAll('.project-card'))
      .map(a => a.getAttribute('href'));
    expect(links).toContain('/projects/eye-of-maia/');
    expect(links).toContain('/projects/7drl/');
  });
});
