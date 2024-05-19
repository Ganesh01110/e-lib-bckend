
# e-Library Backend

This is the backend for an e-library application, built using the MERN stack (MongoDB, Express.js, Node.js). The backend provides APIs and endpoints for managing library resources, with files stored in Cloudinary. It includes features such as JWT token generation for authentication, password hashing for credentials, and comprehensive error handling using the `http-errors` package.

## Features

- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Password Hashing**: Securely store user credentials using bcrypt.
- **File Storage**: Store files in Cloudinary.
- **Error Handling**: Comprehensive error handling and generation using the `http-errors` package.
- **RESTful APIs**: CRUD operations for managing library resources.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB to manage data models.
- **Cloudinary**: Cloud service for storing and managing media files.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **http-errors**: Package for creating HTTP errors.
- **multer**
- **nodemon**

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ganesh01110/e-library-backend.git
   cd e-library-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

### API Endpoints

Here are the main API endpoints:

#### User Authentication

- **Register User**: `POST /api/users/register`
- **Login User**: `POST /api/users/login`

#### Library Resources

- **Get All Books**: `GET /api/books`
- **Get Book by ID**: `GET /api/books/:id`
- **Create Book**: `POST /api/books`
- **Update Book**: `PUT /api/books/:id`
- **Delete Book**: `DELETE /api/books/:id`

### Error Handling

The project uses the `http-errors` package to handle and generate errors. Errors are caught and processed by a centralized error-handling middleware.

### Authentication

JWT tokens are used for securing endpoints. Tokens are generated upon successful login and are required for accessing protected routes.

### Password Hashing

Passwords are hashed using `bcrypt` before storing them in the database, ensuring that user credentials are stored securely.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please contact [ganesh sahu](mailto:ganeshsahu0108@gmail.com).

---

By following this structure, your README will provide clear and comprehensive information about your project, making it easier for others to understand and contribute.
