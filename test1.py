import requests
import json
import os

def request_tests():
    url = "http://localhost:8080/request-tests"
    downloaded_files = []
    print("past url")
    for i in range(100):
        filename = f"TestFileTransfer.pdf"
        
        payload = json.dumps({
            "id": 5,
            "filename": filename,
            "ip": "143.215.87.54",
            "new_filename":f"TestFileTransfer_{i}.pdf"
        })

        headers = {
        'Content-Type': 'application/json',
        }
        
        response = requests.get(url, headers=headers, data=payload)
        print("response received")
        print(payload)
        print(response)
        
        if response.status_code == 200:
            print(f"Request {i+1} successful")
            downloaded_files.append(f"bcdef_{i}.txt")
        else:
            print(f"Request {i+1} failed with status code {response.status_code}")
    
    if downloaded_files:
        file_paths = ', '.join(['./uploads/' + file for file in downloaded_files])
        return f"1000 files have been downloaded to {file_paths}", 200
    else:
        return "No files downloaded", 200

request_tests()