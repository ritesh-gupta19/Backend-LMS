# Learning Management System (LMS) - Backend

This project is the backend for a basic Learning Management System (LMS) where users can sign up, view courses, enroll, and track their learning progress. It features a secure, role-based REST API built with Node.js and Express, using PostgreSQL for data persistence.

## Features

* **Authentication**: Secure user signup and login using JWT-based authentication.
* **Role-Based Access Control**: Differentiates between regular users and admins, where admins can manage course content.
* **Course Management**: Admins can create courses with a title, description, instructor, and price. Users can view and enroll in courses.
* **Lessons & Quizzes**: Courses contain multiple lessons and quizzes. Lessons include a title, video URL, and optional resources.
* **Progress Tracking**: Users can mark lessons as completed and view their overall course progress.
* **Quiz System**: Users can attempt quizzes multiple times and view their scores for each attempt.
* **API Security**: Implements API rate-limiting and input validation for enhanced security.
* **Pagination**: Paginated responses for long lists of data, like courses and lessons.

## Built With

This project is built with modern backend technologies:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/) (ORM)
* [JSON Web Tokens (JWT)](https://jwt.io/)
* [Joi](https://joi.dev/) (Validation)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

* Node.js (v18.x or later)
* npm
* PostgreSQL

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/ritesh-gupta19/Backend-LMS.git
    cd lms-backend
    ```

2.  **Install NPM packages**
    ```sh
    npm install
    ```

3.  **Setup PostgreSQL Database**
    * Create a new PostgreSQL database on your local machine.

4.  **Configure Environment Variables**
    * Create a `.env` file in the root directory and add the following variables. This file is ignored by Git and should not be committed.

    ```env
    # Environment
    NODE_ENV=development

    # Server Port
    PORT=5000

    # Database Connection
    DATABASE_URL="postgres://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:5432/YOUR_DB_NAME"

    # JWT Secret
    JWT_SECRET="YOUR_SUPER_SECRET_AND_COMPLEX_KEY"
    ```

5.  **Seed the Database**
    * Run the seed script to populate the database with an admin user and initial course content.
    ```sh
    npm run seed
    ```

6.  **Run the Development Server**
    * Start the server with Nodemon, which will automatically restart on file changes.
    ```sh
    npm run dev
    ```
    The server will be running at `http://localhost:5000`.

## API Endpoints

Here are the primary API endpoints available.

### Authentication

| Method | Endpoint           | Description                         |
| :----- | :----------------- | :---------------------------------- |
| `POST` | `/api/auth/signup` | Register a new user.                |
| `POST` | `/api/auth/login`  | Log in a user and receive a token. |

### Courses

| Method | Endpoint                    | Auth  | Description                              |
| :----- | :-------------------------- | :---- | :--------------------------------------- |
| `GET`  | `/api/courses`              | None  | Get a paginated list of all courses.     |
| `GET`  | `/api/courses/:id`          | None  | Get details for a single course.         |
| `POST` | `/api/courses`              | Admin | Create a new course.                     |
| `POST` | `/api/courses/:id/enroll`   | User  | Enroll the logged-in user in a course.   |

### Lessons & Progress

| Method | Endpoint                                  | Auth  | Description                              |
| :----- | :---------------------------------------- | :---- | :--------------------------------------- |
| `GET`  | `/api/courses/:courseId/lessons`          | User  | Get all lessons for a specific course.   |
| `POST` | `/api/courses/:courseId/lessons`          | Admin | Create a new lesson for a course.        |
| `POST` | `/api/lesson-progress/:lessonId/complete` | User  | Mark a lesson as complete.               |
| `GET`  | `/api/lesson-progress/course/:courseId`   | User  | Get the user's progress for a course.    |

### Quizzes & Attempts

| Method | Endpoint             | Auth  | Description                               |
| :----- | :------------------- | :---- | :---------------------------------------- |
| `POST` | `/api/quizzes`       | Admin | Create a new quiz for a course.           |
| `GET`  | `/api/quizzes/:quizId` | User  | Get a quiz with its questions.            |
| `POST` | `/api/quiz-attempts` | User  | Submit answers for a quiz.                |
| `GET`  | `/api/quiz-attempts` | User  | Get the logged-in user's quiz attempts. |

## Deployment

This application is ready for deployment. It has been configured to work with hosting providers like **Render** or **Heroku**. Ensure you set the `NODE_ENV`, `DATABASE_URL`, and `JWT_SECRET` environment variables in your production environment.
