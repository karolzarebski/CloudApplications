import json
from flask import Flask, make_response, request
from flask_cors import CORS

from database import DatabaseService

app = Flask(__name__)
CORS(app)

database_service = None


def create_instances():
    global database_service

    with open('appsettings.json') as configurationFile:
        configuration = json.load(configurationFile)
        database_configuration = configuration['Database']

    database_service = DatabaseService(database_configuration)

    print(f"Created all instances")


@app.route('/videos', methods=['GET', 'POST', 'PUT'])
def get_all():
    try:
        if request.method == 'GET':
            response = make_response(database_service.get_all_data())
            print("A")
            return response

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
