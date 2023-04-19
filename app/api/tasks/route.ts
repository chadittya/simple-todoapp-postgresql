import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { tasks } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body: tasks = await request.json();
  const tasks = await prisma.tasks.create({
    data: {
      task: body.task,
    },
  });
  return NextResponse.json(tasks, { status: 201 });
};
