#!/bin/bash

# HTMLDocs 零构建开发工作流程
# 直接从源码运行，无需预先构建

set -e  # 遇到错误时退出

echo "🚀 HTMLDocs 零构建开发模式"
echo "================================"
echo

# 确保在正确的目录
if [[ ! -f "pnpm-workspace.yaml" ]]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

# 确保安装了 tsx
if ! command -v tsx &> /dev/null; then
    echo "📦 安装 tsx (TypeScript 运行器)..."
    npm install -g tsx
    echo
fi

# 构建依赖的包（仅一次性需要）
echo "🔧 检查并构建依赖包..."
cd packages/react 
if [[ ! -d dist ]]; then
    echo "  📦 构建 @htmldocs/react..."
    pnpm build
fi

cd ../render
if [[ ! -d dist ]]; then
    echo "  📦 构建 @htmldocs/render..." 
    pnpm build
fi

cd ../htmldocs
echo

echo "🌟 启动零构建开发服务器..."
echo "  📁 模板目录: ../../apps/examples/documents"
echo "  🌐 预览地址: http://localhost:3000 (或下一个可用端口)"
echo "  🔥 热重载: 模板文件修改后自动刷新"
echo "  📝 编辑文件: apps/examples/documents/templates/*.tsx"
echo
echo "按 Ctrl+C 停止服务器"
echo "================================"
echo

# 直接运行 TypeScript 源码
tsx src/cli/index.ts dev --dir ../../apps/examples/documents