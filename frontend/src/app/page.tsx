"use client";
import { ITask } from "@/@types/task";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ListHeader from "@/components/ListHeader";
import ListItem from "@/components/ListItem";
import ModelConfirmation from "@/components/ModelConfirmation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskName, setTaskName] = useState("");
  const [modalConfigs, setModalConfigs] = useState({
    isOpen: false,
    taskId: 0,
  });
  const totalDone = tasks.filter((task) => task.status === "DONE").length;
  const totalDoing = tasks.filter((task) => task.status === "DOING").length;
  useEffect(() => {
    fetchAllTask();
  }, []);

  async function handleDelete(taskId: number) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/task/${taskId}`
      );

      if (response.status === 204) {
        toast.success("Tarefa removida com sucesso!");
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
        setModalConfigs((prev) => ({ ...prev, isOpen: false }));
      }
    } catch (error) {
      toast.error("Error ao tentar remover está tarefa!");
    }
  }

  async function handleNewTask() {
    if (taskName.trim().length === 0) {
      toast.warn("Informe o nome da tarefa para adicionar!");
    } else {
      try {
        const response = await axios.post("http://localhost:8000/api/task", {
          name: taskName,
        });

        if (response.status === 201) {
          const newTask = response.data;

          toast.success("Nova tarefa cadastrada com sucesso!");

          setTasks((prev) => [...prev, newTask]);
          setTaskName("");
        }
      } catch (error) {
        toast.error("Error ao tentar adicionar uma tarefa!");
      }
    }
  }

  async function fetchAllTask() {
    try {
      const response = await axios.get("http://localhost:8000/api/task");
      setTasks(response.data);

      if (response.status === 200) {
        toast.success("Dados atualizados!");
      }
    } catch (error) {
      toast.error("Error ao tentar buscar os dados!");
    }
  }

  async function handleUpdateStatus(taskId: number) {
    try {
      const task = tasks.find((task) => task.id === taskId);

      if (!task) return;

      const response = await axios.patch(
        `http://localhost:8000/api/task/${taskId}`,
        {
          status: task.status === "DONE" ? "DOING" : "DONE",
        }
      );

      if (response.status === 200) {
        const taskUpdated = response.data;

        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status: taskUpdated.status } : task
          )
        );

        toast.success(`Tarefa atualizada com sucesso!`);
      }
    } catch (error) {
      toast.error("Error ao tentar atualizar está tarefa!");
    }
  }

  return (
    <div className="bg-gray-600 min-h-screen pb-4">
      <div className="bg-gray-700">
        <div className="relative w-[736px] m-auto mb-20">
          <Header />
          <div className="flex gap-2 justify-center absolute -bottom-6 left-0 right-0">
            <Input
              type="text"
              placeholder="Adicione uma nova tarefa"
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Button onClick={handleNewTask}>Criar</Button>
          </div>
        </div>
      </div>

      <main className="flex w-[736px] m-auto flex-col gap-6 items-center justify-between ">
        <ListHeader
          total={tasks.length}
          totalDoing={totalDoing}
          totalDone={totalDone}
        />

        <ul className="space-y-[12px]">
          {tasks.map((item) => (
            <ListItem
              key={item.id}
              task={item}
              handleDelete={(taskId) =>
                setModalConfigs((prev) => ({ isOpen: true, taskId }))
              }
              handleUpdateStatus={handleUpdateStatus}
            />
          ))}
        </ul>
      </main>

      <ModelConfirmation
        label="Tem certeza que deseja deletar está tarefa ?"
        isOpen={modalConfigs.isOpen}
        handleCancel={() =>
          setModalConfigs((prev) => ({ ...prev, isOpen: false }))
        }
        handleConfirm={() => handleDelete(modalConfigs.taskId)}
      />
    </div>
  );
}
