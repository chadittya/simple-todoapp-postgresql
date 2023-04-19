"use client";

import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Modal = () => {
  const [modalOpen, SetModalOpen] = useState(false);

  const [newTask, setNewTask] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/tasks", {
      task: newTask,
    });
    setNewTask("");
    router.refresh();
    SetModalOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div>
      <button
        onClick={() => SetModalOpen(!modalOpen)}
        className="btn btn-primary w-full"
      >
        Add New Task
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
            <form onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text">Add New Task</span>
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
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
