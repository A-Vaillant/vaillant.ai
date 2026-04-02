import { describe, it, expect } from 'vitest';
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
