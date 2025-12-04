#!/usr/bin/env node

/**
 * Build script to compile resume.json into resume.html
 * Usage: node build-resume.js
 */

import { readFileSync, writeFileSync } from 'fs';

// Read the resume data
const resumeData = JSON.parse(readFileSync('resume.json', 'utf-8'));

// Generate HTML with embedded data
const template = readFileSync('resume.html', 'utf-8');

// Find the resume-data script tag and replace its content
const updatedHTML = template.replace(
  /<script type="application\/json" id="resume-data">[\s\S]*?<\/script>/,
  `<script type="application/json" id="resume-data">
${JSON.stringify(resumeData, null, 2)}
    </script>`
);

// Write the updated HTML
writeFileSync('resume.html', updatedHTML);

console.log('✓ Resume compiled successfully');
console.log('  resume.json → resume.html');
