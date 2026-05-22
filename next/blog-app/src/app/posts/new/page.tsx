/**
 * 新建文章页
 * 把 createPost server action 直接作为 form 的 action 使用
 */
import PostForm from "@/components/PostForm";
import { createPost } from "@/app/actions/posts";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">写新文章</h1>
      <PostForm action={createPost} submitText="发布文章" />
    </div>
  );
}
