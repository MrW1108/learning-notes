"use server";

/**
 * Server Actions — 文章相关
 *
 * 学习要点:
 *   1. "use server" 让函数只在服务端运行, 可以直接被 <form action={...}> 调用
 *   2. revalidatePath/revalidateTag 用来主动失效 Next.js 的缓存
 *   3. 用 zod 做表单输入校验, 避免脏数据进入数据库
 *   4. 多对多: tags 通过 connectOrCreate 实现 "若标签不存在则创建"
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const PostSchema = z.object({
  title: z.string().min(2, "标题至少 2 个字"),
  content: z.string().min(5, "内容至少 5 个字"),
  tags: z.string().optional().default(""),
  published: z.coerce.boolean().optional().default(false),
});

export type PostFormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/** 解析表单中的标签字符串 "next, prisma" -> ["next", "prisma"] */
function parseTags(input: string): string[] {
  return input
    .split(/[,，]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** 创建文章 */
export async function createPost(
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.get("tags") ?? "",
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { title, content, tags, published } = parsed.data;
  const tagNames = parseTags(tags);

  // 这个项目不做完整 auth, 简化为永远使用第一个用户当作者
  const author = await prisma.user.findFirst({ orderBy: { id: "asc" } });
  if (!author) {
    return { error: "数据库里没有用户，请先运行 seed 脚本" };
  }

  // 保证 slug 唯一
  let slug = slugify(title) || `post-${Date.now()}`;
  const exists = await prisma.post.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now()}`;

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      published,
      authorId: author.id,
      tags: {
        connectOrCreate: tagNames.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/tags");
  redirect(`/posts/${post.id}`);
}

/** 更新文章 */
export async function updatePost(
  id: number,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.get("tags") ?? "",
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { title, content, tags, published } = parsed.data;
  const tagNames = parseTags(tags);

  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
      tags: {
        // set: [] 先清空原有关联, 再 connectOrCreate
        set: [],
        connectOrCreate: tagNames.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath(`/posts/${id}`);
  revalidatePath("/tags");
  redirect(`/posts/${id}`);
}

/** 删除文章 (Cascade 会自动删除评论) */
export async function deletePost(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  redirect("/");
}

/** 提交评论 */
export async function addComment(postId: number, formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  if (content.length < 1) return;

  // 简化: 固定使用第二个用户 (Bob) 当评论者; 真实项目应取自 session
  const commenter =
    (await prisma.user.findFirst({ where: { email: "bob@example.com" } })) ??
    (await prisma.user.findFirst({ orderBy: { id: "asc" } }));
  if (!commenter) return;

  await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: commenter.id,
    },
  });

  revalidatePath(`/posts/${postId}`);
}
