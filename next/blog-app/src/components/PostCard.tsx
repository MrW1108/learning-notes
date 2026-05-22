import Link from "next/link";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: {
    id: number;
    title: string;
    slug: string;
    content: string;
    published: boolean;
    createdAt: Date;
    author: { name: string; avatarUrl: string | null };
    tags: { id: number; name: string }[];
    _count?: { comments: number };
  };
};

export default function PostCard({ post }: PostCardProps) {
  const excerpt =
    post.content.length > 120 ? post.content.slice(0, 120) + "…" : post.content;

  return (
    <article className="card transition hover:shadow-md">
      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
        <span>{post.author.name}</span>
        <span>·</span>
        <time>{formatDate(post.createdAt)}</time>
        {!post.published && (
          <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-amber-700">
            草稿
          </span>
        )}
      </div>

      <Link
        href={`/posts/${post.id}`}
        className="block text-xl font-semibold text-slate-900 hover:text-primary"
      >
        {post.title}
      </Link>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">{excerpt}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.tags.map((t) => (
          <span key={t.id} className="tag">
            #{t.name}
          </span>
        ))}
        {post._count && (
          <span className="ml-auto text-xs text-slate-500">
            💬 {post._count.comments}
          </span>
        )}
      </div>
    </article>
  );
}
