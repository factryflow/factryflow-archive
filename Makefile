# Variables
FRONTEND_DIR = frontend
BACKEND_DIR = backend

## Install frontend dependencies

install-frontend:
	cd $(FRONTEND_DIR) && npm install

## Start the frontend development server (assuming a script named "start" exists in package.json)
start-frontend:
	cd $(FRONTEND_DIR) && npm run dev

## Start the backend server
start-backend:
	cd $(BACKEND_DIR) && python manage.py migrate && python manage.py runserver

## Other utility targets (like testing, linting, etc.) can be added as needed

.PHONY: install-frontend start-frontend start-backend
