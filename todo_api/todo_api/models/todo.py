from sqlmodel import SQLModel,Field
class User(SQLModel,table=True):
    id:int=Field(primary_key=True)
    username:str
class Todo(SQLModel,table=True):
    
    id: int = Field(primary_key=True)
    title: str
    description: str
    is_completed: bool
    user_id: int = Field(foreign_key="user.id")