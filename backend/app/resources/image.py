from flask_restful import Resource
from flask import request, make_response
from app.Lib.image_helper import upload_image
from app.Lib.auth import auth
import re

class ImageResource(Resource):
    @auth.login_required
    def post(self):
        image_url = ""
        if 'file' not in request.files:
            return {"message": "Image is required"}, 400
        file = request.files['file']
        if re.search(r'\.jpg$', file.filename):
           image_url = upload_image(file, 'jpg')
        elif re.search(r'\.jpeg$', file.filename):
            image_url = upload_image(file, 'jpeg')
        elif re.search(r'\.png$', file.filename):
            image_url = upload_image(file, 'png')
        else:
            return {"message": "the image must be of type jpg or jpeg or png!"}, 400
        return {"image_url": image_url}

class ImageDetailResource(Resource):
    def get(self, name):
        try:
            path = f"C:\\Users\\Uncle Samuka\\Desktop\\Project CSA\\Projects\\backend\\static\\{name}"
            with open(path, "rb") as img:
                image = img.read()
            res = make_response(image)
            if re.search(r'\.jpg$', name):
                res.content_type = 'image/jpeg'
            elif re.search(r'\.jpeg$', name):
                res.content_type = 'image/jpeg'
            elif re.search(r'\.png$', name):
                res.content_type = 'image/png'
            return res
        except Exception as err:
            return f"file not found {err}", 404