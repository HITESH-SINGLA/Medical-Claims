import MySQLdb

def get_database(username, password):
    conn = MySQLdb.connect(
        host="aditya1024.mysql.pythonanywhere-services.com",
        user=username,
        passwd=password,
        db="aditya1024$dep_2023_t17"
    )
    return conn