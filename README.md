# Task Manager

A full-stack Task Management System built with Django and React.

## Features

- Create, update, delete tasks
- Filter by status, priority, due date
- Search by title or description
- Mark overdue tasks visually

## Setup

### Backend

```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
