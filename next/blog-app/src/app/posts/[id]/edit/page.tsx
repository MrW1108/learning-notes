/**
 * 文章编辑页
 *
 * 学习要点:
 *   - 把 updatePost server action 用 .bind 把 id 预绑死
 *   - 通过 prisma findUnique + include tags 读取初始数据
 */
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/PostForm";
import { updatePost } from "@/app/actions/posts";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (Number.isNaN(postId)) notFound();

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { tags: true },
  });
  if (!post) notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">编辑文章</h1>
      <PostForm
        action={action}
        submitText="保存修改"
        initial={{
          title: post.title,
          content: post.content,
          tags: post.tags.map((t) => t.name).join(", "),
          published: post.published,
        }}
      />
    </div>
  );
}
