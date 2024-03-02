from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import pytz
from typing import List
from sqlalchemy import desc

from app import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    firstname = db.Column(db.String(50),nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    phone = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(30), nullable=False)
    delivery_address = db.Column(db.String(255), nullable=False)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password: str):
        self.password = generate_password_hash(password)

    def check_password(self, password: str):
        return check_password_hash(self.password, password)
    
    @classmethod
    def find_by_id(cls, _id: int) -> "Users":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_username(cls, username: str) -> "Users":
        return cls.query.filter_by(username=username).first()
    
    @classmethod
    def find_by_email(cls, email: str) -> "Users":
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def get_all_users(cls) -> List["Users"]:
        return cls.query.all()


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    title = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255))
    description = db.Column(db.String(500),nullable=False)
    price = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String(100), nullable= False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))
    
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def get_all_products(cls) -> List["Products"]:
        return cls.query.order_by(desc(cls.id)).all()

    @classmethod
    def find_by_id(cls, _id: int) -> "Products":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_userid(cls, _userid: int) -> "Products":
        return cls.query.filter_by(user_id=_userid).all()


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    message = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Comments":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_userid(cls, _userid: int) -> "Comments":
        return cls.query.filter_by(user_id=_userid).first()


class Notifications(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id: int) -> "Notifications":
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_product_id(cls, _product_id: int) -> "Notifications":
        return cls.query.filter_by(product_id=_product_id).first()


class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    payment_status = db.Column(db.String(40), nullable=False, default="PENDING")
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id", name="fk_cart_order"), nullable=True)
    total_price = db.Column(db.Float, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("users.id", name="fk_customer_order"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))
    
    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_by_id(cls, _id: int) -> "Orders":
        return cls.query.filter_by(id=_id).first()

class Carts(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("users.id", name="fk_customer_cart"), nullable=False)
    status = db.Column(db.String(30), default="ACTIVE")
    created_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_by_id(cls, _id: int) -> "Carts":
        return cls.query.filter_by(id=_id).first()

class CartItems(db.Model):
    id = db.Column(db.Integer, primary_key=True, index=True)
    cart_id = db.Column(db.Integer, db.ForeignKey("carts.id", name="fk_cart_cart_item"), nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id", name="fk_product_cart_item"), nullable=False)
    qty = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow().replace(tzinfo=pytz.UTC))


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_by_id(cls, _id: int) -> "CartItems":
        return cls.query.filter_by(id=_id).first()