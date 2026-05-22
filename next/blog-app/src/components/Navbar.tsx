import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          📝 Blog Learning
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            首页
          </Link>
          <Link href="/tags" className="text-slate-600 hover:text-slate-900">
            标签
          </Link>
          <Link href="/posts/new" className="btn-primary">
            写文章
          </Link>
        </div>
      </nav>
    </header>
  );
}
