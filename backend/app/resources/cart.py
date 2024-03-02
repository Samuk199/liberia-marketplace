from flask import request, jsonify
from flask_restful import Resource
from app.models import CartItems, Carts, Orders
from app.schemas.cart_item import CartItemsSchema, CreateCartItemsSchema
from app.schemas.cart import CartSchema, OrderSchema
from app.Lib.auth import auth

cart_item_schema = CartItemsSchema()
cart_schema = CartSchema()

class CartsDetail(Resource):
    @auth.login_required
    def get(self):
        cart = Carts.query.where(Carts.status=="ACTIVE",
                                      Carts.customer_id==auth.current_user()['sub']['id']).first()
        if not cart:
            return jsonify([])
        cart_items = CartItems.query.where(CartItems.cart_id == cart.id).all()
        return jsonify([cart_item_schema.dump(item) for item in cart_items])
        

class AddCartItem(Resource):
    @auth.login_required
    def post(self):
        cart_item_data = request.get_json()
        db_cart = Carts.query.where(Carts.status=="ACTIVE",
                                      Carts.customer_id==auth.current_user()['sub']['id']).first()
        cart = None
        if db_cart:
            cart = db_cart
        else:
            cart = Carts(customer_id=auth.current_user()['sub']['id'])
            cart.save_to_db()
        db_cart_item = CartItems.query.filter_by(image_url=cart_item_data['image_url'],
                                                 title=cart_item_data['title'], price=cart_item_data['price']).first()
        if db_cart_item:
            db_cart_item.qty += cart_item_data.get('qty', 0)
            db_cart_item.save_to_db()
            return {"message": "Cart Item updated successfully."}, 200
        cart_item = CreateCartItemsSchema().load(cart_item_data)
        cart_item['cart_id'] = cart.id
        CartItems(**cart_item).save_to_db()
        return {"message": "Cart Item added successfully."}, 201


class RemoveCartItem(Resource):
    @auth.login_required
    def delete(self, cart_item_id):
        db_cart_item = CartItems.find_by_id(cart_item_id)
        if not db_cart_item:
            return {"message": "Cart Item not found"}, 404
        db_cart_item.delete_from_db()
        return {"message": "Cart Item removed successfully."}, 200

class ProceedToOrder(Resource):
    @auth.login_required
    def post(self):
        db_cart = Carts.query.where(Carts.status=="ACTIVE",
                                      Carts.customer_id==auth.current_user()['sub']['id']).first()
        if not db_cart:
            return {"message": "Bad Request"}, 400
        cart_items = CartItems.query.where(CartItems.cart_id == db_cart.id).all()
        total_price = 0.0
        for item in cart_items:
            total_price += item.qty * item.price
        order = None
        db_order = Orders.query.where(Orders.customer_id==auth.current_user()['sub']['id'], Orders.payment_status=="PENDING").first()
        if db_order:
            order = db_order
            order.total_price = total_price
            order.save_to_db()
        else:
            order = Orders(total_price=total_price, customer_id=db_cart.customer_id, cart_id=db_cart.id)
            order.save_to_db()
        res_data = {
            "payment_status": order.payment_status,
            "id": order.id,
            "total_price": order.total_price
        }
        return res_data, 201
        
        
        