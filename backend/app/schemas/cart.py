from app import ma
from app.models import CartItems
from marshmallow import fields

class CartSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CartItems
        dumb_only = ("id",)
        load_instance = True

class OrderSchema(ma.SQLAlchemyAutoSchema):
    cart_id = fields.Int()