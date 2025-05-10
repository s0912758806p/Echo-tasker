import fs from 'fs-extra';
import moment from 'moment';

const filePath = 'src/styles/useless.scss';

// Ensure directory exists
fs.ensureDirSync('src/styles');

// Backup instead of direct deletion
const backupPath = `src/styles/useless-backup-${moment().format('YYYYMMDD-HHmmss')}.scss`;

// Check if file exists
if (fs.existsSync(filePath)) {
  // Create a backup
  fs.copySync(filePath, backupPath);
  console.log(`Backup created: ${backupPath}`);
  
  // Clear file content but keep the file itself
  fs.writeFileSync(filePath, '');
  console.log(`Cleared useless.scss content at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
} else {
  // If file doesn't exist, create an empty one
  fs.writeFileSync(filePath, '');
  console.log(`Created empty useless.scss file at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
}
