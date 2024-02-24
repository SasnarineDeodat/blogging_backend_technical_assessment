# Blogging Backend

This repository contains the backend implementation for a blogging platform, designed to support user authentication, post creation, and commenting functionalities. Built with Node.js, Express.js, Passportjs, Sequelize, and PostgreSQL, it offers a RESTful API for a front-end application to interact with.

## Dependencies

[bcrypt](https://www.npmjs.com/package/bcrypt)
[body-parser](https://www.npmjs.com/package/body-parser)
[cors](https://www.npmjs.com/package/cors)
[dotenv](https://www.npmjs.com/package/dotenv)
[express](https://www.npmjs.com/package/express)
[express-session](https://www.npmjs.com/package/express-session)
[express-validator](https://www.npmjs.com/package/express-validator)
[passport](https://www.npmjs.com/package/passport)
[passport-local](https://www.npmjs.com/package/passport-local)
[pg](https://www.npmjs.com/package/pg)
[pg-hstore](https://www.npmjs.com/package/pg-hstore)
[sequelize](https://www.npmjs.com/package/sequelize)
[nodemon](https://www.npmjs.com/package/nodemon)

## Features

**User Authentication**: Secure signup and login processes, including session management with Passport.js.
**Blog Posts**: Users can create, update, and delete their blog posts.
**Comments**: Users can comment on posts. Comments can be created, and users can delete their own comments.
**User Profiles**: Users can view, update, and delete their own profiles.
**Security**: Implements middleware for authentication checks, ensuring that users can only modify their own data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- PostgreSQL Database

### Installation

Firstly, Clone the repository

Then, install dependencies

```bash
npm install
```

After that, set up environment variables

Create a .env file in the root directory of the project. This file should include:

```bash
POSTGRESQL_HOST=your_database_host
POSTGRESQL_USER=your_database_user
POSTGRESQL_PASSWORD=your_database_password
POSTGRESQL_DB=your_database_name
POSTGRESQL_DIALECT=postgres
POSTGRESQL_PORT=your_database_port
AUTH_SECRET=your_session_secret
```

### Database setup

Ensure your PostgreSQL database is running. Use the provided Sequelize models to create the necessary tables:

```bash
npx sequelize-cli db:migrate
```

### Start the server
```bash
npm start
```

The server will start running on http://localhost:8080 or another port if you specified a different one in your .env file.

## User Endpoints

- Create a New User

    - **Method**: POST
    - **Endpoint**: /api/users/
    - **Demo Body** {JSON Format}:
    ```bash
    {
        "username": "sasnarine",
        "email": "sasnarine@gmail.com",
        "password": "secret1234"
    }
    ```

- Login a User

    - **Method**: POST
    - **Endpoint**: /api/users/login
    - **Demo Body** {JSON Format}:
    ```bash
    {
        "email": "sasnarine@gmail.com",
        "password": "secret1234"
    }
    ```

- Logout a User

    - **Method**: GET
    - **Endpoint**: /api/users/logout

- Retrieve all users

    - **Method**: GET
    - **Endpoint**: /api/users/

- Retrieve a Single User by Username

    - **Method**: GET
    - **Endpoint**: /api/users/:username

- Update User Profile (Authenticated User)

    - **Method**: PUT
    - **Endpoint**: /api/users/profile
    - **Demo Body** {JSON Format}:
    ```bash
    {
        "username": "newUsername",
        "email": "newEmail@gmail.com",
        "password": "newSecret1234"
    }
    ```
    
- Delete User Profile (Authenticated User)

    - **Method**: DELETE
    - **Endpoint**: /api/users/profile

## Posts Endpoints

- Create a New Post

    - **Method**: POST
    - **Endpoint**: /api/posts/
    - **Authentication Required**: Yes
    - **Demo Body** {JSON Format}:
    ```bash
    {
        "title": "My First Blog Post",
        "content": "This is the content of my first blog post."
    }
    ```

- Retrieve All Posts by User's Email

    - **Method**: GET
    - **Endpoint**: /api/posts/by-email/:email
    - **Authentication Required**: No

- Update a Post

    - **Method**: PUT
    - **Endpoint**: /api/posts/:id
    - **Authentication Required**: Yes
    - **Demo Body** {JSON Format}:
    ```bash
    {
        "title": "Updated Blog Post Title",
        "content": "Updated content of the blog post."
    }
    ```

- Delete a Post

    - **Method**: DELETE
    - **Endpoint**: /api/posts/:id
    - **Authentication Required**: Yes

## Comments Endpoint

- Create a New Comment

    - **Method**: POST
    - **Endpoint**: /api/comments
    - **Authentication Required**: Yes
    - **Demo Body** {JSON Format}:
    ```bash
    {
        "content": "This is a comment.",
        "postId": 1
    }
    ```

- Retrieve All Comments by the Authenticated User

    - **Method**: GET
    - **Endpoint**: /api/comments/my-comments
    - **Authentication Required**: Yes

- Delete a Comment

    - **Method**: DELETE
    - **Endpoint**: /api/comments/:id
    - **Authentication Required**: Yes

## Credits 

This utility was developed by [Sasnarine Deodat](https://github.com/SasnarineDeodat).