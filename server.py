import subprocess
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import time

firstIn = 0
process = None

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
        process = subprocess.Popen(
            command,  # Ensure correct executable name
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # Send input and capture output
        print("sup")
        process.stdin.write(user_input)
        time.sleep(5)
        
        return jsonify({"output": process.stdout.readline()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/launch-drone', methods=['POST'])
def launch_drone():
    if(process == None):
        return "Initialize MAVProxy first"
    try:
        for x in launch:
            print(x)
            send_command(process, x)
            time.sleep(1)

    except Exception as e:
        return jsonify({"error": str(e)})
    
    return "Launching Activated"
    
@app.route('/land-drone', methods=['POST'])
def land_drone():
    if(process == None):
        return "Initialize MAVProxy first"
    try:
        for x in land:
            print(x)
            send_command(process, x)
            time.sleep(1)

    except Exception as e:
        return jsonify({"error": str(e)})
    
    return "Landing Activated"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
