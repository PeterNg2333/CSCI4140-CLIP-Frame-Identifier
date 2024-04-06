from flask import Flask

# Create a Flask app instance
app = Flask(__name__)


# Configure the Flask app (configuration settings will go here)
# Example: app.config['DEBUG'] = True


# Import the routes module in routes.py
from app import routes

# Run the Flask app with debugging enabled on port 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)