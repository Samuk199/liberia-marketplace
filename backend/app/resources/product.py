from flask import request
from flask_restful import Resource
from app.Lib.auth import auth
from datetime import datetime

from app.schemas.product import ProductSchema, ProductUpdateSchema, ProductCreateSchema
from app.models import Products
import pytz
from app.models import Users
from sqlalchemy import desc

Product_schema = ProductSchema()


class ProductsResource(Resource):
    def get(self):
        products = Products.get_all_products()
        return [ Product_schema.dump(product) for product in products ], 200

class ProductResource(Resource):
    @auth.login_required(role=["admin", "seller"])
    def post(self):
        product_data = ProductCreateSchema().load(request.get_json())
        product_data["user_id"] = auth.current_user()['sub']['id']
        product = Products(**product_data)
        user = Users.find_by_id(product_data["user_id"])
        if not user:
            return {"message": "Can't create product for user that doesn't exists"}, 400
        product.save_to_db()
        
        return {"message": "Product created successfully"}, 201
    
    
class ProductDetailResource(Resource):
    
    def get(self, product_id: int):
        product = Products.find_by_id(product_id)
        if not product:
            return {"message": "Product not found"}, 404
        return Product_schema.dump(product), 200
    
class ProductUpdateResource(Resource):
    @auth.login_required(role=["admin", "seller"])
    def put(self, product_id: int):
        product_data = ProductUpdateSchema().load(request.get_json())
        product = Products.find_by_id(product_id)
        if auth.current_user()["sub"]["role"] != "admin":
            product = Products.query.filter_by(id=product_id, user_id=auth.current_user()['sub']['id']).first()
        if not product:
            return {"message": "Product not found"}, 404
        
        product.price = product_data.get('price', product.price)
        product.visibility = product_data.get('visibility', product.visibility)
        product.status = product_data.get('status', product.status)
        product.updated_at = datetime.utcnow().replace(tzinfo=pytz.UTC)
        product.save_to_db()
        
        return Product_schema.dump(product), 200
    
    
class ProductDeleteResource(Resource):
    @auth.login_required(role=["admin", "seller"])
    def delete(self, product_id: int):
        product = Products.find_by_id(product_id)
        if auth.current_user()["sub"]["role"] != "admin":
            product = Products.query.filter_by(id=product_id, user_id=auth.current_user()['sub']['id']).first()
        if not product:
            return {"message": "Product not found"}, 404
        product.delete_from_db()
        return {"message": "Product deleted successfully"}


class ProductSellerResource(Resource):
    @auth.login_required(role=["admin", "seller"])
    def get_seller_products(self):
        products = Products.query.filter_by(user_id=auth.current_user.id).order_by(desc(Products.id)).all()
        return [ Product_schema.dump(product) for product in products ], 200