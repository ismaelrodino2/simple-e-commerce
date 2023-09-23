import prisma from "@/utils/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.url ? new URL(req.url) : new URL("");

  const id: string = searchParams.get("userId")!;

  try {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    return new Response(JSON.stringify({ user }));
  } catch (err) {
    return new Response(JSON.stringify({ name: "error" }));
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        id: body.id,
        stripeId: body.stripeCustomerId,
      },
    });
    return new Response(JSON.stringify({ user }));
  } catch (err) {
    return new Response(JSON.stringify({ user: null }));
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await prisma.user.delete({
      where: {
        id: body.data.id,
      },
    });
    return new Response(JSON.stringify({ user: user }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ user: null }));
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await prisma.user.update({
      where: {
        id: body.data.id,
      },
      data: {
        name: body.data.name,
      },
    });
    return new Response(JSON.stringify({ user: user }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ user: null }));
  } finally {
    await prisma.$disconnect();
  }
}
