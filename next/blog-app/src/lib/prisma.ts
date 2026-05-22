/**
 * Prisma Client 单例
 *
 * 为什么需要单例?
 *   开发模式下 Next.js 会热重载, 每次重载若都 `new PrismaClient()` 会导致
 *   "Too many connections" 错误。把实例挂在 globalThis 上就能复用。
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
