class ApiRequests {
    constructor(token, baseUrl){
        this.token = token;
        this.baseUrl = baseUrl;
    }

    getAllUsers(){
        return cy.request({
            // headers: {
            //     Authorization: `Bearer ${this.token}`
            // },
            method: "GET",
            url: `${this.baseUrl}/users`,
            log: true,
            failOnStatusCode: false,
        }).as('get all users');
    }

    getUserById(id) {
        return cy.request({
            method: "GET",
            url: `${this.baseUrl}/users/${id}`,
            log: true,
            failOnStatusCode: false,
        }).as('get user by id');
    }  

    postUser(user) {
        return cy.request({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            url: `${this.baseUrl}/users`,
            body: user,
            log: true,
            failOnStatusCode: false,
        }).as('post user');
    }

    putUser(id, user) {
        return cy.request({
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PUT",
            url: `${this.baseUrl}/users/${id}`,
            body: user,
            log: true,
            failOnStatusCode: false,
        }).as('put user');
    }

    deleteUserById(id) {
        return cy.request({
            method: "DELETE",
            url: `${this.baseUrl}/users/${id}`,
            log: true,
            failOnStatusCode: false,
        }).as('delete user by id');
    }  
}

export default ApiRequests;