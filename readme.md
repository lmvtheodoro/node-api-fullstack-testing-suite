# Unit and Integration Tests with Node.js, PostgreSQL, and Cypress

This project demonstrates the implementation of unit and integration tests using **Node.js**, **PostgreSQL**, **Jest**, and **Cypress**.

## Prerequisites

- [Docker](https://www.docker.com/) installed
- [Node.js](https://nodejs.org/) installed

## Technologies Used

<table>
    <tr>
        <td><img src="https://hopetutors.com/wp-content/uploads/2017/03/nodejs-logo-1.png" width="30" /></td>
        <td><img src="https://w7.pngwing.com/pngs/657/27/png-transparent-postgresql-original-wordmark-logo-icon-thumbnail.png" width="30" /></td>
        <td><img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/jest-js-icon.png" width="30" /></td>
        <td><img src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/cypress-icon-moigrz5nimpd7rsob0bisu.png/cypress-icon-pg9bdlubveoefqouilbg.png?_a=DAJFJtWIZAAC" width="30" /></td>
    </tr>
</table>

- **Node.js**: Development platform used to build the API.
- **PostgreSQL**: Relational database used in the project.
- **Jest**: Testing framework used for unit tests.
- **Cypress**: Testing framework used for API integration tests.

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