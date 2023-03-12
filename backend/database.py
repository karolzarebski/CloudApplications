import csv
import os
import time

import mysql.connector


class DatabaseService:
    def __init__(self, database_configuration):
        database_configuration['host'] = os.getenv("DATABASE_LOCATION")
        self.database_configuration = database_configuration

        self.create_database()
        self.seed_database()

    def seed_database(self):
        if self.get_count() > 1800:
            return

        print("Seeding database")

        with open("data.csv", "r", encoding="utf8") as file:
            reader = csv.reader(file)
            header = next(reader)
            json_format = []
            for row in reader:
                row_json = {}
                for i in range(len(header)):
                    data = row[i]
                    row_json[header[i]] = data
                json_format.append(row_json)

        for item in json_format:
            try:
                self.add_data(item)
            except Exception as ex:
                print(ex)
                print(item)
                return

    def create_database(self):
        for _ in range(10):
            try:
                connection = mysql.connector.connect(**self.database_configuration)
                db_cursor = connection.cursor()

                if connection.is_connected():
                    print("Connected to database")

                db_cursor.execute('''
                    CREATE TABLE IF NOT EXISTS VideoData (
                      Id INT PRIMARY KEY AUTO_INCREMENT,
                      Title TEXT CHARACTER SET utf8mb4 NOT NULL,
                      VideoId VARCHAR(50) CHARACTER SET utf8mb4,
                      PublishedAt DATE NOT NULL,
                      Keyword VARCHAR(255) CHARACTER SET utf8mb4,
                      Likes DOUBLE,
                      Comments DOUBLE,
                      Views DOUBLE
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                ''')

                db_cursor.close()
                connection.close()
                return
            except Exception as ex:
                print(f"Exception occurred while connecting to database: {ex}")
                time.sleep(5)

        print(f"Connection with database failed")

    def get_count(self):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(buffered=True)

        db_cursor.execute('''SELECT COUNT(Id) FROM VideoData''')
        response = db_cursor.fetchone()

        db_cursor.close()
        connection.close()

        return response[0]

    def add_data(self, data):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        if 'Likes' in data and not data['Likes'] == '':
            likes = data['Likes']
        else:
            likes = None

        if 'Comments' in data and not data['Comments'] == '':
            comments = data['Comments']
        else:
            comments = None

        if 'Views' in data and not data['Views'] == '':
            views = data['Views']
        else:
            views = None

        db_cursor.execute('''INSERT INTO VideoData (Title, VideoId, PublishedAt, Keyword, Likes, Comments, Views) 
            VALUES (%s,%s,%s,%s,%s,%s,%s)''', (data['Title'], data['VideoId'] if 'VideoId' in data else None,
                                               data['PublishedAt'] if 'PublishedAt' in data else None,
                                               data['Keyword'] if 'Keyword' in data else None,
                                               likes, comments, views))
        connection.commit()

        db_cursor.execute('''SELECT * FROM VideoData WHERE Id = LAST_INSERT_ID()''')
        latest_entry = db_cursor.fetchone()

        db_cursor.close()
        connection.close()

        return latest_entry

    def get_all_data(self):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute('''SELECT * FROM VideoData''')
        data = db_cursor.fetchall()

        db_cursor.close()
        connection.close()

        return data

    def get_by_id(self, video_id):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute('''SELECT * FROM VideoData WHERE Id = %s''', (video_id,))
        data = db_cursor.fetchone()

        db_cursor.close()
        connection.close()

        return data

    def get_by_title(self, title):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute('''SELECT * FROM VideoData WHERE Title LIKE %s''', (f"%{title.replace(',', ' ')}%",))
        data = db_cursor.fetchall()

        db_cursor.close()
        connection.close()

        return data

    def get_by_keyword(self, keyword):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute('''SELECT * FROM VideoData WHERE Keyword = %s''', (keyword,))
        data = db_cursor.fetchall()

        db_cursor.close()
        connection.close()

        return data

    def update_video(self, data):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute(
            '''UPDATE VideoData SET Title = %s, VideoId = %s, PublishedAt = %s, Keyword = %s, Likes = %s,
                            Comments = %s, Views = %s  WHERE Id = %s''',
            (data['Title'], data['VideoId'] if "VideoId" in data else None,
             data['PublishedAt'] if 'PublishedAt' in data else None, data['Keyword'] if 'Keyword' in data else None,
             data['Likes'] if 'Likes' in data else None, data['Comments'] if 'Comments' in data else None,
             data['Views'] if 'Views' in data else None, data['Id'])
        )

        connection.commit()
        db_cursor.close()
        connection.close()

        return self.get_by_id(data['Id'])

    def get_keywords(self):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute('''SELECT DISTINCT Keyword FROM VideoData''')
        data = db_cursor.fetchall()

        db_cursor.close()
        connection.close()

        return data
