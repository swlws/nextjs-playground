import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 获取当前时间
  const timestamp = new Date().toISOString();
  const { pathname, search } = request.nextUrl;
  const method = request.method;

  // 打印请求日志
  // 格式: [API Request] 时间 | 方法 路径
  console.log(`[API Request] ${timestamp} | ${method} ${pathname}${search}`);

  // 继续处理请求
  const response = NextResponse.next();

  // 可以在响应头中添加 Trace ID，方便追踪
  response.headers.set("x-trace-id", crypto.randomUUID());

  return response;
}

// 配置匹配路径，仅拦截 /api 开头的请求
export const config = {
  matcher: "/api/:path*",
};
