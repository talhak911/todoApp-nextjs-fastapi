from sqlmodel import create_engine
from sqlmodel import SQLModel
import os
connection =os.getenv("POSTGRES_URL")
engine = create_engine(connection,connect_args={"sslmode": "require"})

def create_tables():
    try:
        SQLModel.metadata.create_all(engine)
    except Exception as e:  # Handle potential errors during table creation
        print(f"Error creating tables: {e}")