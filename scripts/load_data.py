import os
import subprocess


def load_fixtures(backend_directory, fixtures_directory):
    """
    Loads JSON fixtures into the Django application.

    Args:
        backend_directory (str): The path to the Django backend directory.
        fixtures_directory (str): The path to the directory containing the JSON fixtures.
    """
    # Iterate over all files in the fixtures directory
    for file_name in os.listdir(fixtures_directory):
        # Check if the file is a JSON file
        if file_name.endswith(".json"):
            file_path = os.path.join(fixtures_directory, file_name)

            # Construct the command to load the fixture
            manage_py_path = os.path.join(backend_directory, "manage.py")
            command = ["python", manage_py_path, "loaddata", file_path]

            # Run the command
            subprocess.run(command)


def main():
    # Determine project structure based on the script's location
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    backend_directory = os.path.join(project_root, "backend")
    fixtures_directory = os.path.join(backend_directory, "fixtures")

    # Load the fixtures
    load_fixtures(backend_directory, fixtures_directory)


if __name__ == "__main__":
    main()
