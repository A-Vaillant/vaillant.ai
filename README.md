# vaillant.ai

Personal portfolio site with a retro CRT aesthetic. Very cute.

## Resume

To update your resume:
1. Replace `resume.pdf` with your actual resume PDF
2. Tests will fail if the file is missing (fail-fast by design)
3. The link appears on the main page alongside LinkedIn and GitHub

## Development

Install dependencies:
```bash
npm install
```

Run tests:
```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

Lint:
```bash
npm run lint
```

Validate everything:
```bash
npm run validate      # Lint + tests
```

## CI/CD

GitHub Actions runs on every push:
- ✅ Lints code
- ✅ Runs comprehensive tests
- ✅ Validates resume.pdf exists
- ✅ Checks resume link in HTML

## Identity Switching

Add `?a=2` to the URL to switch between Aleister and Alice Vaillant.

## Future Ideas

- **Tailored Resume Generator**: Paste in a job description and auto-generate a tailored resume using your existing info
