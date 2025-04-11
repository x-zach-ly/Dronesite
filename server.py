import subprocess
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React

@app.route('/run-exec', methods=['POST'])
def run_executable():
    try:
        # Get user input from the React frontend
        user_input = request.json.get("input", "")

        cwd = os.getcwd()
        script_path = os.path.join(cwd, "MAVProxy", "MAVProxy", "mavproxy.py")
        command = ["cmd.exe", "/k", "python", script_path]

        if user_input:
            command.extend(user_input.split())

        # Run the executable inside the Windows console (cmd.exe)
        process = subprocess.Popen(
            command,  # Ensure correct executable name
            creationflags=subprocess.CREATE_NEW_CONSOLE
        )

        # Send input and capture output
        stdout, stderr = process.communicate(input=user_input)
        
        return jsonify({"output": stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
