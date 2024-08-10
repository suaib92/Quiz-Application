<a href="https://docs.google.com/document/d/1e7URB6u9lKAwoQnC7dzl8YrRjKlyRU1VRIZfJ98NDrw/edit?usp=sharing">Quiz Application Project Overview</a>


# Quiz Application

A full-stack quiz application that allows users to select tags, answer quiz questions, and view their scores. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and Redux for state management.

## Features

- Tag selection and filtering
- Quiz question fetching based on selected tags
- Timer for each question
- Scoring based on answers
- Frontend with React and Redux
- Backend with Node.js and Express
- MongoDB for data storage

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (or access to a MongoDB instance)

### Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### Backend Setup

1. **Navigate to the backend directory**:

    ```bash
    cd backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Start the server**:

    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:

    ```bash
    cd frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

4. **Access the application**:

   Open `http://localhost:3000` in your browser.

## API Endpoints

### GET /api/tags

Fetches all tags available in the database.

### GET /api/questions

Fetches quiz questions based on selected tags. Accepts the `tags` query parameter as a comma-separated list of tags.

## Folder Structure

- **backend/**: Contains the Express server, API routes, and database models.
  - `server.js`: Main server file.
  - `routes/`: API route definitions.
  - `models/`: Mongoose schemas for MongoDB.
  - `config/`: Configuration files.

- **frontend/**: Contains the React application.
  - `src/`: React components and Redux setup.
  - `public/`: Static assets and HTML template.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact [Mohd Suaib Warsi](Suaib8211@gmail.com).
