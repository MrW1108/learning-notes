/**
 * Route Handler — REST 风格接口示例
 *
 * 学习要点:
 *   - app/api/xxx/route.ts 文件导出 GET/POST/PUT/... 函数即定义路由
 *   - NextResponse.json 返回 JSON
 *   - 这里演示分页查询: /api/posts?page=1&pageSize=10
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const pageSize = Math.min(50, Number(url.searchParams.get("pageSize") ?? 10));
  const tag = url.searchParams.get("tag") ?? undefined;

  const where = {
    published: true,
    ...(tag ? { tags: { some: { name: tag } } } : {}),
  };

  const [items, total] = await prisma.$transaction([
    prisma.post.findMany({
      where,
      include: {
        author: { select: { name: true } },
        tags: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({
    items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}
