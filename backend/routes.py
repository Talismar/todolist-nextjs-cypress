from fastapi import APIRouter
from .database import tasks
from .entities import Task
from .schemas import TaskSchema, TaskRequestCreateSchema, TaskRequestPartialUpdateSchema

router = APIRouter(tags=["Task"])

@router.get("/api/task", response_model=list[TaskSchema])
def task_list():
    print("List")
    return [task.toDict() for task in tasks]

@router.post("/api/task", response_model=TaskSchema, status_code=201)
def task_create(data: TaskRequestCreateSchema):
    task = Task(len(tasks) + 1, data.name)
    tasks.append(task)
    return task.toDict()


@router.patch("/api/task/{id}", response_model=TaskSchema, status_code=200)
def task_update_status(id: int, data: TaskRequestPartialUpdateSchema):
    task: Task | None = None

    for iterator_task in tasks:
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

    for iterator_task in tasks:
        if iterator_task.id == id:
            task = iterator_task
        
    if task is None:
        raise HTTPException(detail="Tarefa não encontrada!", status_code=404)

    tasks.remove(task)
    
    return Response(status_code=204)