username = 'aditya1024'
password = 'onepieceisreal'

from database import get_database

conn = get_database(username, password)
curr = conn.cursor()
curr.execute('SELECT * FROM login')
rows = curr.fetchall()
print(*rows)
conn.commit()

curr.close()
conn.close()