/**
 * 首页 — 文章列表
 *
 * 学习要点:
 *   - 这是一个 Server Component (默认), 可以直接 await 数据库查询
 *   - 不需要 useEffect / SWR, 不存在 client-side fetch 瀑布流
 *   - `include` 用于 eager-load 关联数据 (作者 / 标签 / 评论数)
 */
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic"; // 关闭静态化, 每次请求都查 DB (学习用)

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(tag ? { tags: { some: { name: tag } } } : {}),
    },
    include: {
      author: { select: { name: true, avatarUrl: true } },
      tags: { select: { id: true, name: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">最新文章</h1>
        {tag ? (
          <p className="mt-2 text-sm text-slate-600">
            按标签筛选：<span className="tag">#{tag}</span>{" "}
            <Link href="/" className="ml-2 text-primary hover:underline">
              清除
            </Link>
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-600">
            学习 Next.js + Prisma + PostgreSQL 的示例项目
          </p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="card text-center text-slate-500">
          还没有文章，
          <Link href="/posts/new" className="text-primary hover:underline">
            写第一篇？
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
