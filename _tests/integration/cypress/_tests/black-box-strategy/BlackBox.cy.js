/// <reference types="cypress"/>

import ApiRequests from '../../_api/ApiRequests';
import Ajv from 'ajv';

describe("Testing API through 'Black Box' Strategy", () => {
  const baseUrl = Cypress.env('local').baseUrl;
  const apiRequests = new ApiRequests(null, baseUrl);
  const ajv = new Ajv();

  it('Should return all users healthcheck', () => {
    apiRequests.getAllUsers().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.eq([]);
    });
  });

  let newUserId;
  it('Should post new user healthcheck', () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    console.log('Request payload:', newUser);
    
    apiRequests.postUser(newUser).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(201);
      expect(response.body.user).to.have.property('id');
      expect(response.body.user).to.have.property('name', newUser.name);
      expect(response.body.user).to.have.property('email', newUser.email);      
      newUserId = response.body.user.id
    });
  });

  it('Should update existing user healthcheck', () => {
    const updatedUser = {
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    apiRequests.putUser(newUserId, updatedUser).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', newUserId);
      expect(response.body.name).to.eq(updatedUser.name);
      expect(response.body.email).to.eq(updatedUser.email); 
    });
  });

  it('Should retrieve user by ID', () => {
    apiRequests.getUserById(newUserId).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body).to.include({
          id: newUserId,
          name: 'John Updated',
          email: 'john.updated@example.com'
      });
    });
  });

  it('Should fail to update non-existent user', () => {
    const updatedUser = {
      name: 'Non-Existent User',
      email: 'nonexistent@example.com',
    };
    
    apiRequests.putUser('999', updatedUser).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(404);
    });
  });

  it('Should delete the user', () => {
    apiRequests.deleteUserById(newUserId).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(204);
    });
  });

  it('Should fail to retrieve deleted user', () => {
    apiRequests.getUserById(newUserId).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(404);
    });
  });
});