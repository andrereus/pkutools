import codecs
import json
import csv
import os

def json_to_csv(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as jsonfile:
        data = json.load(jsonfile)

    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        csvfile.write(codecs.BOM_UTF8.decode('utf-8'))
        fieldnames = ['name', 'phe']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

def csv_to_json(input_file, output_file):
    csv_data = []

    with open(input_file, 'r', newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            csv_data.append(row)

    json_data = json.dumps(csv_data, ensure_ascii=False, indent=4)

    with open(output_file, 'w', encoding='utf-8') as jsonfile:
        jsonfile.write(json_data)

def get_output_filename(input_file, output_extension):
    base_filename, input_extension = os.path.splitext(input_file)
    output_file = base_filename + output_extension
    i = 1

    while os.path.exists(output_file):
        output_file = f"{base_filename}_{i}{output_extension}"
        i += 1

    return output_file

input_file = input("Enter the file name (including extension) you want to convert: ")

if input_file.endswith(".json"):
    output_file = get_output_filename(input_file, ".csv")
    json_to_csv(input_file, output_file)
    print(f"JSON data converted to CSV: {output_file}")
elif input_file.endswith(".csv"):
    output_file = get_output_filename(input_file, ".json")
    csv_to_json(input_file, output_file)
    print(f"CSV data converted to JSON: {output_file}")
else:
    print("Unsupported file type. Please provide a JSON or CSV file.")
