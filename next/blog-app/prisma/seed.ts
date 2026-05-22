/**
 * Prisma Seed 脚本
 * 运行: pnpm prisma:seed  /  npm run prisma:seed
 *
 * 学习要点:
 *   1. 使用 upsert 让 seed 可重复执行 (idempotent)
 *   2. 演示嵌套写入 (nested write) 创建 Post 时同时连接/创建 Tag
 *   3. 演示事务: prisma.$transaction([...])
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始 seed...");

  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      avatarUrl: "https://i.pravatar.cc/100?u=alice",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
      avatarUrl: "https://i.pravatar.cc/100?u=bob",
    },
  });

  // 预置标签
  const tagNames = ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "React"];
  await prisma.$transaction(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  // 创建示例文章 + 关联标签 (嵌套写入)
  await prisma.post.upsert({
    where: { slug: "hello-nextjs" },
    update: {},
    create: {
      title: "Hello, Next.js + Prisma",
      slug: "hello-nextjs",
      content:
        "这是第一篇示例文章。Next.js 的 App Router 配合 Prisma 体验非常顺滑——服务端组件直接 `await prisma.post.findMany()`，无需手写 API。",
      published: true,
      authorId: alice.id,
      tags: {
        connect: [{ name: "Next.js" }, { name: "Prisma" }],
      },
      comments: {
        create: [
          { content: "写得不错！", authorId: bob.id },
          { content: "学到了，感谢分享。", authorId: bob.id },
        ],
      },
    },
  });

  await prisma.post.upsert({
    where: { slug: "prisma-relations" },
    update: {},
    create: {
      title: "理解 Prisma 中的关系",
      slug: "prisma-relations",
      content:
        "1-1 / 1-N / N-N 这三种关系在 Prisma 中如何表达？本文带你理解显式 vs 隐式多对多的差别。",
      published: true,
      authorId: bob.id,
      tags: {
        connect: [{ name: "Prisma" }, { name: "PostgreSQL" }],
      },
    },
  });

  await prisma.post.upsert({
    where: { slug: "draft-post" },
    update: {},
    create: {
      title: "(草稿) 我还没写完",
      slug: "draft-post",
      content: "TODO...",
      published: false,
      authorId: alice.id,
    },
  });

  console.log("✅ Seed 完成");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
