from flask import Flask, request
import signal

app = Flask(__name__)
file_index = {}


def shutdown_server(signal, frame):
    print("Shutting down server...")
    # Close the Flask app context
    ctx = app.app_context()
    ctx.push()
    # Shutdown the Flask server
    app.shutdown()
    ctx.pop()


# Register the signal handler for SIGINT (keyboard interrupt)
signal.signal(signal.SIGINT, shutdown_server)


@app.route("/register", methods=["POST"])
def register_node():
    data = request.json
    node_ip = data["ip"]
    files = data["files"]
    for file in files:
        if file not in file_index:
            file_index[file] = []
        file_index[file].append(node_ip)
    print(file_index)
    return "Node registered successfully", 200


@app.route("/query", methods=["GET"])
def query_file():
    file_name = request.args.get("file")
    print("Requested File Name: ", file_name)
    if file_name in file_index:
        return {"nodes": file_index[file_name]}, 200
    else:
        return "File not found", 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
