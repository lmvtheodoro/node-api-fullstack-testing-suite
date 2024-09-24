# Unit and Integration Tests with Node.js, PostgreSQL, and Cypress

This project demonstrates the implementation of unit and integration tests using **Node.js**, **PostgreSQL**, **Jest**, and **Cypress**.

## Prerequisites

- [Docker](https://www.docker.com/) installed
- [Node.js](https://nodejs.org/) installed

## Technologies Used

- **Node.js**: Development platform used to build the API.
- **PostgreSQL**: Relational database used in the project.
- **Jest**: Testing framework used for unit tests.
- **Cypress**: Front-end testing framework used for API integration tests.

## Setup

1. **Clone this repository**:
```bash
   git clone https://github.com/your-repository.git
```

2. **Navigate to the project folder:**
```bash
cd /nodeAPI
```

3. **Create and start the Docker containers with the database and the application:**
```bash
docker-compose up
```

4. **Run the unit tests with Jest:**
```bash
npm test
```

5. **To run the integration tests with Cypress, navigate to the integration tests folder:**
```bash
cd _tests/integration
```

6. **Run Cypress with the following configuration:**
```bash
npx cypress run --env ENV=local
```

## Running API Locally

1. **Set the DB_HOST variable**  
   - For Linux/Mac:
```bash
     export DB_HOST=localhost
```
   - For Windows:
```bash
      set DB_HOST=localhost
```

2. **Run `docker-compose up`**  

3. **Stop only `nodeapi-api-1`**  
```bash
   docker stop nodeapi-api-1
```

4. **Run API**
```bash
   npm start
```