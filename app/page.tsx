import DeleteModal from "@/components/DeleteModal";
import Modal from "@/components/Modal";
import SetCompletedButton from "@/components/SetCompletedButton";
import UpdateModal from "@/components/UpdateModal";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTasks = async () => {
  const res = await prisma.tasks.findMany({
    select: {
      id: true,
      task: true,
      completed: true,
    },
  });
  return res;
};

export default async function Home() {
  const tasks = await getTasks();
  // console.log(tasks);

  return (
    <main>
      <div className="mb-5">
        <Modal />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <td>#</td>
            <td>Task</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={task.id}
              className={task.completed ? "line-through text-slate-700" : ""}
            >
              <td>{index + 1}</td>
              <td className="w-full">{task.task}</td>
              <td className="flex flex-row gap-2">
                <SetCompletedButton task={task} />
                <UpdateModal task={task} />
                <DeleteModal task={task} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
