#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Waiting for postgres..."

# Wait for postgres to be reachable
while ! nc -z db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start server
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000
