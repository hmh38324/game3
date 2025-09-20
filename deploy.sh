#!/bin/bash

# Game3 部署脚本
echo "🎯 开始部署利群对对碰游戏3..."

# 检查是否在正确的目录
if [ ! -f "worker/package.json" ]; then
    echo "❌ 错误：请在game3根目录下运行此脚本"
    exit 1
fi

# 进入worker目录
cd worker

echo "📦 安装依赖..."
npm install

echo "🗄️ 创建D1数据库..."
echo "请复制返回的数据库ID，然后更新wrangler.toml中的database_id"
npm run d1:create

echo "💾 创建KV命名空间..."
echo "请复制返回的命名空间ID，然后更新wrangler.toml中的id"
npm run kv:create

echo "📋 初始化数据库结构..."
npm run d1:migrate

echo "🚀 部署Worker..."
npm run deploy

echo "✅ Worker部署完成！"
echo ""
echo "📝 接下来的步骤："
echo "1. 更新wrangler.toml中的database_id和KV id"
echo "2. 重新运行: npm run deploy"
echo "3. 将整个game3目录部署到Cloudflare Pages"
echo "4. 绑定自定义域名"
echo "5. 更新index.html中的WORKER_BASE_URL"
echo "6. 更新wrangler.toml中的ALLOWED_ORIGINS"
echo ""
echo "🎮 游戏3部署完成！"
