from flask import Flask
from flask_cors import CORS, cross_origin
from application.endpoints.root import rootoriginal
#from application.endpoints.messages import messages
from application.controllers.controllers import *
from celery import Celery
from flask import Blueprint, jsonify, request
import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
app.register_blueprint(rootoriginal)
#app.register_blueprint(messages)

def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config['CELERY_RESULT_BACKEND'],
        broker=app.config['CELERY_BROKER_URL']
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery



celery = make_celery(app)
@celery.task()
def send_data(data):
    for j in data:
        print("Sending data to API:")
        print(j)
        time.sleep(6)   
    print("Finished")     

@app.route('/messages', methods=['POST'])
def send_messages():
    if request.method == 'POST':
        data = request.json
        if data is not None:
            parsed_json = parse_data(data)
            send_data(parsed_json)
            return jsonify({'message': "file"})
        else:
            return jsonify({'message': "Not valid data"})





if __name__ == '__main__':
    print('starting local development server...')
    app.run()


