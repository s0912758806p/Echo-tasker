# Echo-tasker

Echo-tasker is an automation tool designed to keep your GitHub repository active. It automatically generates empty commits or meaningless SCSS file changes and commits them, maintaining activity history on your repository.

## Features

- Smart scheduling: Automatically runs 5-13 times per day between 08:30-23:30 TW time
- Generates CSS classes with timestamps and random styling properties
- Creates empty commits when needed
- Supports branch management (create, list, cleanup)
- Can be triggered manually through GitHub Actions

## Setup Guide

1. Create a secret named `MYSELF_PAT_TOKEN` in your GitHub repository (Settings > Secrets > Actions)
2. Ensure the token has appropriate permissions (requires repo access)
3. The workflow will run automatically according to schedule

## Prerequisites

- Node.js 18 or higher
- TypeScript

## Installation

```bash
git clone https://github.com/yourusername/Echo-tasker.git
cd Echo-tasker
npm install
```

## Project Structure

```
├── .github/workflows/      # GitHub Actions workflow files
│   ├── echo-auto-scheduler.yml  # Schedules runs throughout the day
│   └── auto-deploy.yml     # Performs the actual commits
├── script/                 # TypeScript scripts
│   ├── generate-useless-scss.ts  # Generates random SCSS classes
│   ├── cleanup-useless-scss.ts   # Cleans up generated SCSS files
│   ├── manage-branches.ts        # Branch management utilities
│   ├── cleanup-branches.ts       # Branch cleanup functionality
│   └── branch-utilities.ts       # Shared branch utilities
└── src/                    # Source directory
    └── styles/             # Generated SCSS files
```

## Available Commands

```bash
# Build TypeScript files
npm run build

# Generate SCSS manually
npm run generate

# Cleanup SCSS files
npm run cleanup

# Branch management
npm run branches           # Run branch management functions
npm run list-branches      # List all branches
npm run list-tags          # List all tags
npm run branch-cleanup     # Clean up old branches
npm run clean-branches     # Alternative branch cleanup
```

## Customization

You can customize this tool by:

- Modifying schedule patterns in `.github/workflows/echo-auto-scheduler.yml`
- Adjusting `script/generate-useless-scss.ts` to generate different content
- Changing commit messages in `auto-deploy.yml`

## Workflow Strategy

The tool implements a two-part workflow:

- `echo-auto-scheduler.yml` runs once daily and schedules 5-13 random runs for the day
- `auto-deploy.yml` performs the actual commits, either empty ones or with SCSS changes

## Manual Execution

You can manually trigger the workflow from the Actions tab in your GitHub repository.

## License

MIT License © Gorman

## Author

Gorman
