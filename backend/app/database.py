from typing import TypedDict

from faker import Faker

from .entities import Task

faker = Faker()


class DatabaseTypes(TypedDict):
    tasks: list[Task]


class Database:
    __instance: None = None

    def __init__(self):
        print("Database initialized")

        self.tables: DatabaseTypes = {"tasks": []}

        self.generateDefaultDatas()

    def generateDefaultDatas(self):
        tasks: list[Task] = []

        for index in range(10):
            tasks.append(Task(index, faker.text()))

        self.tables["tasks"] = tasks

    def reset_databases(self):
        self.generateDefaultDatas()

    @classmethod
    def instance(cls):
        if cls.__instance is None:
            cls.__instance = cls()
        return cls.__instance


database = Database()
tables = database.tables
