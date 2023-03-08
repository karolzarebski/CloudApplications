import mysql.connector


class DatabaseService:
    def __init__(self, database_configuration):
        self.database_configuration = database_configuration
        self.create_database()

    def create_database(self):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor()

        db_cursor.execute('''
            CREATE TABLE IF NOT EXISTS VideoData (
              Id INT PRIMARY KEY AUTO_INCREMENT,
              Title VARCHAR(255) NOT NULL,
              VideoId VARCHAR(50) NOT NULL,
              PublishedAt DATE NOT NULL,
              Keyword VARCHAR(255),
              Likes DOUBLE,
              Comments DOUBLE,
              Views DOUBLE
            );
        ''')

        db_cursor.close()
        connection.close()

    def add_data(self, data):
        connection = mysql.connector.connect(**self.database_configuration)
        db_cursor = connection.cursor(dictionary=True, buffered=True)

        db_cursor.execute('''INSERT INTO VideoData (Title, VideoId, PublishedAt, Keyword, Likes, Comments, Views) 
            VALUES (%s,%s,%s,%s,%s,%s,%s)''', (data['Title'], data['VideoId'], data['PublishedAt'], data['Keyword'],
                                               data['Likes'] if not data['Likes'] == '' else None,
                                               data['Comments'] if not data['Comments'] == '' else None,
                                               data['Views'] if not data['Views'] == '' else None))
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

        db_cursor.execute('''UPDATE VideoData SET Title = %s, VideoId = %s, PublishedAt = %s, Keyword = %s, Likes = %s,
                            Comments = %s, Views = %s  WHERE Id = %s''', (data['Title'], data['VideoId'],
                                                                          data['PublishedAt'], data['Keyword'],
                                                                          data['Likes'], data['Comments'],
                                                                          data['Views'], data['Id']))
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
