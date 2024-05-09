from dotenv import load_dotenv
load_dotenv()
from todo_api.config.db import create_tables,engine
import uvicorn
from fastapi import FastAPI,HTTPException
from sqlmodel import Session,select
from todo_api.models.todo import User,Todo
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/get_users")
def get_users():
    with Session(engine) as session:
        try:
            statement=select(User)
            users=session.exec(statement).all()
            return users
        except Exception as e:
            return {"message":f"Failed to fetch users ${e}"}
        
@app.post("/add_user")
def add_user(user:User):
    with Session(engine) as session:
        try:
            session.add(user)
            session.commit()
            session.refresh(user)
            return {"message":"Added user successfully"}
        except Exception as e:
            return {"message":f"Failed to add user ${e}"}

@app.get("/get_todos")
def get_todos():
     with Session(engine) as session:
        try:
            statement=select(Todo)
            todos=session.exec(statement).all()
            return todos
        except Exception as e:
            return {"message":f"Failed to fetch todos ${e}"}

@app.post("/add_todo")
def add_todo(todo:Todo):
    with Session(engine) as session:
        try:
            user = session.get(User, todo.user_id)
            if not user:
                raise HTTPException(status_code=404, detail="user not found")
            session.add(todo)
            session.commit()
            session.refresh(todo)
            return {"message":"Added Todo successfully"}

        except Exception as e:
            return {"message":f"Failed to add todo ${e}"}
        
@app.delete("/remove_todo/{id}")
def remove_todo(id: int):
    with Session(engine) as session:
        try:
            todo = session.get(Todo, id)
            if not todo:
                raise HTTPException(status_code=404, detail="Todo not found")
            session.delete(todo)
            session.commit()
            return {"message": "Todo deleted successfully"}
        except Exception as e:
            return {"message": f"Failed to delete todo {e}"}

@app.put("/update_todo/{id}")
def update_todo(updated_todo: Todo):
    with Session(engine) as session:
        try:
            todo = session.get(Todo,updated_todo.id)
            if not todo:
                raise HTTPException(status_code=404, detail="Todo not found")
            todo.title = updated_todo.title
            todo.description = updated_todo.description
            todo.is_completed = updated_todo.is_completed
            session.commit()
            return {"message": "Todo updated successfully"}
        except Exception as e:
            return {"message": f"Failed to update todo {e}"}
def start():
    create_tables()
    uvicorn.run("todo_api.main:app",reload=True,host="127.0.0.1",port=8080)