from app import ma
from app.models import Users
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
        load_only = ("password",)
        dumb_only = ("id",)
        load_instance = True

class UserUpdateSchema(ma.SQLAlchemyAutoSchema):
    firstname = fields.Str(required=True)
    lastname = fields.Str(required=True)
    
class UserCreateSchema(ma.SQLAlchemyAutoSchema):
    firstname = fields.Str(required=True)
    lastname = fields.Str(required=True)
    email = fields.Str(required=True)
    phone = fields.Str(required=True)
    password = fields.Str(required=True)
    delivery_address = fields.Str(required=True)
    role = fields.Str(required=True)
    username = fields.Str(required=True)

class UserLoginSchema(ma.SQLAlchemyAutoSchema):
    username = fields.Str(required=True)
    password = fields.Str(required=True)