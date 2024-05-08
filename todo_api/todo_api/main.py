from dotenv import load_dotenv
load_dotenv()
from todo_api.config.db import create_tables,engine
import uvicorn
from fastapi import FastAPI
from sqlmodel import Session,select
from todo_api.models.todo import User

app=FastAPI()
@app.get("/get_users")
def get_users():
    with Session(engine) as session:
        
            statement=select(User)
            users=session.exec(statement).all()
            return users
       
        
@app.post("/add_user")
def add_user(user:User):
    with Session(engine) as session:
        try:
            session.add(user)
            session.commit()
            session.refresh(user)
            return {"message":"Added uses successfully"}
        except Exception as e:
            return {"message":f"Failed to add user ${e}"}


def start():
    create_tables()
    uvicorn.run("todo_api.main:app",reload=True,host="127.0.0.1",port=8080)