from flask_sqlalchemy import SQLAlchemy
from flask import Flask

app = Flask(__name__)

db_config = {
    'user': 'aditya1024',
    'password': 'newpassword123',
    'host': 'aditya1024.mysql.pythonanywhere-services.com',
    'database': 'aditya1024$dep_2023_t17',
}

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{user}:{password}@{host}/{database}".format(
    user=db_config['user'],
    password=db_config['password'],
    host=db_config['host'],
    database=db_config['database']
)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Login(db.Model):
    __tablename__ = "login"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255))


def print_login_table():
    login_emails = Login.query.all()
    print("Emails in the 'login' table:")
    for row in login_emails:
        print(row.email)


if __name__ == "__main__":
    # Initialize Flask app context
    with app.app_context():
        # Initialize database
        db.init_app(app)
        # Print login table
        print_login_table()
