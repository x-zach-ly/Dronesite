from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React

@app.route('/run-exec', methods=['POST'])
def run_executable():
    try:
        # Get user input from the React frontend
        user_input = request.json.get("input")

        # Run the executable and send input via subprocess
        process = subprocess.Popen(
            ["./MAVProxy/mavproxy"],  # Replace with your actual executable path
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # Send input and capture output
        stdout, stderr = process.communicate(input=user_input)

        if process.returncode != 0:
            return jsonify({"error": stderr}), 500
        
        return jsonify({"output": stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
