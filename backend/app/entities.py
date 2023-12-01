from dataclasses import dataclass, field
from typing import TypedDict

from .enums import StatusEnum


class TaskDictTypes(TypedDict):
    id: int
    name: str
    status: str


@dataclass
class Task:
    id: int
    name: str
    status: StatusEnum = field(default=StatusEnum.DOING)

    def toDict(self) -> TaskDictTypes:
        return {"id": self.id, "name": self.name, "status": self.status.value}
