import json
from flask import Flask, make_response, request
from flask_cors import CORS
from database import DatabaseService
import pandas as pd
from datetime import datetime

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
    print(f"Created all instances")


@app.route('/videos', methods=['GET'])
def get_all_videos():
    try:
        return make_response(database_service.get_all_data())
    except Exception as ex:
        return make_response({
            "error": str(ex)
        })


@app.route("/stats", methods=['GET'])
def get_stats():
    videos = database_service.get_all_data()

    if not videos:
        return make_response([])

    all_data = pd.DataFrame(videos)
    all_data['avg_likes_comments_views_per_day'] = (all_data['Likes'] + all_data['Comments'] + all_data['Views']) / (
            datetime.now().date() - pd.to_datetime(all_data["PublishedAt"]).dt.date).dt.days
    all_data = all_data.sort_values(by=['avg_likes_comments_views_per_day'], ascending=False)
    response = make_response(all_data.head(100).to_json(orient='records'))
    response.headers['Content-Type'] = 'application/json'

    return response


@app.route("/video", methods=['POST'])
def add_new_video():
    try:
        if request.is_json and (data := request.get_json()):
            return make_response(database_service.add_data(data))
        return make_response({
            "response": "Missing body"
        })
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 400)


@app.route("/video", methods=['PUT'])
def update_video():
    try:
        if request.is_json and (data := request.get_json()):
            return make_response(database_service.update_video(data))
        return make_response({
            "response": "Missing body"
        })
    except Exception as ex:
        return make_response({
            "error": str(ex)
        }, 400)


@app.route('/video/<keyword>', methods=['GET'])
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
