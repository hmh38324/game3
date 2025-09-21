# GitHub Gist 每日限制功能配置说明

## 📋 概述
本游戏使用GitHub Gist作为数据存储，实现四款游戏的每日限制功能。每个用户每天只能玩一次游戏（任意一款），使用中国时区计算。

## 🔧 配置步骤

### 1. 创建GitHub Gist

1. 访问 [GitHub Gist](https://gist.github.com/)
2. 点击 "Create a new gist"
3. 文件名填写：`daily_limit.json`
4. 内容填写：
```json
{
  "users": {}
}
```
5. 选择 "Create public gist"
6. 点击 "Create public gist"

### 2. 获取Gist ID

创建完成后，从URL中获取Gist ID：
- URL格式：`https://gist.github.com/用户名/GIST_ID`
- 例如：`https://gist.github.com/username/abc123def456`
- Gist ID就是：`abc123def456`

### 3. 配置游戏

在 `index.html` 文件中找到以下代码：
```javascript
class GistDataManager {
    constructor() {
        // 请替换为你的Gist ID
        this.gistId = 'YOUR_GIST_ID_HERE';
        this.gistUrl = `https://api.github.com/gists/${this.gistId}`;
        this.gameId = 'game3'; // 当前游戏ID
    }
```

将 `YOUR_GIST_ID_HERE` 替换为你的实际Gist ID。

### 4. 配置其他游戏

对于其他三款游戏，需要：
1. 复制相同的 `GistDataManager` 类
2. 修改 `gameId` 为对应的游戏ID：
   - 游戏1：`game1`
   - 游戏2：`game2`
   - 游戏3：`game3`（当前游戏）
   - 游戏4：`game4`
3. 使用相同的Gist ID

## 📊 数据结构

### Gist文件内容格式
```json
{
  "users": {
    "工号_姓名": {
      "lastPlayDate": "2025-01-21",
      "games": {
        "game1": true,
        "game2": true,
        "game3": true,
        "game4": true
      }
    }
  }
}
```

### 字段说明
- `users`: 所有用户的数据
- `工号_姓名`: 用户的唯一标识（工号_姓名格式）
- `lastPlayDate`: 最后游戏日期（YYYY-MM-DD格式，中国时区）
- `games`: 用户今天玩过的游戏记录
  - `game1`, `game2`, `game3`, `game4`: 对应四款游戏
  - `true`: 表示今天已玩过该游戏

## ⚙️ 功能特性

### 1. 每日限制
- 每个用户每天只能玩一次游戏（任意一款）
- 使用中国时区（Asia/Shanghai）计算日期
- 每天00:00后重置限制

### 2. 跨游戏共享
- 四款游戏共享同一个每日限制
- 用户玩过任意一款游戏后，其他游戏也会被限制
- 统一的数据存储和管理

### 3. 错误处理
- 网络错误时允许游戏，避免影响用户体验
- 自动重试机制
- 详细的错误日志

## 🔒 安全考虑

### 1. 数据访问
- Gist为公开访问，任何人都可以查看数据
- 建议不要存储敏感信息
- 仅用于游戏限制功能

### 2. API限制
- GitHub API有速率限制
- 建议合理使用，避免频繁请求
- 可以考虑添加本地缓存

## 🚀 部署说明

### 1. 单游戏部署
1. 配置Gist ID
2. 上传到GitHub Pages
3. 测试功能是否正常

### 2. 多游戏部署
1. 为每款游戏配置相同的Gist ID
2. 设置不同的gameId
3. 分别部署到不同的GitHub Pages

## 🧪 测试验证

### 1. 功能测试
```javascript
// 在浏览器控制台测试
const manager = new GistDataManager();
console.log('今天日期:', manager.getChinaToday());
```

### 2. 限制测试
1. 登录用户A，开始游戏
2. 完成游戏后，再次尝试开始游戏
3. 应该显示"今日已玩过游戏"的提示

### 3. 跨游戏测试
1. 在游戏1中完成游戏
2. 切换到游戏2，尝试开始游戏
3. 应该被限制

## 📝 注意事项

1. **Gist ID配置**：确保所有游戏使用相同的Gist ID
2. **时区设置**：使用中国时区，确保日期计算准确
3. **网络依赖**：需要网络连接才能检查限制
4. **数据备份**：定期备份Gist数据
5. **API限制**：注意GitHub API的速率限制

## 🔄 维护说明

### 1. 数据清理
可以定期清理旧数据，只保留最近几天的记录。

### 2. 监控
建议监控Gist的访问情况，确保功能正常。

### 3. 更新
如需修改限制逻辑，更新所有游戏的代码。

---

*此配置说明适用于所有使用Gist作为数据存储的游戏项目。*
