MERN Stack REST API

A RESTful API built using Node.js, Express.js, and MongoDB for managing tasks.

## Features

- Create a task
- Get all tasks
- Get single task
- Update task
- Delete task
- MongoDB integration with Mongoose
- Schema validation
- Error handling
- Environment variable support using dotenv

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Installation

Clone the repository:

git clone --paste the repo link--

Move into project folder:

cd repo-name

Install dependencies:

npm install

## Environment Variables

Create a `.env` file:

env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mern_tasks

## Run Server

node index.mjs

## API Endpoints

### Get All Tasks

http
GET /api/tasks

### Get Single Task

http
GET /api/tasks/:id

### Create Task

http
POST /api/tasks

### Update Task

http
PATCH /api/tasks/:id

### Delete Task

http
DELETE /api/tasks/:id

## Project Structure

```
project
 ┣ screenshots
 ┣ postman collection
 ┃ ┗ postman_collection.json
 ┣ src
 ┃ ┣ mongoose
 ┃ ┣ routes
 ┃ ┗ utils
 ┣ .env.example
 ┣ .gitignore
 ┣ index.mjs
 ┣ package.json
 ┗ README.md
```

## Postman Collection

Postman collection is available inside:

/postman

## Screenshots

Project screenshots are available inside:

/screenshots

## Author

Prem Kumar
