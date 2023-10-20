# Variables
FRONTEND_DIR = frontend
BACKEND_DIR = backend

## Install frontend dependencies
setup-db:
	cd $(BACKEND_DIR) && python manage.py migrate
	$(MAKE) load-data

load-data:
	python scripts/load_data.py


install-frontend:
	cd $(FRONTEND_DIR) && npm install

## Start the frontend development server (assuming a script named "start" exists in package.json)
start-frontend:
	cd $(FRONTEND_DIR) && npm run dev

## Start the backend server
start-backend:
	cd $(BACKEND_DIR) && python manage.py runserver

## Other utility targets (like testing, linting, etc.) can be added as needed

.PHONY: install-frontend start-frontend start-backend
