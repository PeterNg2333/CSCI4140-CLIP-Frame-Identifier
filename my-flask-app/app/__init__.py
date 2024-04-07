import os

from flask import Flask

# Create a Flask app instance
app = Flask(__name__)


# Configure the Flask app (configuration settings will go here)
# Example: app.config['DEBUG'] = True
current_dir = os.path.dirname(os.path.realpath(__file__))
app.config['templates_list_files'] = os.listdir(current_dir + '/templates') ## this is the list of files in the templates directory
app.config['static_list_files'] = os.listdir(current_dir + '/static') ## this is the list of files in the static directory
app.config["title_choices"] = {"Home": "Home",
                               "Player": "Player",
                               "Editor": "Editor",
                               "Search": "Search",
                               } ## this is the list of titles that can be used in the templates

    


# Import the routes module in routes.py
from app import routes

# Run the Flask app with debugging enabled on port 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)