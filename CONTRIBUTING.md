# Contributing to Finance Blog

First off, thank you for considering contributing to Finance Blog! It's people like you that make Finance Blog such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the TypeScript styleguide
- Include thoughtfully-worded, well-structured tests
- Document new code
- End all files with a newline

## Development Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `pnpm install`
3. **Make your changes**
4. **Add tests** for your changes
5. **Ensure tests pass**: `pnpm test`
6. **Ensure linting passes**: `pnpm lint`
7. **Commit your changes** using conventional commits
8. **Push to your fork** and submit a pull request

## Styleguides

### Git Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect the meaning of the code
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

Examples:
```
feat: add article search functionality
fix: resolve authentication token expiration issue
docs: update API documentation for articles endpoint
```

### TypeScript Styleguide

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Use async/await instead of callbacks
- Prefer `const` over `let`, avoid `var`

### Testing Styleguide

- Write tests for all new features
- Update tests when changing existing features
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

## Project Structure

```
finance-blog/
├── apps/           # Applications
├── packages/       # Shared packages
├── infrastructure/ # Infrastructure configs
├── docs/          # Documentation
└── .github/       # GitHub configs
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
