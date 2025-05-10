import { execSync } from 'child_process';
import moment from 'moment';

/**
 * Utility class for handling Git branch and tag operations
 */
export class BranchUtilities {
  /**
   * Generate a timestamp-based branch name
   * @returns string Branch name with timestamp
   */
  static generateBranchName(): string {
    const timestamp = moment().format('YYYYMMDD-HHmmss');
    return `auto-update-${timestamp}`;
  }

  /**
   * Generate a timestamp-based tag name
   * @returns string Tag name with timestamp
   */
  static generateTagName(): string {
    const timestamp = moment().format('YYYYMMDD-HHmmss');
    return `v${timestamp}`;
  }

  /**
   * List all auto-generated branches
   * @returns string[] Array of branch names
   */
  static listAutoBranches(): string[] {
    try {
      const output = execSync('git branch --list "auto-update-*"').toString();
      return output
        .split('\n')
        .map(line => line.trim().replace('* ', ''))
        .filter(Boolean);
    } catch (error) {
      console.error('Error listing branches:', error);
      return [];
    }
  }

  /**
   * List all auto-generated tags
   * @returns string[] Array of tag names
   */
  static listAutoTags(): string[] {
    try {
      const output = execSync('git tag --list "v*"').toString();
      return output
        .split('\n')
        .filter(Boolean);
    } catch (error) {
      console.error('Error listing tags:', error);
      return [];
    }
  }

  /**
   * Clean up old branches (keeps the most recent n branches)
   * @param keepCount Number of recent branches to keep
   */
  static cleanupOldBranches(keepCount = 5): void {
    try {
      const branches = this.listAutoBranches();
      
      // Sort branches by timestamp (newest first)
      branches.sort((a, b) => {
        const timestampA = a.replace('auto-update-', '');
        const timestampB = b.replace('auto-update-', '');
        return timestampB.localeCompare(timestampA);
      });
      
      // Keep the most recent ones and delete the rest
      if (branches.length > keepCount) {
        const branchesToDelete = branches.slice(keepCount);
        
        for (const branch of branchesToDelete) {
          console.log(`Deleting old branch: ${branch}`);
          execSync(`git branch -D ${branch}`);
        }
      }
    } catch (error) {
      console.error('Error cleaning up branches:', error);
    }
  }
} 