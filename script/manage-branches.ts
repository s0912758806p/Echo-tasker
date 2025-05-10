#!/usr/bin/env ts-node

import { BranchUtilities } from './branch-utilities';

/**
 * Branch management CLI tool
 */
async function main() {
  const command = process.argv[2] || 'help';
  
  switch (command) {
    case 'list-branches':
      const branches = BranchUtilities.listAutoBranches();
      console.log('Auto-generated branches:');
      branches.forEach(branch => console.log(`- ${branch}`));
      console.log(`Total: ${branches.length} branches`);
      break;
      
    case 'list-tags':
      const tags = BranchUtilities.listAutoTags();
      console.log('Auto-generated tags:');
      tags.forEach(tag => console.log(`- ${tag}`));
      console.log(`Total: ${tags.length} tags`);
      break;
      
    case 'cleanup':
      const keepCount = process.argv[3] ? parseInt(process.argv[3], 10) : 5;
      console.log(`Cleaning up branches, keeping ${keepCount} most recent...`);
      BranchUtilities.cleanupOldBranches(keepCount);
      console.log('Cleanup completed.');
      break;
      
    case 'create-branch':
      const branchName = BranchUtilities.generateBranchName();
      console.log(`Generated branch name: ${branchName}`);
      console.log('To create this branch, run:');
      console.log(`git checkout -b ${branchName}`);
      break;
      
    case 'create-tag':
      const tagName = BranchUtilities.generateTagName();
      console.log(`Generated tag name: ${tagName}`);
      console.log('To create this tag, run:');
      console.log(`git tag -a ${tagName} -m "Auto-generated tag"`);
      break;
      
    case 'help':
    default:
      console.log('Branch Management CLI');
      console.log('====================');
      console.log('Available commands:');
      console.log('  list-branches     - List all auto-generated branches');
      console.log('  list-tags         - List all auto-generated tags');
      console.log('  cleanup [count]   - Clean up old branches, keeping [count] most recent');
      console.log('  create-branch     - Generate a new branch name');
      console.log('  create-tag        - Generate a new tag name');
      console.log('  help              - Show this help message');
      break;
  }
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
}); 