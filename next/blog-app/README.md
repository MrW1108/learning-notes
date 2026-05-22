# 📝 Blog Learning · Next.js + Prisma + PostgreSQL

一个用于**循序渐进学习**的全栈博客示例项目，覆盖：

- ✅ Next.js 15 **App Router**（Server Components / Server Actions / Route Handlers / 动态路由）
- ✅ **Prisma 6** ORM（schema、迁移、seed、关系、聚合、事务）
- ✅ **PostgreSQL 16**（用 Docker Compose 一键起服务）
- ✅ TypeScript + Tailwind CSS + Zod 表单校验

---

## 📁 目录结构

```
blog-app/
├── docker-compose.yml          # 本地 PostgreSQL
├── prisma/
│   ├── schema.prisma           # 数据建模 (User / Post / Tag / Comment)
│   └── seed.ts                 # 种子数据
├── src/
│   ├── lib/
│   │   ├── prisma.ts           # Prisma Client 单例
│   │   └── utils.ts            # slugify / formatDate
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── PostCard.tsx
│   │   └── PostForm.tsx        # 客户端表单 (useActionState)
│   └── app/
│       ├── layout.tsx
│       ├── globals.css
│       ├── page.tsx            # 首页 - 文章列表
│       ├── loading.tsx         # 全局 loading
│       ├── not-found.tsx       # 404
│       ├── actions/
│       │   └── posts.ts        # ★ Server Actions: createPost / updatePost / deletePost / addComment
│       ├── posts/
│       │   ├── new/page.tsx    # 新建
│       │   └── [id]/
│       │       ├── page.tsx    # 详情 + 评论
│       │       └── edit/page.tsx
│       ├── tags/page.tsx       # 标签聚合
│       └── api/posts/route.ts  # REST 接口示例
└── ...
```

---

## 🚀 快速开始

### 1. 启动 PostgreSQL（需要本地装 Docker）

```bash
cd next/blog-app
cp .env.example .env
docker compose up -d              # 或 npm run db:up
```

> 不想用 Docker？把 `.env` 中的 `DATABASE_URL` 改成你已有的 PostgreSQL 连接串即可。

### 2. 安装依赖

```bash
npm install
# 或 pnpm i / yarn
```

### 3. 生成数据库表 + 写入种子数据

```bash
npx prisma migrate dev --name init   # 自动生成 SQL 并应用; 生成 Prisma Client
npm run prisma:seed                   # 写入示例用户/文章/标签
```

### 4. 启动

```bash
npm run dev
```

打开 http://localhost:3000 即可。

### 常用脚本

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动 Next.js 开发服务器 |
| `npm run db:up` / `db:down` | 启停本地 Postgres 容器 |
| `npm run prisma:migrate` | 创建/应用数据库迁移 |
| `npm run prisma:seed` | 写入种子数据 |
| `npm run prisma:studio` | 打开可视化数据库管理工具 |
| `npm run prisma:reset` | 重置数据库（开发期特别有用） |

---

## 📚 分阶段学习指南

> 推荐打开本项目，**按下面的顺序边读边改边运行**。每一阶段都对应几个文件，每个文件顶部都有学习要点注释。

### 阶段 1️⃣ 数据建模（Prisma + PostgreSQL）

主文件：`prisma/schema.prisma`

掌握目标：
- `model` / `@id` / `@default(autoincrement())` / `@unique` 等基础注解
- **1 对多** 关系：`User -> Post -> Comment`
- **多对多** 关系：`Post <-> Tag`（隐式关联表 `_PostToTag`）
- `onDelete: Cascade` 级联删除
- `@@index([...])` 建立复合索引

实操：
```bash
npx prisma migrate dev --name init
npx prisma studio   # 打开 http://localhost:5555 浏览数据
```

练习：
1. 给 `User` 加一个 `bio String?` 字段，跑一次 migrate 观察生成的 SQL
2. 把 `Comment` 改造为可嵌套（评论的回复）—— 自关联

---

### 阶段 2️⃣ 在 Server Component 里直接查数据库

主文件：`src/app/page.tsx`、`src/lib/prisma.ts`

掌握目标：
- App Router 默认所有页面都是 **Server Component**，可以直接 `await prisma.xxx()`，**不用写 API**
- `include` 用来 eager-load 关联（`author`、`tags`）
- `_count` 关键字直接拿到关联数量
- 单例 `prisma` 客户端，避免开发期连接爆炸

练习：把首页加上**分页**（用 `take` / `skip`），URL 参数从 `searchParams.page` 取。

---

### 阶段 3️⃣ Server Actions 写入数据

主文件：`src/app/actions/posts.ts`、`src/components/PostForm.tsx`、`src/app/posts/new/page.tsx`

掌握目标：
- `"use server"` 声明 Server Action，可直接作为 `<form action={...}>` 的 action
- React 19 的 `useActionState` + `useFormStatus`
- 用 **Zod** 校验表单
- `revalidatePath()` / `redirect()` 失效缓存并跳转
- 多对多写入：`tags: { connectOrCreate: [...] }`
- 多对多更新：先 `set: []` 清空再 `connectOrCreate`

练习：
1. 加一个 "保存为草稿" 按钮（设置 `published=false` 但不跳转，提示成功）
2. 用 `useOptimistic` 让评论"乐观更新"

---

### 阶段 4️⃣ 动态路由 + 详情页

主文件：`src/app/posts/[id]/page.tsx`、`src/app/posts/[id]/edit/page.tsx`

掌握目标：
- `[id]` 文件夹做动态路由
- Next.js 15 中 `params` 是 `Promise`，需要 `await`
- `notFound()` 触发 404
- `action.bind(null, id)` 把参数预绑到 Server Action

练习：把 `[id]` 换成 `[slug]`，用 `slug` 作为 URL（更 SEO 友好）。

---

### 阶段 5️⃣ Route Handler（REST 接口）

主文件：`src/app/api/posts/route.ts`

掌握目标：
- 文件夹下导出 `GET` / `POST` / `PUT` / `DELETE` 函数即定义路由
- `prisma.$transaction([findMany, count])` 一次拿数据 + 总数
- 怎么访问：浏览器打开 `http://localhost:3000/api/posts?page=1&pageSize=5`

练习：再写 `POST /api/posts`、`PATCH /api/posts/[id]`，配合 `fetch` 做客户端请求。

---

### 阶段 6️⃣ 聚合 / 关联查询

主文件：`src/app/tags/page.tsx`

掌握目标：
- `_count: { select: { posts: true } }`
- `orderBy: { posts: { _count: "desc" } }` —— 按关联数量排序

练习：在首页右侧加一个「热门标签 Top 5」侧边栏。

---

## 🧠 进阶方向

学完上面 6 个阶段后，可以尝试：

1. **接入 Auth**：用 [NextAuth.js v5 (Auth.js)](https://authjs.dev/) 加上邮箱/Google 登录，把 `actions/posts.ts` 里硬编码的"作者"改为当前 session 用户
2. **Markdown 渲染**：内容用 `react-markdown` 渲染，加代码高亮
3. **图片上传**：用 [UploadThing](https://uploadthing.com/) 或对象存储
4. **缓存策略**：换掉 `dynamic = "force-dynamic"`，改用 `unstable_cache` + `revalidateTag`
5. **测试**：用 Vitest 给 server actions 写单测；用 Prisma 的 `__mocks__` 模拟数据库
6. **部署**：Vercel 部署 Next.js + 用 [Neon](https://neon.tech/) / [Supabase](https://supabase.com/) 做托管 Postgres

---

## ❓ 常见问题

**Q：报错 "Can't reach database server"**
A：确认 `docker compose ps` 容器在跑，`.env` 中 `DATABASE_URL` 端口 `5432` 没被占用。

**Q：改了 `schema.prisma` 后 TS 类型没更新**
A：跑 `npx prisma generate`（其实 `migrate dev` 会自动跑一次）。

**Q：开发时频繁热更新报 "too many connections"**
A：检查 `src/lib/prisma.ts` 单例是否被绕过；不要在文件里 `new PrismaClient()`。

**Q：想从 0 重置数据库**
A：`npm run prisma:reset`。

---

Happy hacking! 🚀
