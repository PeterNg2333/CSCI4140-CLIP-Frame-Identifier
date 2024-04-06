import os

from flask import Flask

# Create a Flask app instance
app = Flask(__name__)


# Configure the Flask app (configuration settings will go here)
# Example: app.config['DEBUG'] = True
# 1. Add a configuration setting to the Flask app that contains a list of files in the templates directory.
current_dir = os.path.dirname(os.path.realpath(__file__))
app.config['templates_list_files'] = os.listdir(current_dir + '/templates')
app.config['static_list_files'] = os.listdir(current_dir + '/static')

    


# Import the routes module in routes.py
from app import routes

# Run the Flask app with debugging enabled on port 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)