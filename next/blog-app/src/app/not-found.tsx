import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card text-center">
      <h1 className="text-2xl font-bold">404 — 页面不存在</h1>
      <p className="mt-2 text-slate-500">你访问的页面找不到了</p>
      <Link href="/" className="btn-primary mt-4">
        回首页
      </Link>
    </div>
  );
}
