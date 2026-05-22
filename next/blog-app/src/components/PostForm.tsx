"use client";

/**
 * 客户端组件 — 文章表单
 *
 * 学习要点:
 *   - 使用 React 19 的 useActionState 把 Server Action 接进 form
 *   - useFormStatus 用来在提交期间显示 loading 状态
 *   - 仅这一小段需要 "use client", 其他页面继续保持服务端渲染
 */
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { PostFormState } from "@/app/actions/posts";

type Props = {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  initial?: {
    title?: string;
    content?: string;
    tags?: string;
    published?: boolean;
  };
  submitText?: string;
};

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
      {pending ? "提交中..." : text}
    </button>
  );
}

export default function PostForm({ action, initial, submitText = "发布" }: Props) {
  const [state, formAction] = useActionState<PostFormState, FormData>(action, {});

  return (
    <form action={formAction} className="card space-y-4">
      <div>
        <label className="label" htmlFor="title">
          标题
        </label>
        <input
          id="title"
          name="title"
          defaultValue={initial?.title}
          className="input"
          placeholder="今天学了什么..."
        />
        {state.fieldErrors?.title && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.title[0]}</p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="content">
          内容
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={initial?.content}
          className="input font-mono"
          placeholder="支持 Markdown 文本..."
        />
        {state.fieldErrors?.content && (
          <p className="mt-1 text-xs text-red-600">{state.fieldErrors.content[0]}</p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="tags">
          标签 (用逗号分隔)
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={initial?.tags}
          className="input"
          placeholder="Next.js, Prisma"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4"
        />
        立即发布
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex justify-end">
        <SubmitButton text={submitText} />
      </div>
    </form>
  );
}
