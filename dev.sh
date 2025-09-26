#!/bin/bash

# HTMLDocs 零构建开发工作流程
# 直接从源码运行，无需预先构建

set -e  # 遇到错误时退出

# 获取脚本所在的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

echo "🚀 HTMLDocs 零构建开发模式"
echo "================================"
echo "📁 项目根目录: $PROJECT_ROOT"
echo

# 确保在正确的目录
if [[ ! -f "$PROJECT_ROOT/pnpm-workspace.yaml" ]]; then
    echo "❌ 未找到 pnpm-workspace.yaml，请确保在项目根目录运行此脚本"
    exit 1
fi

# 定义关键路径
PACKAGES_DIR="$PROJECT_ROOT/packages"
REACT_PKG_DIR="$PACKAGES_DIR/react"
RENDER_PKG_DIR="$PACKAGES_DIR/render"
HTMLDOCS_PKG_DIR="$PACKAGES_DIR/htmldocs"
EXAMPLES_DIR="$PROJECT_ROOT/apps/examples"
DOCUMENTS_DIR="$EXAMPLES_DIR/documents"

# 验证关键目录存在
for dir in "$PACKAGES_DIR" "$REACT_PKG_DIR" "$RENDER_PKG_DIR" "$HTMLDOCS_PKG_DIR" "$EXAMPLES_DIR" "$DOCUMENTS_DIR"; do
    if [[ ! -d "$dir" ]]; then
        echo "❌ 目录不存在: $dir"
        exit 1
    fi
done

# 确保安装了 tsx
if ! command -v tsx &> /dev/null; then
    echo "📦 安装 tsx (TypeScript 运行器)..."
    npm install -g tsx
    echo
fi

# 保存当前目录，用于后续恢复
ORIGINAL_DIR="$(pwd)"

# 错误处理函数
cleanup() {
    echo "🧹 清理并返回原始目录..."
    cd "$ORIGINAL_DIR"
}

# 设置退出时的清理
trap cleanup EXIT

# 构建依赖的包（仅一次性需要）
echo "🔧 检查并构建依赖包..."

# 构建 React 包
cd "$REACT_PKG_DIR"
if [[ ! -d dist ]]; then
    echo "  📦 构建 @htmldocs/react..."
    pnpm build
else
    echo "  ✅ @htmldocs/react 已构建"
fi

# 构建 Render 包  
cd "$RENDER_PKG_DIR"
if [[ ! -d dist ]]; then
    echo "  📦 构建 @htmldocs/render..."
    pnpm build
else
    echo "  ✅ @htmldocs/render 已构建"
fi

echo

echo "🌟 启动零构建开发服务器..."
echo "  📁 模板目录: $DOCUMENTS_DIR"
echo "  🌐 预览地址: http://localhost:3000 (或下一个可用端口)"
echo "  🔥 热重载: 模板文件修改后自动刷新"
echo "  📝 编辑文件: $DOCUMENTS_DIR/templates/*.tsx"
echo
echo "按 Ctrl+C 停止服务器"
echo "================================"
echo

# 切换到 htmldocs 包目录以确保路径解析正确
cd "$HTMLDOCS_PKG_DIR"

# 直接运行 TypeScript 源码，指向正确的文档目录
tsx src/cli/index.ts dev --dir "$DOCUMENTS_DIR"