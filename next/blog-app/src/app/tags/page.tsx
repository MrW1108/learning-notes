/**
 * 标签页 - 演示聚合查询
 * Prisma 通过 _count 关键字直接拿到关联数量
 */
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { posts: { _count: "desc" } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">所有标签</h1>
      <div className="flex flex-wrap gap-3">
        {tags.length === 0 && <p className="text-slate-500">还没有标签</p>}
        {tags.map((t) => (
          <Link
            key={t.id}
            href={`/?tag=${encodeURIComponent(t.name)}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 shadow-sm hover:border-primary hover:text-primary"
          >
            #{t.name}
            <span className="ml-2 text-xs text-slate-400">{t._count.posts}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
