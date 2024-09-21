describe('ReqRes API Endpoints Tests', () => {

    // List Users
    it('GET /api/users - Validate list of users', () => {
      cy.request('GET', 'https://reqres.in/api/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length.greaterThan(0);
      });
    });
  
    // Single User
    it('GET /api/users/2 - Validate single user details', () => {
      cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('id', 2);
      });
    });
  
    // Single User Not Found
    it('GET /api/users/999 - User not found', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // List Resources
    it('GET /api/unknown - Validate list of resources', () => {
      cy.request('GET', 'https://reqres.in/api/unknown').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data[0]).to.have.property('name');
      });
    });
  
    // Single Resource
    it('GET /api/unknown/2 - Validate single resource', () => {
      cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('name');
      });
    });
  
    // Single Resource Not Found
    it('GET /api/unknown/999 - Resource not found', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/unknown/999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // Create User
    it('POST /api/users - Create a new user', () => {
      cy.request('POST', 'https://reqres.in/api/users', {
        name: 'John',
        job: 'Developer'
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
      });
    });
  
    // Update User (PUT)
    it('PUT /api/users/2 - Update user data', () => {
      cy.request('PUT', 'https://reqres.in/api/users/2', {
        name: 'John',
        job: 'Manager'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('job', 'Manager');
      });
    });
  
    // Update User (PATCH)
    it('PATCH /api/users/2 - Partially update user data', () => {
      cy.request('PATCH', 'https://reqres.in/api/users/2', {
        job: 'Senior Developer'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('job', 'Senior Developer');
      });
    });
  
    // Delete User
    it('DELETE /api/users/2 - Delete a user', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
        expect(response.status).to.eq(204);
      });
    });
  
    // Register - Successful
    it('POST /api/register - Successful registration', () => {
      cy.request('POST', 'https://reqres.in/api/register', {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
  
    // Register - Unsuccessful
    it('POST /api/register - Unsuccessful registration', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        failOnStatusCode: false,
        body: {
          email: 'eve.holt@reqres.in'
        }
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });
  
    // Login - Successful
    it('POST /api/login - Successful login', () => {
      cy.request('POST', 'https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
      });
    });
  
    // Login - Unsuccessful
    it('POST /api/login - Unsuccessful login', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        failOnStatusCode: false,
        body: {
          email: 'eve.holt@reqres.in'
        }
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error');
      });
    });
  
    // Delayed Response
    it('GET /api/users?delay=3 - Test delayed response', () => {
      cy.request('GET', 'https://reqres.in/api/users?delay=3').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length.greaterThan(0);
      });
    });
  
  });
  