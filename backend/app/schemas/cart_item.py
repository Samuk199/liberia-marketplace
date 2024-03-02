from app import ma
from marshmallow import fields
from app.models import CartItems


class CartItemsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = CartItems
        dumb_only = ("id",)
        load_instance = True

class CreateCartItemsSchema(ma.SQLAlchemyAutoSchema):
    product_id = fields.Int()
    qty = fields.Int()
    price = fields.Float()
    title = fields.Str(required=True)
    image_url = fields.Str(required=True)