from flask import Flask, jsonify
from marshmallow import ValidationError
from flask_restful import Api
from app import app
from app.resources.user import UserRegister, UserLogin, UserDetailsResource, UpdateUserDatailsResource, UserDetailsResources, UserPasswordUpdateResource, UserDeleteResource
from app.resources.product import ProductUpdateResource, ProductDeleteResource, ProductsResource, ProductResource, ProductSellerResource
from app.resources.comment import CommentResource
from app.resources.image import ImageResource, ImageDetailResource
from app.resources.cart import AddCartItem, RemoveCartItem, ProceedToOrder, CartsDetail


api = Api(app)

api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/login")
api.add_resource(ImageResource, "/upload_image")
api.add_resource(ImageDetailResource, "/img/<string:name>")
api.add_resource(UserDetailsResource,"/users/<int:user_id>")
api.add_resource(UserDetailsResources,"/users/")
api.add_resource(UpdateUserDatailsResource,"/users/<int:user_id>")
api.add_resource(UserPasswordUpdateResource, "/update-password")
api.add_resource(UserDeleteResource, "/users/<int:user_id>")
api.add_resource(ProductsResource, "/products/")
api.add_resource(ProductResource, "/products/")
api.add_resource(ProductSellerResource, "/products/me")
api.add_resource(ProductUpdateResource, "/products/<int:product_id>")
api.add_resource(ProductDeleteResource, "/products/<int:product_id>")
api.add_resource(CommentResource, "/comments")
api.add_resource(AddCartItem, '/carts/items')
api.add_resource(RemoveCartItem, '/carts/items/<int:cart_item_id>')
api.add_resource(ProceedToOrder, '/orders')
api.add_resource(CartsDetail, '/carts')

@app.get('/')
def index():
    return 'This is my project!'