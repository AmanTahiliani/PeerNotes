import requests
import json
import os

def request_tests():
    url = "http://localhost:8080/request"
    downloaded_files = []
    
    for i in range(1000):
        filename = f"bcdef.txt"
        
        payload = json.dumps({
            "id": 2,
            "filename": filename,
            "ip": "143.215.87.54",
            "new_filename":f"bcdef_{i}.txt"
        })
        
        response = requests.post(url, data=payload)
        
        if response.status_code == 200:
            print(f"Request {i+1} successful")
            downloaded_files.append(filename)
        else:
            print(f"Request {i+1} failed with status code {response.status_code}")
    
    if downloaded_files:
        file_paths = ', '.join(['./uploads/' + file for file in downloaded_files])
        delete_downloaded_files(downloaded_files)
        return f"1000 files have been downloaded to {file_paths}", 200
    else:
        return "No files downloaded", 200
    
def delete_downloaded_files(downloaded_files):
    for file_path in downloaded_files:
        os.remove(file_path)

request_tests()