from app import ma
from marshmallow import fields
from app.models import Products

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Products
        dumb_only = ("id",)
        include_fk = True
        load_instance = True

class ProductCreateSchema(ma.SQLAlchemyAutoSchema):
    title = fields.Str(required=True)
    price = fields.Int()
    description = fields.Str(required=True)
    condition = fields.Str(required=True)
    image_url = fields.Str(required=True)
        
class ProductUpdateSchema(ma.SQLAlchemyAutoSchema):
    price = fields.Int()
