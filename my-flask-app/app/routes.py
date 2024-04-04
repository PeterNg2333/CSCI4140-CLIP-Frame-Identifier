from app import app
import time

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/time')
def get_time():
    return {"time": time.time()}