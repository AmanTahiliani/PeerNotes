# Django Backend

This is the backend for the Django project.

## Setup

1. Create a virtual environment:
    ```bash
    python3 -m venv venv
    ```

2. Activate the virtual environment:
    - For macOS/Linux:
      ```bash
      source venv/bin/activate
      ```
    - For Windows:
      ```bash
      venv\Scripts\activate
      ```

3. Install the project dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

To start the Django server, run the following command:
```bash
    python3 manage.py runserver
```

By default, the server will run on `http://localhost:8000/`.

## Admin Panel
In order to access the admin panel, you need to create a superuser. To do this, run the following command:
```bash
    python3 manage.py createsuperuser
```

Then, you can access the admin panel by visiting `http://localhost:8000/admin/` and logging in with the superuser credentials.

## Contributing to the Codebase
1. Create a new branch:
    ```bash
    git checkout -b <branch-name>
    ```
2. Make your changes.

3. Use black to format your code:
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


