from pydantic import BaseModel
from .enums import StatusEnum


class TaskRequestCreateSchema(BaseModel):
    name: str

class TaskRequestPartialUpdateSchema(BaseModel):
    status: StatusEnum
    
class TaskSchema(BaseModel):
    id: int
    name: str
    status: StatusEnum