# Echo-tasker

Echo-tasker is an automation tool designed to keep your GitHub repository active. It automatically generates meaningless SCSS file changes and commits them, maintaining activity history on your repository.

## Features

- Runs automatically 3 times per day (0:00, 8:00, 16:00 UTC)
- Generates CSS classes with timestamps
- Automatically creates new branches for each update
- Automatically tags each version
- Merges changes back to the main branch
- Can be triggered manually

## Setup Guide

1. Create a secret named `BOT_PAT_TOKEN` in your GitHub repository (Settings > Secrets > Actions)
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

## Customization

You can customize this tool by:
- Modifying schedule times in `.github/workflows/auto-deploy.yml`
- Adjusting `script/generate-useless-scss.ts` to generate different content
- Changing branch and tag naming patterns in the workflow file

## Branch and Tag Strategy

The tool implements the following strategy:
- For each run, a new branch is created with a timestamp (e.g., `auto-update-20231110-123045`)
- Changes are committed to this branch
- A version tag is applied (e.g., `v20231110-123045`)
- The branch is then merged back to the main branch

## Manual Execution

You can manually trigger the workflow from the Actions tab in your GitHub repository.

## Development

```bash
# Build TypeScript files
npm run build

# Generate SCSS manually
npm run generate

# Cleanup SCSS files
npm run cleanup
```

## License

MIT License © Gorman
