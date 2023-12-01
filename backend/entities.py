from dataclasses import dataclass, field
from .enums import StatusEnum



@dataclass
class Task:
    id: int
    name: str
    status: StatusEnum = field(default=StatusEnum.DOING)

    def toDict(self):
        return {
            "id": self.id,
            "name": self.name,
            "status": self.status.value
        }