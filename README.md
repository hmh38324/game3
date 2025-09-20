# 利群对对碰游戏3

这是一个基于Cloudflare Pages + Workers + D1/KV的对对碰游戏项目。

## 项目结构

```
game3/
├── index.html              # 主游戏页面
├── people.json            # 用户数据
├── pic/                   # 游戏图片资源
├── card_backgrounds/      # 卡片背景图片
├── split_images/          # 分割后的图片
├── worker/                # Cloudflare Worker 后端
│   ├── src/
│   │   └── index.ts       # Worker 主代码
│   ├── package.json       # Node.js 依赖
│   ├── wrangler.toml      # Worker 配置
│   └── schema.sql         # D1 数据库结构
└── README.md              # 说明文档
```

## 部署步骤

### 1. 部署 Cloudflare Worker

```bash
cd worker
npm install
```

#### 创建 D1 数据库
```bash
npm run d1:create
# 复制返回的数据库ID，更新 wrangler.toml 中的 database_id
```

#### 创建 KV 命名空间
```bash
npm run kv:create
# 复制返回的命名空间ID，更新 wrangler.toml 中的 id
```

#### 初始化数据库
```bash
npm run d1:migrate
```

#### 部署 Worker
```bash
npm run deploy
```

### 2. 部署静态资源到 Cloudflare Pages

1. 将整个 `game3` 目录上传到 Cloudflare Pages
2. 设置构建命令：留空（纯静态文件）
3. 设置输出目录：`/`（根目录）
4. 绑定自定义域名（如 `game3.biboran.top`）

### 3. 更新配置

部署完成后，需要更新以下配置：

1. **Worker API 地址**：在 `index.html` 中更新 `WORKER_BASE_URL`
2. **允许的域名**：在 `worker/wrangler.toml` 中更新 `ALLOWED_ORIGINS`

## 功能特性

- 🎮 对对碰游戏逻辑
- 👥 用户登录验证
- 🏆 实时排行榜
- ⏱️ 计时和步数统计
- 🔒 尝试次数限制（每人最多3次）
- 📊 管理员后台
- 📱 响应式设计

## API 接口

- `GET /leaderboard` - 获取排行榜
- `GET /attempts?userId=xxx` - 获取用户尝试次数
- `POST /begin` - 开始一次尝试
- `POST /submit` - 提交成绩
- `POST /admin/clear` - 管理员清空数据
- `POST /admin/edit` - 管理员编辑用户

## 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Cloudflare Workers
- **数据库**: Cloudflare D1 (SQLite)
- **缓存**: Cloudflare KV
- **部署**: Cloudflare Pages

## 注意事项

1. 确保所有图片资源路径正确
2. 用户数据在 `people.json` 中维护
3. 管理员密码在 Worker 代码中设置
4. 建议定期备份 D1 数据库数据