import json
from flask import Flask, make_response, request
from flask_cors import CORS

from database import DatabaseService
from neuralNet import NeuralNet

app = Flask(__name__)
CORS(app)

database_service = None
neural_net = None


def create_instances():
    global database_service

    with open('appsettings.json') as configurationFile:
        configuration = json.load(configurationFile)
        database_configuration = configuration['Database']

    database_service = DatabaseService(database_configuration)
    neural_net = NeuralNet(database_service.db)
    print(f"Created all instances")


@app.route('/videos', methods=['GET', 'POST', 'PUT'])
def get_all():
    try:
        if request.method == 'GET':
            response = make_response(database_service.get_all_data())
            print("A")
            return response
        elif request.method == 'POST':
            if request.is_json and (data := request.get_json()):
                return make_response(database_service.add_data(data))
            return make_response({
                "response": "Missing body"
            })
        elif request.method == "PUT":
            if request.is_json and (data := request.get_json()):
                return make_response(database_service.update_video(data))
            return make_response({
                "response": "Missing body"
            })
        return make_response({
            "response": "Unrecognised method"
        })
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 400)


@app.route("/stats", methods=['GET'])
def get_stats():
    return make_response({
        "response": "test"
    })


@app.route('/videos/<keyword>')
def predict_view_count(title, like_count, comment_count):

    return 100


@app.route("/predict", methods=['GET'])
def get_prediction():
    title = request.json['title']
    like_count = request.json['like_count']
    comment_count = request.json['comment_count']
    if like_count is None or like_count is None or comment_count is None:
        return make_response({"response": "Missing aguments"}, 402)

    predicted_views = predict_view_count(title, like_count, comment_count)
    return make_response({'predicted_views': predicted_views})


@app.route('/video/<keyword>')
def get_by_keyword(keyword):
    try:
        return make_response(database_service.get_by_keyword(keyword))
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 400)


@app.route('/keywords')
def get_keywords():
    try:
        return make_response(database_service.get_keywords())
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 400)


if __name__ == "__main__":
    create_instances()
    app.run()
