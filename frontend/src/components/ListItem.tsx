import Image from "next/image";
import React from "react";
import trashGray from "../../public/icons/trash-gray-300-sm.svg";
import Checkbox from "./Checkbox";
import { ITask } from "@/@types/task";

type ListItemProps = {
  task: ITask;
  handleDelete(taskId: number): void;
  handleUpdateStatus(taskId: number): void;
};

function ListItem({ task, handleDelete, handleUpdateStatus }: ListItemProps) {
  return (
    <li
      data-task-id={task.id}
      className="grid grid-cols-[auto_1fr_auto] space-x-4 bg-gray-500 p-4 rounded-lg border-[1px] border-gray-400"
    >
      <div className="py-1">
        <Checkbox
          checked={task.status === "DONE"}
          onClick={() => handleUpdateStatus(task.id)}
        />
      </div>

      <p className="text-gray-100">{task.name}</p>
      <Image
        src={trashGray}
        width={17.45}
        height={17.45}
        alt=""
        className="py-1 cursor-pointer"
        onClick={() => handleDelete(task.id)}
      />
    </li>
  );
}

export default ListItem;
