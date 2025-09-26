#!/usr/bin/env node

/**
 * HTMLDocs 零构建开发工作流程
 * 
 * 直接运行 TypeScript 源码，无需预先构建
 * 使用方法:
 *   node dev-workflow.js dev
 *   node dev-workflow.js dev --dir ./my-templates
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI 源码路径
const cliSourcePath = path.join(__dirname, 'packages/htmldocs/src/cli/index.ts');

// 检查是否安装了 tsx
let useNodeLoader = true;
try {
  const { execSync } = await import('child_process');
  execSync('tsx --version', { stdio: 'ignore' });
  useNodeLoader = false;
} catch (e) {
  // tsx 未安装，使用 Node.js --loader
}

// 构建参数
const args = useNodeLoader 
  ? [
      '--loader', '@esbuild-kit/esm-loader', 
      cliSourcePath,
      ...process.argv.slice(2)
    ]
  : [
      cliSourcePath,
      ...process.argv.slice(2)
    ];

const command = useNodeLoader ? 'node' : 'tsx';

// 设置开发环境变量
const env = {
  ...process.env,
  NODE_ENV: 'development'
};

console.log('🚀 Starting HTMLDocs CLI in development mode...');
console.log('📁 Running source:', cliSourcePath);
console.log('🔧 Command:', command, args.join(' '));

const child = spawn(command, args, {
  stdio: 'inherit',
  env,
  cwd: path.join(__dirname, 'packages/htmldocs')
});

child.on('exit', (code) => {
  process.exit(code || 0);
});