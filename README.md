# scalaxity-be

A backend REST API service for a real-time collaborative task manager.

## Features

- Create, read, update, and delete tasks
- Each task has: title, description, dueDate, and status (pending or done)
- REST endpoints:
  - `GET /tasks` – List all tasks
  - `POST /tasks` – Create a new task
  - `PUT /tasks/:id` – Update a task
  - `DELETE /tasks/:id` – Delete a task

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   node server.js
   ```

3. The API will run on `http://localhost:3000`

## Example Task Object

```json
{
  "id": "uuid",
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2024-06-30",
  "status": "pending"
}
```
