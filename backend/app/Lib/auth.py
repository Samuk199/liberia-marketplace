from flask_httpauth import HTTPTokenAuth
from flask_jwt_extended import decode_token

auth = HTTPTokenAuth()


@auth.verify_token
def verify_token(token):
    try:
        data = decode_token(token)
        return data
    except Exception as err:
        print("Enter except", err)
        return False

@auth.get_user_roles
def get_user_roles(user):
    return user['sub']['role']