// Game3 配置测试脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 检查Game3配置...\n');

// 检查必要文件
const requiredFiles = [
    'index.html',
    'people.json',
    'worker/package.json',
    'worker/wrangler.toml',
    'worker/schema.sql',
    'worker/src/index.ts'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - 文件不存在`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('\n❌ 缺少必要文件，请检查项目结构');
    process.exit(1);
}

// 检查HTML中的API地址
const htmlContent = fs.readFileSync('index.html', 'utf8');
if (htmlContent.includes('game3-api.biboran.top')) {
    console.log('✅ HTML中的API地址已更新为game3');
} else {
    console.log('⚠️ HTML中的API地址可能需要更新');
}

// 检查Worker配置
const wranglerContent = fs.readFileSync('worker/wrangler.toml', 'utf8');
if (wranglerContent.includes('game3-worker')) {
    console.log('✅ Worker名称已更新为game3');
} else {
    console.log('⚠️ Worker名称可能需要更新');
}

if (wranglerContent.includes('game3_leaderboard')) {
    console.log('✅ 数据库名称已更新为game3');
} else {
    console.log('⚠️ 数据库名称可能需要更新');
}

if (wranglerContent.includes('placeholder-database-id')) {
    console.log('⚠️ 数据库ID需要替换为真实ID');
}

if (wranglerContent.includes('placeholder-kv-id')) {
    console.log('⚠️ KV命名空间ID需要替换为真实ID');
}

// 检查Worker代码
const workerContent = fs.readFileSync('worker/src/index.ts', 'utf8');
if (workerContent.includes('Game3 Worker API')) {
    console.log('✅ Worker API信息已更新为game3');
} else {
    console.log('⚠️ Worker API信息可能需要更新');
}

console.log('\n🎯 配置检查完成！');
console.log('\n📋 部署清单：');
console.log('1. 运行 ./deploy.sh 创建数据库和KV');
console.log('2. 更新wrangler.toml中的真实ID');
console.log('3. 重新部署Worker');
console.log('4. 部署静态文件到Cloudflare Pages');
console.log('5. 绑定域名并更新CORS设置');


