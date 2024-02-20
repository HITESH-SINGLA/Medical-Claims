import psycopg2
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



