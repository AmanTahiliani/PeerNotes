# PeerNotes (In Progress)
Repository for a course project of CS4675/CS6675 at Georgia Institute of Technology.

## Advisory for Contributors
<ul>
  <li>Please do not commit any code to the main branch directly</li>
  <li>Use feature branches, ideally with your name and the feature it is for mentioned in the branch name eg. feature_aman_login</li>
  <li>Raise a PR once you are ready and have checked your code for errors.</li>
  <li>Mention a bullet point summary for all the features you are pushing as part of the PR within the description to ease the review process</li>
</ul>

## Contributing to the Codebase
1. Create a new branch:
    ```bash
    git checkout -b <branch-name>
    ```
2. Make your changes.

3. Use black to format your code: (With virtual environment activated)
    ```bash
    black .
    ```

4. Make your changes and commit them:
    ```bash
    git add .
    git commit -m "Your commit message"
    ```
5. Push your changes to the remote repository:
    ```bash
    git push origin <branch-name>
    ```
6. Create a Pull Request on GitHub.


## Getting Started

# Frontend (ReactJs)
For our frontend we are using React + Vite + TypeScript!

- **React** -> JavaScript Framework for creating reactive user interfaces.
- **Vite** -> Development environment / build tool. Gives us access to features like hot reload, bundling, and plugins.
- **TypeScript** -> A superset of JavaScript allowing for static types.

Here's how to set up + run the frontend environment:
1. Download and install [Node.js](https://nodejs.org/en/download) v18+ 
Check your node version:
```sh
node -v
```
2. Clone the repo using Git
3. Install dependencies
```sh
cd frontend
npm install
```
4. Start the development server
```sh
npm run dev
```
5. Visit http://localhost:5173


# Backend
# Central Server (Django)

This is the backend for the Django project.


## Setup

1. Open a new terminal and cd into the backend directory:
    ```bash
    cd backend
    ```

2. Create a virtual environment:
    ```bash
    python3 -m venv venv
    ```

3. Activate the virtual environment:
    - For macOS/Linux:
      ```bash
      source venv/bin/activate
      ```
    - For Windows:
      ```bash
      venv\Scripts\activate
      ```

4. Install the project dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Running the Server

To start the Django server, run the following command:
```bash
    python3 manage.py runserver
```

By default, the server will run on `http://localhost:8000/`.

### Admin Panel
In order to access the admin panel, you need to create a superuser. To do this, run the following command:
```bash
    python3 manage.py createsuperuser
```

Then, you can access the admin panel by visiting `http://localhost:8000/admin/` and logging in with the superuser credentials.

# Intermediate Proxy Service (Flask)

This is the service which runs on the client side and is responsible for handling the peer to peer connections and file transfers along with getting the IPs of the machine. In order to run this, please do the following:

1. Open a new terminal and cd into the file_peer directory:
    ```bash
    cd file_peer
    ```
2. Make sure that the venv that we used for the backend service is activated

3. Run the flask server using the following command:
    ```bash
    python3 peer_service.py
    ```




## Further Configurations:
- You would need to set up the central server with a domain and change the domain within the client code. (It is currently hardcoded with IP.)
- Make sure all the servers are running within the same network as this solution is featured to be restricted to within a network by design.