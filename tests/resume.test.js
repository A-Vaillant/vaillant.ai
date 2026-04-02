import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync, accessSync, constants } from 'fs';
import { resolve } from 'path';

describe('Resume Page', () => {
  let html;

  beforeEach(() => {
    html = readFileSync(resolve('./_site/resume.html'), 'utf-8');
  });

  it('should produce resume.html in build output', () => {
    expect(() => accessSync(resolve('./_site/resume.html'), constants.F_OK)).not.toThrow();
  });

  it('should be valid HTML5', () => {
    expect(html).toMatch(/^<!DOCTYPE html>/i);
  });

  it('should load resume.css', () => {
    expect(html).toContain('href="/css/resume.css"');
  });

  it('should load resume.js', () => {
    expect(html).toContain('src="/js/resume.js"');
  });

  it('should embed resume data as JSON', () => {
    expect(html).toContain('id="resume-data"');
    expect(html).toContain('Aleister Vaillant');
    expect(html).toContain('ML/CV Engineer');
  });

  it('should have data-name attribute on resume name element', () => {
    expect(html).toContain('data-name');
  });

  it('should have data-email attribute on resume email element', () => {
    expect(html).toContain('data-email');
  });

  it('should have back link to index', () => {
    document.body.innerHTML = html;
    const backLink = document.querySelector('#back-link');
    expect(backLink).toBeTruthy();
    expect(backLink.getAttribute('href')).toBe('/');
  });

  it('should have resume.css file in output', () => {
    expect(() => accessSync(resolve('./_site/css/resume.css'), constants.F_OK)).not.toThrow();
  });

  it('should have resume.js file in output', () => {
    expect(() => accessSync(resolve('./_site/js/resume.js'), constants.F_OK)).not.toThrow();
  });

  it('should have all resume sections', () => {
    document.body.innerHTML = html;
    expect(document.querySelector('#summary')).toBeTruthy();
    expect(document.querySelector('#experience')).toBeTruthy();
    expect(document.querySelector('#education')).toBeTruthy();
    expect(document.querySelector('#projects')).toBeTruthy();
    expect(document.querySelector('#skills')).toBeTruthy();
  });
});
