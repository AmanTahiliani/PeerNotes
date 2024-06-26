from flask import Flask, send_file, request
import requests
import socket
import shutil
import os

from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)


@app.route("/copy-file", methods=["POST"])
def copy_file():
    try:
        files = request.files
        id = request.form["file_id"]
        print(id)
        if "file" not in files:
            return "File must be sent in request", 400
        file = request.files["file"]
        filename = file.filename.replace(" ", "_")
        # id = data["file_id"]
        # if not os.path.exists(source_file):
        #     return f"Source file does not exist at {source_file}", 400
        # filename = os.path.basename(source_file)
        destination_path = os.path.join("./uploads/", str(id) + "_" + filename)
        # shutil.copyfile(source_file, destination_path)
        if os.path.exists(destination_path):
            return "File with name already exists", 200

        with open(destination_path, "wb") as f:
            f.write(file.read())
        return "File Moved successfully", 200
    except Exception as e:
        print(f"An error occured: {e}")
        return "An error occured", 400


@app.route("/ip", methods=["GET"])
def get_internal_ip():
    internal_ip = None
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        internal_ip = s.getsockname()[0]
        s.close()
    except Exception as e:
        print("Error:", e)
    return internal_ip, 200


@app.route("/send", methods=["GET"])
def send():
    file_id = request.args.get("id")
    filename = request.args.get("filename")

    file_path = "./uploads/" + file_id + "_" + filename

    return send_file(
        file_path, as_attachment=True, download_name=str(file_id) + "_" + filename
    )


@app.route("/request", methods=["POST"])
def request_file():
    data = request.json
    file_id = data["id"]
    filename = data["filename"]
    ip = data["ip"]

    url = f"http://{ip}:8080/send"
    params = {
        "id": file_id,
        "filename": filename.replace(" ", "_"),
    }

    response = requests.get(url, params=params)
    file_path = "./uploads/" + str(file_id) + "_" + filename

    if response.status_code == 200:
        if os.path.exists(file_path):
            return "File with name already exists", 200

        with open(file_path, "wb") as f:
            f.write(response.content)
        print("File downloaded successfully")
        return f"File Downloaded to location to location {file_path}", 200
    else:
        error = response.text
        print("Error:", error)
        return error, response.status_code


@app.route("/files", methods=["GET"])
def list_files():
    files = os.listdir("./uploads")
    newFiles = []
    for file in files:
        newFiles.append("_".join(file.split("_", 1)[1:]))
    return {"files": newFiles}, 200


@app.route("/request-tests", methods=["GET"])
def request_test_():
    data = request.json
    file_id = data["id"]
    filename = data["filename"]
    ip = data["ip"]
    new_filename = data["new_filename"]

    url = f"http://{ip}:8080/send"
    params = {
        "id": file_id,
        "filename": filename,
    }

    response = requests.get(url, params=params)
    file_path = "./uploads/" + str(file_id) + "_" + new_filename

    if response.status_code == 200:
        if os.path.exists(file_path):
            return "File with name already exists", 200

        with open(file_path, "wb") as f:
            f.write(response.content)
        print("File downloaded successfully")
        return f"File Downloaded to location to location {file_path}", 200
    else:
        error = response.text
        print("Error:", error)
        return error, response.status_code


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
