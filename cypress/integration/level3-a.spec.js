

var assert = chai.assert;


describe("Level 3", () => {

    it("L3a Strapi server is running on port 1337 and the endpoints are in place", () => {

        cy.request('http://localhost:1337/api/jobs')
        .its('headers').its('content-type')
        .should('include', 'application/json') 

        cy.request('http://localhost:1337/api/companies')
        .its('headers').its('content-type')
        .should('include', 'application/json') 

        cy.request('http://localhost:1337/api/job-applications')
        .its('headers').its('content-type')
        .should('include', 'application/json')
    })

    
});