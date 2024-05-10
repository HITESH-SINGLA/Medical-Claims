
import psycopg2
from psycopg2 import pool

class DatabasePool:
    _connection_pool = None

    @staticmethod
    def initialize_pool(**db_params):
        DatabasePool._connection_pool = pool.SimpleConnectionPool(minconn=1, 
                                                                   maxconn=20,  # Adjust as needed
                                                                   **db_params)

    @staticmethod
    def get_connection():
        return DatabasePool._connection_pool.getconn()

    @staticmethod
    def return_connection(connection):
        DatabasePool._connection_pool.putconn(connection)

    @staticmethod
    def close_all_connections():
        DatabasePool._connection_pool.closeall()

# Initialize the pool when the application starts
DatabasePool.initialize_pool(dbname="medicalclaimsdb", 
                             user="dep1", 
                             password="medicalclaims", 
                             host="localhost",
                             port=5432)  # Replace 5432 with the actual port number if different

















def get_database(username, password):
    try:
        conn = psycopg2.connect(
            dbname="ccllhwkz",
            user="ccllhwkz",
            password="L95oB6NUPitwNQfsCBb4fqhYkFtu1oAS",
            host="abul.db.elephantsql.com"
        )
        return conn
    except psycopg2.Error as e:
        print("Error connecting to PostgreSQL database:", e)
        return None



