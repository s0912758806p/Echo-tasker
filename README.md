# Echo-tasker

A small TypeScript utility for generating SCSS theme tokens and helper classes, with GitHub Actions integration for periodic theme refreshes.

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
git clone https://github.com/<your-account>/Echo-tasker.git
cd Echo-tasker
npm install
```

## Available Commands

```bash
npm run build          # Compile TypeScript
npm run update-theme   # Append a new generated rule to src/styles/theme.scss
npm run branches       # Branch management CLI
npm run list-branches  # List auto-generated branches
npm run list-tags      # List auto-generated tags
npm run branch-cleanup # Clean up old branches (keeps 5 most recent)
npm run clean-branches # Alternative remote branch cleanup
```

## Project Structure

```
.github/workflows/
  echo-auto-deploy.yml         # Scheduled theme refresh workflow
script/
  update-theme.ts              # Generates a randomized SCSS rule + commit message
  manage-branches.ts           # Branch management CLI
  cleanup-branches.ts          # Remote branch cleanup
  branch-utilities.ts          # Shared helpers
src/styles/
  theme.scss                   # Accumulated generated rules
```

## Configuration

1. Create a repository secret named `MYSELF_PAT_TOKEN` with `repo` scope.
2. The deploy workflow runs on a fixed cron schedule and rolls a dice each fire to decide whether to commit a refreshed rule. You can also trigger it manually from the Actions tab.

## License

MIT License © Gorman
