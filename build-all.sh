#!/bin/bash

# HTMLDocs 预编译脚本
# 编译所有必要的包，供生产环境直接使用

set -e  # 遇到错误时退出

# 获取脚本所在的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

echo "🏗️ HTMLDocs 预编译模式"
echo "================================"
echo "📁 项目根目录: $PROJECT_ROOT"
echo

# 确保在正确的目录
if [[ ! -f "$PROJECT_ROOT/pnpm-workspace.yaml" ]]; then
    echo "❌ 未找到 pnpm-workspace.yaml，请确保在项目根目录运行此脚本"
    exit 1
fi

# 检查是否安装了依赖
if [[ ! -d "$PROJECT_ROOT/node_modules" ]]; then
    echo "📦 安装项目依赖..."
    pnpm install
    echo
fi

# 定义关键路径
PACKAGES_DIR="$PROJECT_ROOT/packages"
REACT_PKG_DIR="$PACKAGES_DIR/react"
RENDER_PKG_DIR="$PACKAGES_DIR/render"
HTMLDOCS_PKG_DIR="$PACKAGES_DIR/htmldocs"

echo "🔧 开始编译所有包..."

# 使用 turbo 进行并行构建（如果可用）
if command -v turbo &> /dev/null; then
    echo "⚡ 使用 Turbo 进行并行构建..."
    pnpm build
else
    echo "📦 依次构建各个包..."
    
    # 构建 React 包
    echo "  🔨 构建 @htmldocs/react..."
    cd "$REACT_PKG_DIR"
    pnpm build
    
    # 构建 Render 包
    echo "  🔨 构建 @htmldocs/render..."
    cd "$RENDER_PKG_DIR"
    pnpm build
    
    # 构建 HTMLDocs 包
    echo "  🔨 构建 @htmldocs/htmldocs..."
    cd "$HTMLDOCS_PKG_DIR"
    pnpm build
    
    cd "$PROJECT_ROOT"
fi

echo
echo "✅ 所有包编译完成！"
echo
echo "📋 编译产物位置："
echo "  📦 @htmldocs/react: $REACT_PKG_DIR/dist/"
echo "  📦 @htmldocs/render: $RENDER_PKG_DIR/dist/"
echo "  📦 @htmldocs/htmldocs: $HTMLDOCS_PKG_DIR/dist/"
echo

# 检查编译产物
echo "🔍 验证编译产物..."
missing_builds=0

for pkg_dir in "$REACT_PKG_DIR" "$RENDER_PKG_DIR" "$HTMLDOCS_PKG_DIR"; do
    pkg_name=$(basename "$pkg_dir")
    if [[ ! -d "$pkg_dir/dist" ]]; then
        echo "❌ 缺少编译产物: packages/$pkg_name/dist/"
        ((missing_builds++))
    else
        file_count=$(find "$pkg_dir/dist" -type f | wc -l)
        echo "✅ packages/$pkg_name/dist/ ($file_count 个文件)"
    fi
done

if [[ $missing_builds -gt 0 ]]; then
    echo
    echo "❌ 编译未完全成功，请检查上述错误信息"
    exit 1
fi

echo
echo "🎉 预编译完成！"
echo "💡 提示："
echo "  1. 运行 'git add packages/*/dist/' 来添加编译产物到版本控制"
echo "  2. 运行 'git commit -m \"Add prebuilt packages\"' 提交编译产物"
echo "  3. 之后克隆项目可以直接使用 ./prod-dev.sh 快速启动"
echo