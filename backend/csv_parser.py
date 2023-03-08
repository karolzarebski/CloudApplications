import json
import csv

from database import DatabaseService

with open('appsettings.json') as configurationFile:
    configuration = json.load(configurationFile)
    database_configuration = configuration['Database']

database_service = DatabaseService(database_configuration)
filename = "data.csv"

with open(filename, "r", encoding="utf8") as file:
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
        database_service.add_data(item)
    except Exception as ex:
        print(ex)
        print(item)
        break
