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

print("Choose output format:")
print("1. Comma-separated list (no quotes)")
print("2. Comma-separated list (with quotes)")
choice = int(input("Enter your choice (1 or 2): "))

if choice == 1:
    comma_separated_file_names = ", ".join(file_names_without_extension)
elif choice == 2:
    comma_separated_file_names = ', '.join(f'"{file_name}"' for file_name in file_names_without_extension)
else:
    print("Invalid choice. Please enter either 1 or 2.")
    exit()

print(comma_separated_file_names)
