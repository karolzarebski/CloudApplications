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
            if request.args:
                title = request.args.get('title')
                keyword = request.args.get('keyword')
                if keyword is None and title is None:
                    return make_response({
                        "response": "Unrecognised argument"
                    })
                if title is not None:
                    return make_response(database_service.get_by_title(title))
                return make_response(database_service.get_by_keyword(keyword))
            return make_response(database_service.get_all_data())
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


@app.route('/video/<keyword>')
def page(keyword):
    try:
        return make_response(database_service.get_by_keyword(keyword))
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 400)


if __name__ == "__main__":
    create_instances()
    app.run()
