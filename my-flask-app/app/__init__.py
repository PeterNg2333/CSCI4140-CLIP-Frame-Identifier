from flask import Flask

app = Flask(__name__)

from app import routes

if __name__ == "__init__":
    app.run(debug=True, port=5000)