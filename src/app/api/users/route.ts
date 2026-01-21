import { NextResponse } from 'next/server';

// 模拟数据库数据
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newUser = {
      id: users.length + 1,
      name: body.name || 'Anonymous',
    };
    // 在实际应用中，这里会将数据保存到数据库
    // users.push(newUser); // 注意：在 serverless 环境中全局变量不会持久化
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
