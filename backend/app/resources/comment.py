from datetime import datetime, timedelta
import json
from flask import request
from flask_jwt_extended import (
    get_jwt,
    get_jwt_identity,
    jwt_required
)
from flask_restful import Resource
from app.schemas.comment import CommentSchema

comment_schema = CommentSchema()

class CommentResource(Resource):
    def post(self):
        comment_data = request.get_json()
        comment = comment_schema.load(comment_data)

        comment.save_to_db()

        return {"message": "Comment created successfully."}, 201