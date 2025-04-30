import subprocess
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import time

firstIn = 0

# Preset commands to input into MAV proxy
setup = ["module load joystick"]
launch = ["arm throttle", "takeoff 1"]
land = ["mode land", "disarm"]


app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React

def read_output(proc):
    for line in proc.stdout:
        print("MAVProxy says:", line.strip())

def send_command(mavproxy_proc, cmd):
    if mavproxy_proc.poll() is None:  # check that process is still running
        print("Sending command:", cmd)
        mavproxy_proc.stdin.write(cmd + '\n')
        mavproxy_proc.stdin.flush()
    else:
        print("MAVProxy is no longer running.")

@app.route('/start-mavproxy', methods=['POST'])
def start_mavproxy():
    try:
        # Get user input from the React frontend
        user_input = request.json.get("input", "")

        cwd = os.getcwd()
        script_path = os.path.join(cwd, "MAVProxy", "MAVProxy", "mavproxy.py")
        command = ["cmd.exe", "/k", "python", script_path]

        if user_input:
            if(not firstIn):
                #firstIn = 1
                port = "--master=" + user_input
                command.extend(port.split())
            else:
                command.extend(user_input.split())


        # Run the executable inside the Windows console (cmd.exe)
        global process
        process = subprocess.Popen(
            command,  # Ensure correct executable name
            creationflags=subprocess.CREATE_NEW_CONSOLE
        )

        if(process == None):
            print("Failed to create process")
        else:
            print("Process created successfully")

        # Send input and capture output
        process.stdin.write(user_input)
        time.sleep(5)
        
        return jsonify({"output": process.stdout.readline()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/launch-drone', methods=['POST'])
def launch_drone():
    if(process == None):
        print("Process does not exist")
        return jsonify({"error:": "No running process"})
    try:
        for x in launch:
            send_command(process, x)
            time.sleep(1)

    except Exception as e:
        return jsonify({"error": str(e)})
    
    return "Launching Activated"
    
@app.route('/land-drone', methods=['POST'])
def land_drone():
    if(process == None):
        return jsonify({"error": "Initialize MAVProxy first"})
    try:
        for x in land:
            send_command(process, x)
            time.sleep(1)

    except Exception as e:
        return jsonify({"error": str(e)})
    
    return "Landing Activated"

@app.route('/cmd', methods=['POST'])
def command_line():
    try:
        user_input = request.json.get("input", "")
        if(process == None):
            return jsonify({"error": str(e)}), 500
        send_command(process, user_input)
        
        return jsonify({"output": process.stdout.readline()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
