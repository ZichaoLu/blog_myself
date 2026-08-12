# Lucas的博客

Lu Zichao 的个人技术博客，使用 VitePress 构建，记录科研、投资理财、生活与就业。

## 本地开发

需要 Node.js 20 或更高版本，推荐使用 Node.js 22 LTS 与 pnpm 11。

```powershell
pnpm install
pnpm docs:dev
```

开发服务器默认运行在 <http://localhost:5173>。

## 构建与预览

```powershell
pnpm docs:build
pnpm docs:preview
```

构建产物位于 `docs/.vitepress/dist`。推送到 `main` 分支后，GitHub Actions 会自动部署到 GitHub Pages。

评论组件已经预留但默认关闭。完成 [Giscus](https://giscus.app/zh-CN) 配置后，参照 `.env.example` 设置本地环境变量，并在 GitHub Actions Variables 中添加同名变量即可启用。

## 写作

从 [`templates/article-template.md`](templates/article-template.md) 复制文章模板，并放入以下栏目目录之一：

- `docs/research/`
- `docs/finance/`
- `docs/life/`
- `docs/career/`

完整搭建与维护说明见 [`BLOG_SETUP_GUIDE.md`](BLOG_SETUP_GUIDE.md)。

### 通过 Pages CMS 写作

项目根目录的 `.pages.yml` 已配置四个文章栏目。使用方法：

1. 打开 [Pages CMS](https://app.pagescms.org/) 并使用 GitHub 登录。
2. 授权读取和写入 `ZichaoLu/blog_myself` 仓库。
3. 选择科研、投资理财、生活或就业栏目。
4. 通过表单填写标题、摘要、日期、标签和正文。
5. 保存后 Pages CMS 会提交到 `main`，GitHub Actions 自动部署网站。

栏目名称、路径和简介统一维护在 `docs/.vitepress/site.ts`。导航、首页和关于页会自动读取该配置；文章侧边栏则根据各栏目中的 Markdown 文件自动生成。
