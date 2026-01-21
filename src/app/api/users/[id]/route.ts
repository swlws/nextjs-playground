import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  
  // 模拟查找用户
  if (id === '1') {
    return NextResponse.json({ id: 1, name: 'Alice' });
  } else if (id === '2') {
    return NextResponse.json({ id: 2, name: 'Bob' });
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  const body = await request.json();
  
  return NextResponse.json({
    message: `User ${id} updated`,
    updatedData: body
  });
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const id = params.id;
  
  return NextResponse.json({
    message: `User ${id} deleted`
  });
}
