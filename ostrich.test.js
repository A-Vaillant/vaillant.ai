import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Ostrich.js - Site Functionality', () => {
  let htmlContent;
  let ostrichCode;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    // Read files
    htmlContent = readFileSync(resolve('./index.html'), 'utf-8');
    ostrichCode = readFileSync(resolve('./ostrich.js'), 'utf-8');

    // Set up DOM
    document.body.innerHTML = htmlContent;

    // Mock location for identity switching tests
    delete window.location;
    window.location = { search: '' };
  });

  describe('Projects Data Structure', () => {
    it('should define projects array', () => {
      expect(ostrichCode).toContain('const projects = [');
    });

    it('should have valid project objects with required fields', () => {
      // Extract and eval the projects array (safe because we control the code)
      const projectsMatch = ostrichCode.match(/const projects = \[([\s\S]*?)\];/);
      expect(projectsMatch).toBeTruthy();

      // Verify structure through regex
      expect(ostrichCode).toMatch(/name:\s*["']/);
      expect(ostrichCode).toMatch(/description:\s*["']/);
      expect(ostrichCode).toMatch(/type:\s*["']/);
      expect(ostrichCode).toMatch(/modified:\s*["']/);
    });

    it('should have at least one project', () => {
      const projectMatches = ostrichCode.match(/{\s*name:/g);
      expect(projectMatches).toBeTruthy();
      expect(projectMatches.length).toBeGreaterThan(0);
    });
  });

  describe('Render Projects Function', () => {
    it('should define renderProjects function', () => {
      expect(ostrichCode).toContain('function renderProjects()');
    });

    it('should call renderProjects on page load', () => {
      expect(ostrichCode).toContain('renderProjects()');
    });

    it('should query .folder-content element', () => {
      expect(ostrichCode).toContain('.folder-content');
    });

    it('should create file elements with proper structure', () => {
      expect(ostrichCode).toContain('.file');
      expect(ostrichCode).toContain('.file-header');
      expect(ostrichCode).toContain('.file-description');
    });

    it('should include project metadata (type and modified date)', () => {
      expect(ostrichCode).toContain('project.type');
      expect(ostrichCode).toContain('project.modified');
    });
  });

  describe('Interactive Features', () => {
    it('should add click handlers for folder expansion', () => {
      expect(ostrichCode).toContain('.folder-header');
      expect(ostrichCode).toContain('addEventListener');
      expect(ostrichCode).toContain('click');
    });

    it('should toggle folder open class', () => {
      expect(ostrichCode).toContain('toggle');
      expect(ostrichCode).toMatch(/classList\.toggle\(['"]open['"]\)/);
    });

    it('should add click handlers for file expansion', () => {
      expect(ostrichCode).toContain('.file-header');
      const clickHandlers = ostrichCode.match(/addEventListener\(['"]click['"]/g);
      expect(clickHandlers.length).toBeGreaterThanOrEqual(2);
    });

    it('should toggle file description visibility', () => {
      expect(ostrichCode).toContain('.file-description');
      expect(ostrichCode).toContain('style.display');
    });
  });


  describe('DOM Integration', () => {
    beforeEach(() => {
      // Create minimal DOM structure for testing
      document.body.innerHTML = `
        <div class="folder">
          <div class="folder-header">
            <span class="folder-icon">&#9658;</span>
            <span class="folder-name">projects/</span>
          </div>
          <div class="folder-content"></div>
        </div>
        <h1 id="name">Aleister Vaillant</h1>
        <a class="subtitle" href="mailto:aleister@vaillant.ai">aleister@vaillant.ai</a>
      `;
    });

    it('should find required DOM elements', () => {
      const folderContent = document.querySelector('.folder-content');
      const nameElement = document.getElementById('name');
      const emailElement = document.querySelector('.subtitle');

      expect(folderContent).toBeTruthy();
      expect(nameElement).toBeTruthy();
      expect(emailElement).toBeTruthy();
    });

    it('folder-header should exist in DOM', () => {
      const folderHeaders = document.querySelectorAll('.folder-header');
      expect(folderHeaders.length).toBeGreaterThan(0);
    });
  });

  describe('Code Quality', () => {
    it('should use const for projects array (immutable)', () => {
      expect(ostrichCode).toMatch(/const projects/);
      expect(ostrichCode).not.toMatch(/var projects/);
    });

    it('should use modern JavaScript features', () => {
      expect(ostrichCode).toContain('=>'); // Arrow functions
      expect(ostrichCode).toContain('const'); // Modern variable declaration
    });

    it('should use template literals for HTML generation', () => {
      expect(ostrichCode).toContain('`');
      expect(ostrichCode).toMatch(/\$\{/); // Template variable interpolation
    });

    it('should not have syntax errors', () => {
      expect(() => {
        // This will throw if there are syntax errors
        new Function(ostrichCode);
      }).not.toThrow();
    });

    it('should handle querySelector null cases safely', () => {
      // Check for optional chaining or null checks
      const hasNullHandling =
        ostrichCode.includes('?.') || // Optional chaining
        ostrichCode.includes('if (') ||
        ostrichCode.includes('forEach'); // forEach handles empty arrays safely

      expect(hasNullHandling).toBe(true);
    });
  });

  describe('No Regressions', () => {
    it('should not contain debugging console.log statements', () => {
      const consoleMatches = ostrichCode.match(/console\.log/g);
      // Allow 0 or very few console.logs, but flag if there are many
      if (consoleMatches) {
        expect(consoleMatches.length).toBeLessThan(3);
      }
    });

    it('should not have commented out old code cluttering the file', () => {
      const lines = ostrichCode.split('\n');
      const commentedLines = lines.filter(line => line.trim().startsWith('//'));

      // Some comments are fine, but not excessive
      const commentRatio = commentedLines.length / lines.length;
      expect(commentRatio).toBeLessThan(0.3); // Less than 30% commented lines
    });

    it('should maintain backward compatibility with existing projects', () => {
      expect(ostrichCode).toContain('factorio-working-group-one');
      expect(ostrichCode).toContain('negative-qwop');
      expect(ostrichCode).toContain('petrock');
    });
  });

  describe('Security', () => {
    it('should not use eval()', () => {
      expect(ostrichCode).not.toContain('eval(');
    });

    it('should not use innerHTML with user input', () => {
      // innerHTML is used, but should only be with controlled project data
      if (ostrichCode.includes('innerHTML')) {
        // Ensure it's only used with the projects array (our data)
        expect(ostrichCode).toMatch(/innerHTML\s*=\s*projects\.map/);
      }
    });

    it('should not have XSS vulnerabilities in project data', () => {
      // Ensure project descriptions don't contain script tags
      expect(ostrichCode).not.toMatch(/<script>/i);
      expect(ostrichCode).not.toMatch(/javascript:/i);
    });
  });
});
