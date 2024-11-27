import { execSync } from 'child_process';

export function getLastUpdateDate() {
  try {
    const date = execSync('git log -1 --format=%cI').toString().trim();
    return new Date(date).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Failed to get git date:', error);
    return 'Unknown date';
  }
} 