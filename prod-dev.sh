#!/bin/bash

# HTMLDocs 生产环境快速启动脚本
# 直接使用预编译的包，无需等待构建

set -e  # 遇到错误时退出

# 获取脚本所在的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

echo "🚀 HTMLDocs 生产环境快速启动"
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

# 检查预编译产物是否存在
echo "🔍 检查预编译产物..."
missing_builds=0

for pkg_dir in "$REACT_PKG_DIR" "$RENDER_PKG_DIR" "$HTMLDOCS_PKG_DIR"; do
    pkg_name=$(basename "$pkg_dir")
    if [[ ! -d "$pkg_dir/dist" ]]; then
        echo "❌ 缺少预编译产物: packages/$pkg_name/dist/"
        echo "   请先运行 ./build-all.sh 进行预编译"
        ((missing_builds++))
    else
        echo "✅ packages/$pkg_name/dist/ 存在"
    fi
done

if [[ $missing_builds -gt 0 ]]; then
    echo
    echo "💡 解决方案："
    echo "  1. 运行 './build-all.sh' 进行预编译"
    echo "  2. 或者使用 './dev.sh' 进行开发模式启动（需要等待编译）"
    exit 1
fi

# 检查是否安装了依赖
if [[ ! -d "$PROJECT_ROOT/node_modules" ]]; then
    echo "📦 安装项目依赖..."
    pnpm install
    echo
fi

# 确保安装了 Node.js 运行器
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请安装 Node.js"
    exit 1
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

echo
echo "🌟 启动生产环境开发服务器（使用预编译包）..."
echo "  📁 模板目录: $DOCUMENTS_DIR"
echo "  🌐 预览地址: http://localhost:3000 (或下一个可用端口)"
echo "  🔥 热重载: 模板文件修改后自动刷新"
echo "  📝 编辑文件: $DOCUMENTS_DIR/templates/*.tsx"
echo "  ⚡ 快速启动: 使用预编译包，无需等待构建"
echo
echo "按 Ctrl+C 停止服务器"
echo "================================"
echo

# 切换到 htmldocs 包目录
cd "$HTMLDOCS_PKG_DIR"

# 使用预编译的 JavaScript 版本
if [[ -f "dist/cli/index.mjs" ]]; then
    node dist/cli/index.mjs dev --dir "$DOCUMENTS_DIR"
elif [[ -f "dist/cli/index.js" ]]; then
    node dist/cli/index.js dev --dir "$DOCUMENTS_DIR"
elif [[ -f "dist/index.js" ]]; then
    node dist/index.js dev --dir "$DOCUMENTS_DIR"
else
    echo "❌ 未找到预编译的 CLI 入口文件"
    echo "💡 请检查 $HTMLDOCS_PKG_DIR/dist/ 目录结构"
    exit 1
fi