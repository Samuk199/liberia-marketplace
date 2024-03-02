from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_restful import Resource
from app.models import Users
from app.schemas.user import UserSchema, UserUpdateSchema, UserLoginSchema, UserCreateSchema
from app.Lib.auth import auth

user_schema = UserSchema()

class UserRegister(Resource):
    def post(self):
        user_data = UserCreateSchema().load(request.get_json())

        if Users.find_by_username(user_data["username"]):
            return {"message": "A user with that username already exists."}, 400

        if Users.find_by_email(user_data["email"]):
            return {"message": "A user with that email already exists."}, 400
        
        user_data["role"] = user_data["role"].lower().strip()
        user = Users(**user_data)
        user.set_password(user_data["password"].strip())
        user.save_to_db()

        return {"message": "User created successfully."}, 201

class UserLogin(Resource):
    def post(self):
        user_data = UserLoginSchema().load(request.get_json(), partial=("id",))

        user = Users.find_by_username(user_data["username"])
        if not user:
            user = Users.find_by_email(user_data["username"])
        if user and user.check_password(user_data["password"]):
            data = {
                "id": user.id,
                "role": user.role
            }
            access_token = create_access_token(identity=data, fresh=True)
            refresh_token = create_refresh_token(user.id)
            
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": {
                    "name": f"{user.firstname} {user.lastname}",
                    "id": user.id,
                    "email": user.email,
                    "phone": user.phone,
                    "role": user.role
                }
            }, 200

        return {"message": "Invalid credentials"}, 401

class UserDetailsResource(Resource):
    def get(self, user_id: int):
        user = Users.find_by_id(user_id)
        if not user:
            return {"message": "User not found"}, 404
        return user_schema.dump(user), 200

class UserDetailsResources(Resource):
    @auth.login_required(role="admin")
    def get(self):
        users = Users.get_all_users()
        return [user_schema.dump(user) for user in users], 200

class UserPasswordUpdateResource(Resource):
    @auth.login_required
    def put(self):
        user_data = user_schema.load(request.get_json())
        user = None
        if auth.current_user()["sub"]["role"].lower() != "admin":
            user = Users.query.filter_by(id=auth.current_user()['sub']['id'], email=user_data.email).first()
        else:
            user = Users.find_by_email(user_data.email)
        if user:
            user.set_password(user_data.password)
            user.save_to_db()
        else:
            return {"message": "User not found"}, 404

        return user_schema.dump(user), 200
    
class UpdateUserDatailsResource(Resource):
    @auth.login_required
    def put(self, user_id: int):
        update_schema = UserUpdateSchema()
        user_data = update_schema.load(request.get_json())
        if auth.current_user['sub']['id'] != user_id:
            return "unauthorized", 401
        user = Users.find_by_id(user_id)
        if user:
            user.firstname = user_data["firstname"]
            user.lastname = user_data["lastname"]
            user.save_to_db()
        else:
            return {"message": "User not found"}, 404

        return user_schema.dump(user), 200
            
        


class UserDeleteResource(Resource):
    def delete(self, user_id: int):
        user = Users.find_by_id(user_id)

        if not user:
            return {"message": "User not found"}, 404

        user.delete_from_db()
        return {"message": "User deleted successfully"}