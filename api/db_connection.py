from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func, text
import psycopg2

def get_db_connection(username, password):
    conn = psycopg2.connect(database='dep_2023_t17',
                            user=username,
                            password=password,
                            host = 'localhost',
                            port = 5432)
    return conn
