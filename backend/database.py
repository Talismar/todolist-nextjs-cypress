from .entities import Task
from faker import Faker

faker = Faker()

def generateDefaultTasks():
  tasks: list[Task] = [];

  for index in range(10):
    tasks.append(Task(index, faker.text()));
  
  return tasks;


tasks: list[Task] = [];

if (len(tasks) == 0):
  tasks.extend(generateDefaultTasks())