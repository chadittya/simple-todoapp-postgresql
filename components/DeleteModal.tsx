"use client";

import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type tasks = {
  id: number;
  task: string;
  completed: boolean;
};

const DeleteModal = ({ task }: { task: tasks }) => {
  const [modalOpen, SetModalOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (taskId: number) => {
    await axios.delete(`/api/tasks/${taskId}`);
    router.refresh();
    SetModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => SetModalOpen(!modalOpen)}
        className="btn btn-error btn-sm"
      >
        Delete
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
            <h3 className="font-semibold text-lg text-slate-400">
              Are you sure want to delete task ?
            </h3>

            <div className="modal-action">
              <button
                onClick={() => SetModalOpen(!modalOpen)}
                type="button"
                className="btn "
              >
                No!
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                type="button"
                className="btn btn-error"
              >
                Yes!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
