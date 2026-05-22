/**
 * 文章详情页 — 动态路由 [id]
 *
 * 学习要点:
 *   - Next.js 15: params 现在是 Promise, 需要 await
 *   - notFound() 触发 404 页
 *   - 直接把 server action 作为表单 action 提交评论
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { addComment, deletePost } from "@/app/actions/posts";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (Number.isNaN(postId)) notFound();

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      tags: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!post) notFound();

  const addCommentBound = addComment.bind(null, post.id);

  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>作者: {post.author.name}</span>
          <span>·</span>
          <time>{formatDate(post.createdAt)}</time>
          {!post.published && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-700">草稿</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Link key={t.id} href={`/?tag=${encodeURIComponent(t.name)}`} className="tag">
              #{t.name}
            </Link>
          ))}
        </div>
      </header>

      <section className="prose max-w-none whitespace-pre-wrap text-base leading-7 text-slate-800">
        {post.content}
      </section>

      <div className="flex items-center gap-2 border-y border-slate-200 py-4">
        <Link href={`/posts/${post.id}/edit`} className="btn-ghost">
          编辑
        </Link>
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <button
            type="submit"
            className="btn-danger"
            // 提示:真实项目应该用 modal 二次确认
          >
            删除
          </button>
        </form>
      </div>

      {/* 评论区 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">评论 ({post.comments.length})</h2>

        <form action={addCommentBound} className="card space-y-3">
          <textarea
            name="content"
            rows={3}
            className="input"
            placeholder="留下你的评论..."
            required
          />
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              提交评论
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {post.comments.map((c) => (
            <div key={c.id} className="card">
              <div className="mb-1 text-xs text-slate-500">
                <span className="font-medium text-slate-700">{c.author.name}</span>
                <span className="mx-1">·</span>
                <time>{formatDate(c.createdAt)}</time>
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-700">{c.content}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
