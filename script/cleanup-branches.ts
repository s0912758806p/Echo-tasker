import { execSync } from 'child_process';

/**
 * 清理舊的自動生成分支
 * 用法: ts-node script/cleanup-branches.ts [keepCount]
 * keepCount: 要保留的最新分支數量 (默認: 5)
 */

const keepCount = process.argv[2] ? parseInt(process.argv[2], 10) : 5;

// 獲取所有自動生成的分支
console.log(`正在清理舊的自動生成分支，保留最新的 ${keepCount} 個...`);

try {
  // 1. 獲取所有遠程分支
  console.log('獲取所有遠程分支...');
  execSync('git fetch --all', { stdio: 'inherit' });
  
  // 2. 獲取遠程分支列表
  console.log('列出所有自動生成的遠程分支...');
  const remoteBranchOutput = execSync('git branch -r').toString();
  
  // 3. 過濾包含 auto-update 的分支名
  const branches = remoteBranchOutput
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.includes('origin/auto-update-'))
    .map(line => line.replace('origin/', ''));
  
  console.log(`找到 ${branches.length} 個自動生成的遠程分支`);
  
  if (branches.length <= keepCount) {
    console.log(`分支數量 (${branches.length}) 未超過保留數量 (${keepCount})，不需要清理`);
    process.exit(0);
  }
  
  // 4. 按時間戳排序，保留最新的
  branches.sort((a, b) => {
    const timestampA = a.replace('auto-update-', '');
    const timestampB = b.replace('auto-update-', '');
    return timestampB.localeCompare(timestampA);
  });
  
  // 5. 保留最新的 keepCount 個分支
  const branchesToKeep = branches.slice(0, keepCount);
  const branchesToDelete = branches.slice(keepCount);
  
  console.log(`\n將保留這些分支:`);
  branchesToKeep.forEach(branch => console.log(`- ${branch}`));
  
  console.log(`\n將刪除這些分支:`);
  branchesToDelete.forEach(branch => console.log(`- ${branch}`));
  
  // 6. 刪除本地和遠程分支
  for (const branch of branchesToDelete) {
    try {
      // 刪除本地分支 (如果存在)
      console.log(`\n嘗試刪除本地分支: ${branch}`);
      try {
        execSync(`git branch -D ${branch} 2>/dev/null || true`);
        console.log(`  成功刪除本地分支: ${branch}`);
      } catch (error) {
        console.log(`  本地分支 ${branch} 可能不存在，跳過`);
      }
      
      // 刪除遠程分支
      console.log(`嘗試刪除遠程分支: ${branch}`);
      execSync(`git push origin --delete ${branch}`);
      console.log(`  成功刪除遠程分支: ${branch}`);
    } catch (error) {
      console.error(`  刪除分支 ${branch} 時出錯: ${error}`);
    }
  }
  
  console.log('\n分支清理完成!');
} catch (error) {
  console.error('清理分支時出錯:', error);
  process.exit(1);
} 