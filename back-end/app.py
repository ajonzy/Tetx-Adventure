from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "app.sqlite")

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True)
    password = db.Column(db.Integer)
    save = db.Column(db.PickleType)

    def __init__(self, username, password, save):
        self.username = username
        self.password = password
        self.save = save

class Character(db.Model):
    __tablename__ = "character"
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, db.ForeignKey('user.id'))
    name = db.Column(db.String(), unique=True)
    total_hitpoints = db.Column(db.Integer)
    current_hitpoints = db.Column(db.Integer)
    armor = db.Column(db.Integer)
    attack = db.Column(db.Integer)
    items = db.Column(db.PickleType)

    def __init__(self, user, name, total_hitpoints, current_hitpoints, armor, attack, items):
        self.user = user
        self.name = name
        self.total_hitpoints = total_hitpoints
        self.current_hitpoints = current_hitpoints
        self.armor = armor
        self.attack = attack
        self.items = items

@app.route("/users/add", methods=["POST"])
def add_user():
    if request.content_type == "application/json":
        post_data = request.get_json()
        username = post_data.get("username")
        password = post_data.get("password")
        save = {}

        record = User(username, password, save)

        db.session.add(record)
        db.session.commit()

        return jsonify("Added user")
    return jsonify("Error adding user")

@app.route("/users/get_all", methods=["GET"])
def get_all_users():
    all_users = db.session.query(User.id, User.username, User.password, User.save).all()
    return jsonify(all_users)

@app.route("/users/get/<user>", methods=["GET"])
def get_user(user):
    user = db.session.query(User.id, User.username, User.password, User.save).filter(User.username == user).first()
    return jsonify(user)

@app.route("/users/save/<user>", methods=["PUT"])
def save(user):
    if request.content_type == "application/json":
        put_data = request.get_json()
        save = put_data.get("save")

        user = db.session.query(User).filter(User.username == user).first()

        user.save = save
        db.session.commit()

        return jsonify("User saved")
    return jsonify("Error saving user")

if __name__ == "__main__":
    app.run(debug=True)