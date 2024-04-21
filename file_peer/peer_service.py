from flask import Flask, send_file, request
import requests
import socket
import os

app = Flask(__name__)

@app.route('/ip', methods=["GET"])
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

@app.route('/send', methods=['GET'])
def send():
    file_id = request.args.get('id')
    filename = request.args.get('filename')

    file_path = './uploads/' + file_id + '_' + filename
    
    return send_file(file_path, as_attachment=True, download_name = str(file_id)+'_'+filename)

@app.route('/request', methods=['GET'])
def request_file():
    data = request.json
    file_id = data['id']
    filename = data['filename']
    ip = data['ip']
    

    url = f"http://{ip}:8080/send"
    params = {
        'id': file_id,
        'filename': filename,
    }

    response = requests.get(url, params=params)
    file_path = './uploads/' + file_id + '_' + filename

    if response.status_code == 200:
        if os.path.exists(file_path):

            return "File with name already exists", 200
        
        with open(file_path, 'wb') as f:
            f.write(response.content)
        print("File downloaded successfully")
        return f'File Downloaded to location to location {file_path}', 
    else:
        error = response.text
        print("Error:", error)
        return error, response.status_code


if __name__ == '__main__':
    app.run(debug=True, host= '0.0.0.0', port=8080)
