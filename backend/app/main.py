import sys
import os
 
current = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(current)
sys.path.append(parent)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.configuration import configuration
from app.database import database
from app.routes import router as task_router

app = FastAPI(title="ToDoList - API", description="Um api para gerenciar tarefas.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["*"],
)

app.include_router(task_router)


@app.post("/api/reset_database/{token}", include_in_schema=False)
def reset_database(token: str):
    if token != configuration.USER_TOKEN_FOR_RESET_DB:
        raise HTTPException(status_code=400)

    database.reset_databases()
