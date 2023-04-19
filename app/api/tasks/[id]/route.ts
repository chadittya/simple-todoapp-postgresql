import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { tasks } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: tasks = await request.json();
  const tasks = await prisma.tasks.update({
    where: {
      id: Number(params.id),
    },
    data: {
      task: body.task,
      completed: body.completed,
    },
  });
  return NextResponse.json(tasks, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const tasks = await prisma.tasks.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(tasks, { status: 200 });
};
