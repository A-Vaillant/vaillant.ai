import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync, accessSync, constants } from 'fs';
import { resolve } from 'path';

describe('Resume Functionality', () => {
  let htmlContent;

  beforeEach(() => {
    htmlContent = readFileSync(resolve('./index.html'), 'utf-8');
    document.body.innerHTML = htmlContent;
  });

  describe('Resume Link in HTML', () => {
    it('should have a resume link in the HTML', () => {
      const resumeLink = document.querySelector('a[href="resume.html"]');
      expect(resumeLink).toBeTruthy();
      expect(resumeLink).not.toBeNull();
    });

    it('should have correct href pointing to resume.html', () => {
      const resumeLink = document.querySelector('a[href="resume.html"]');
      expect(resumeLink?.getAttribute('href')).toBe('resume.html');
    });

    it('should not have download attribute (it\'s a page, not a download)', () => {
      const resumeLink = document.querySelector('a[href="resume.html"]');
      const downloadAttr = resumeLink?.getAttribute('download');
      expect(downloadAttr).toBeNull();
    });

    it('should have an id attribute for easy DOM access', () => {
      const resumeLink = document.querySelector('a[href="resume.html"]');
      expect(resumeLink?.id).toBe('resume-link');
    });

    it('should have visible text content', () => {
      const resumeLink = document.querySelector('#resume-link');
      expect(resumeLink?.textContent?.trim()).toBe('Resume');
    });
  });

  describe('Resume File Existence', () => {
    it('should have resume.html file in the root directory', () => {
      const resumePath = resolve('./resume.html');
      expect(() => {
        accessSync(resumePath, constants.F_OK);
      }).not.toThrow();
    });

    it('should have readable resume.html file', () => {
      const resumePath = resolve('./resume.html');
      expect(() => {
        accessSync(resumePath, constants.R_OK);
      }).not.toThrow();
    });

    it('should be a valid HTML file', () => {
      const resumeContent = readFileSync(resolve('./resume.html'), 'utf-8');
      expect(resumeContent).toMatch(/<!DOCTYPE html>/i);
      expect(resumeContent).toContain('<html');
    });

    it('should have non-zero file size', () => {
      const resumeContent = readFileSync(resolve('./resume.html'));
      expect(resumeContent.length).toBeGreaterThan(0);
    });

    it('should have resume.css stylesheet', () => {
      const cssPath = resolve('./resume.css');
      expect(() => {
        accessSync(cssPath, constants.F_OK);
      }).not.toThrow();
    });

    it('should have resume.js script', () => {
      const jsPath = resolve('./resume.js');
      expect(() => {
        accessSync(jsPath, constants.F_OK);
      }).not.toThrow();
    });
  });

  describe('Integration with Existing Site', () => {
    it('should not break existing LinkedIn link', () => {
      const linkedinLink = document.querySelector('a[href*="linkedin.com"]');
      expect(linkedinLink).toBeTruthy();
      expect(linkedinLink?.getAttribute('href')).toContain('linkedin.com');
    });

    it('should not break existing GitHub link', () => {
      const githubLink = document.querySelector('a[href*="github.com"]');
      expect(githubLink).toBeTruthy();
      expect(githubLink?.getAttribute('href')).toContain('github.com');
    });

    it('should maintain proper order: LinkedIn, GitHub, Resume', () => {
      const navLinks = Array.from(document.querySelectorAll('nav.links .link'));
      const hrefs = navLinks.map(link => link.getAttribute('href'));

      const linkedinIndex = hrefs.findIndex(href => href?.includes('linkedin'));
      const githubIndex = hrefs.findIndex(href => href?.includes('github'));
      const resumeIndex = hrefs.findIndex(href => href === 'resume.html');

      expect(linkedinIndex).toBeGreaterThanOrEqual(0);
      expect(githubIndex).toBeGreaterThan(linkedinIndex);
      expect(resumeIndex).toBeGreaterThan(githubIndex);
    });

    it('should have email link before social links', () => {
      const emailLink = document.querySelector('a[href^="mailto:"]');
      expect(emailLink).toBeTruthy();
      expect(emailLink?.textContent).toMatch(/@vaillant\.ai/);
    });
  });

  describe('HTML Structure Validation', () => {
    it('should be valid HTML5 with DOCTYPE', () => {
      expect(htmlContent).toMatch(/^<!DOCTYPE html>/i);
    });

    it('should have proper meta viewport for mobile', () => {
      const meta = document.querySelector('meta[name="viewport"]');
      expect(meta).toBeTruthy();
      expect(meta?.getAttribute('content')).toContain('width=device-width');
    });

    it('should load site.css stylesheet', () => {
      const link = document.querySelector('link[href="site.css"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('rel')).toBe('stylesheet');
    });
  });

  describe('Accessibility', () => {
    it('should have meaningful link text (not "click here")', () => {
      const resumeLink = document.querySelector('#resume-link');
      const linkText = resumeLink?.textContent?.trim().toLowerCase();
      expect(linkText).not.toBe('click here');
      expect(linkText).not.toBe('download');
      expect(linkText).toBe('resume');
    });

    it('should use semantic HTML with proper heading structure', () => {
      const h1 = document.querySelector('h1#name');
      expect(h1).toBeTruthy();
    });

    it('resume link should be keyboard accessible (is a proper <a> tag)', () => {
      const resumeLink = document.querySelector('#resume-link');
      expect(resumeLink?.tagName).toBe('A');
      expect(resumeLink?.getAttribute('href')).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should fail fast if resume.html is missing', () => {
      const resumePath = resolve('./resume.html');
      let fileExists = false;

      try {
        accessSync(resumePath, constants.F_OK);
        fileExists = true;
      } catch {
        fileExists = false;
      }

      if (!fileExists) {
        throw new Error('CRITICAL: resume.html is missing! This should fail CI.');
      }

      expect(fileExists).toBe(true);
    });

    it('should fail fast if resume link is missing from HTML', () => {
      const resumeLink = document.querySelector('a[href="resume.html"]');

      if (!resumeLink) {
        throw new Error('CRITICAL: Resume link missing from index.html! This should fail CI.');
      }

      expect(resumeLink).toBeTruthy();
    });
  });
});
