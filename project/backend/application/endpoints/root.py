from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin

rootoriginal = Blueprint("rootoriginal",__name__)

@rootoriginal.route('/', methods=['GET'])
@cross_origin()
def root():
    return jsonify({'msg' : 'Try POSTing to the /sms endpoint with an numbers json'})
