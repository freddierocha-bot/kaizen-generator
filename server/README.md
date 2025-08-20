# My Project - Backend

## Overview
This is the backend part of the My Project application. It is built using Node.js and Express, providing the necessary APIs for the frontend application.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application
To start the server, run the following command:
```bash
npm start
```
The server will start on `http://localhost:3001` by default.

### API Endpoints
- **POST /api/generate-pptx**: Endpoint to generate a PPTX file based on the provided form data.

## Directory Structure
- `src/app.js`: Entry point of the application.
- `src/controllers`: Contains the business logic for handling requests.
- `src/routes`: Defines the API routes.
- `src/utils`: Utility functions used throughout the application.

## Contributing
Feel free to submit issues or pull requests for any improvements or bug fixes.

## License
This project is licensed under the MIT License.