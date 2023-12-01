from fastapi import APIRouter, HTTPException, Response

from .database import tables
from .entities import Task
from .schemas import (TaskRequestCreateSchema, TaskRequestPartialUpdateSchema,
                      TaskSchema)

router = APIRouter(tags=["Task"])


@router.get("/api/task", response_model=list[TaskSchema])
def task_list():
    return [task.toDict() for task in tables["tasks"]]


@router.post("/api/task", response_model=TaskSchema, status_code=201)
def task_create(data: TaskRequestCreateSchema):
    task = Task(len(tables["tasks"]) + 1, data.name)
    tables["tasks"].append(task)
    return task.toDict()


@router.patch("/api/task/{id}", response_model=TaskSchema, status_code=200)
def task_update_status(id: int, data: TaskRequestPartialUpdateSchema):
    task: Task | None = None

    for iterator_task in tables["tasks"]:
        if iterator_task.id == id:
            task = iterator_task

    if task is None:
        raise HTTPException(detail="Tarefa não encontrada!", status_code=404)

    for key, value in data.model_dump().items():
        setattr(task, key, value)

    return task


@router.delete("/api/task/{id}", status_code=204)
def task_delete(id: int):
    task: Task | None = None

    for iterator_task in tables["tasks"]:
        if iterator_task.id == id:
            task = iterator_task

    if task is None:
        raise HTTPException(detail="Tarefa não encontrada!", status_code=404)

    tables["tasks"].remove(task)

    return Response(status_code=204)
