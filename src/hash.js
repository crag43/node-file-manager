import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function calculateHash(currentDir, filePath) {
  const fullPath = path.resolve(currentDir, filePath);
  const hash = crypto.createHash('sha256');
  try {
    const stream = fs.createReadStream(fullPath);
    stream.on('error', () => console.log('Operation failed'));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      console.log(hash.digest('hex'));
    });
  } catch {
    console.log('Operation failed');
  }
}
