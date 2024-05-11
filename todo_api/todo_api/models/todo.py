from sqlmodel import SQLModel,Field

class User(SQLModel,table=True):
    id:int=Field(primary_key=True)
    username:str =Field(min_length=3)

class Todo(SQLModel,table=True):
    
    id: int = Field(primary_key=True)
    title: str
    description: str
    is_completed: bool
    user_id: int = Field(foreign_key="user.id")
    added_by:str

class TodoUpdate(SQLModel):
    status: bool
    todo: Todo