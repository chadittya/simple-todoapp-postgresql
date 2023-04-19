"use client";

import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type tasks = {
  id: number;
  task: string;
  completed: boolean;
};

const UpdateModal = ({ task }: { task: tasks }) => {
  const [modalOpen, SetModalOpen] = useState(false);

  const [newTask, setNewTask] = useState(task.task);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/tasks/${task.id}`, {
      task: newTask,
    });
    router.refresh();
    SetModalOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate(e);
    }
  };

  return (
    <div>
      <button
        onClick={() => SetModalOpen(!modalOpen)}
        className="btn btn-info btn-sm"
      >
        Edit Task
      </button>
      <div className={modalOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box relative">
          <label
            onClick={() => SetModalOpen(!modalOpen)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="form-control w-full">
            <form onSubmit={handleUpdate}>
              <label className="label">
                <span className="label-text">Edit Task</span>
              </label>
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-info">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
