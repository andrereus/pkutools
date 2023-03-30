import os

def get_file_names_without_extension(folder_path):
    file_names = []
    for file in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, file)):
            file_name_without_extension, _ = os.path.splitext(file)
            file_names.append(file_name_without_extension)
    return file_names

folder_path = "food-icons"  # Replace this with the path to your folder
file_names_without_extension = get_file_names_without_extension(folder_path)

comma_separated_file_names = ", ".join(file_names_without_extension)
print(comma_separated_file_names)
