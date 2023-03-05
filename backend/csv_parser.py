import json
import csv

from database import DatabaseService

with open('appsettings.json') as configurationFile:
    configuration = json.load(configurationFile)
    database_configuration = configuration['Database']

database_service = DatabaseService(database_configuration)

filename = "data.csv"

# Open the CSV file
with open(filename, "r") as file:

    # Create a CSV reader object
    reader = csv.reader(file)

    # Get the header row
    header = next(reader)

    json_format = []

    # Iterate over each row in the CSV file
    for row in reader:
        # Iterate over each column in the row

        row_json = {}

        for i in range(len(header)):
            # Get the data for the current column
            data = row[i]
            # Process the data as needed
            # print(f"{header[i]}: {data}")

            row_json[header[i]] = data

        json_format.append(row_json)

# print(json_format)

for item in json_format:
    try:
        database_service.add_data(item)
    except Exception as ex:
        print(ex)
        print(item)
        break
