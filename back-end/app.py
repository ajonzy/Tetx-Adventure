# TODO: Add password hashing
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "app.sqlite")

db = SQLAlchemy(app)
ma = Marshmallow(app)

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
    name = db.Column(db.String())
    total_hitpoints = db.Column(db.Integer)
    current_hitpoints = db.Column(db.Integer)
    armor = db.Column(db.Integer)
    attack = db.Column(db.Integer)
    items = db.Column(db.PickleType)
    room = db.Column(db.Integer)

    def __init__(self, user, name, total_hitpoints, current_hitpoints, armor, attack, items, room):
        self.user = user
        self.name = name
        self.total_hitpoints = total_hitpoints
        self.current_hitpoints = current_hitpoints
        self.armor = armor
        self.attack = attack
        self.items = items
        self.room = room


class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "password", "save")


class CharacterSchema(ma.Schema):
    class Meta:
        fields = ("id", "user", "name", "total_hitpoints", "current_hitpoints", "armor", "attack", "items", "room")


user_schema = UserSchema()
users_schema = UserSchema(many=True)

character_schema = CharacterSchema()
characters_schema = CharacterSchema(many=True)

@app.route("/users/add", methods=["POST"])
def add_user():
    if request.content_type == "application/json":
        post_data = request.get_json()
        username = post_data.get("username")
        password = post_data.get("password")
        save = {}

        test_for_user = db.session.query(User.id).filter(User.username == username).first()
        if test_for_user:
            return jsonify("User already exists")
        else:
            record = User(username, password, save)

            db.session.add(record)
            db.session.commit()

            return jsonify("Added user")
    return jsonify("Error adding user")

@app.route("/users/get_all", methods=["GET"])
def get_all_users():
    all_users = db.session.query(User.id, User.username, User.password, User.save).all()
    results = users_schema.dump(all_users)
    return jsonify(results)

@app.route("/users/get/<user>", methods=["GET"])
def get_user(user):
    user = db.session.query(User.id, User.username, User.password, User.save).filter(User.username == user).first()
    return user_schema.jsonify(user)

@app.route("/users/<user>/characters/get_all", methods=["GET"])
def get_all_users_characters(user):
    user = db.session.query(User.id).filter(User.username == user).first()[0]
    all_characters = db.session.query(Character.id, Character.user, Character.name, Character.total_hitpoints, Character.current_hitpoints, Character.armor, Character.attack, Character.items, Character.room).filter(Character.user == user).all()
    results = characters_schema.dump(all_characters)
    return jsonify(results)

@app.route("/users/save/<user>", methods=["PUT"])
def save(user):
    if request.content_type == "application/json":
        put_data = request.get_json()
        save = put_data.get("save")

        user = db.session.query(User).filter(User.username == user).first()
        print(user)

        user.save = save
        db.session.commit()

        return jsonify("User saved")
    return jsonify("Error saving user")

@app.route("/characters/add", methods=["POST"])
def add_character():
    if request.content_type == "application/json":
        post_data = request.get_json()
        user = post_data.get("user")
        name = post_data.get("name")
        total_hitpoints = 100
        current_hitpoints = 100
        armor = 0
        attack = 5
        items = {}
        room = 0

        record = Character(user, name, total_hitpoints, current_hitpoints, armor, attack, items, room)

        db.session.add(record)
        db.session.commit()

        return jsonify("Added character")
    return jsonify("Error adding character")

@app.route("/users/verification", methods=["POST"])
def verify_user():
    if request.content_type == "application/json":
        post_data = request.get_json()
        user_password = post_data.get("password")
        password_hash = db.session.query(User.password).filter(User.username == post_data.get("username")).first()[0]
        if password_hash is None:
            return jsonify("User NOT Verified")
        valid_password = str(user_password) == str(password_hash)
        if valid_password:
            return jsonify("User Verified")
        return jsonify("User NOT Verified")
    return jsonify("Error verifying user")

@app.route("/characters/get_all", methods=["GET"])
def get_all_characters():
    all_characters = db.session.query(Character.id, Character.user, Character.name, Character.total_hitpoints, Character.current_hitpoints, Character.armor, Character.attack, Character.items, Character.room).all()
    results = characters_schema.dump(all_characters)
    return jsonify(results)

@app.route("/characters/get/<character>", methods=["GET"])
def get_character(character):
    character = db.session.query(Character.id, Character.user, Character.name, Character.total_hitpoints, Character.current_hitpoints, Character.armor, Character.attack, Character.items, Character.room).filter(Character.id == character).first()
    return character_schema.jsonify(character)

@app.route("/characters/update/<character>", methods=["PUT"])
def update_character(character):
    if request.content_type == "application/json":
        put_data = request.get_json()
        user = put_data.get("user")
        name = put_data.get("name")
        total_hitpoints = put_data.get("total_hitpoints")
        current_hitpoints = put_data.get("current_hitpoints")
        armor = put_data.get("armor")
        attack = put_data.get("attack")
        items = put_data.get("items")
        room = put_data.get("room")

        character = db.session.query(Character).filter(Character.id == character).first()

        character.user = user
        character.name = name
        character.total_hitpoints = total_hitpoints
        character.current_hitpoints = current_hitpoints
        character.armor = armor
        character.attack = attack
        character.items = items
        character.room = room

        db.session.commit()

        return jsonify("Updated character")
    return jsonify("Error updating character")

if __name__ == "__main__":
    app.run(debug=True)