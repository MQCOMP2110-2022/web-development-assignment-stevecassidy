

var assert = chai.assert;


describe("Level 3", () => {

    it("L3d Search box on every page", () => {
    
        cy.visit('http://localhost:8083/');
        cy.wait(100);
        cy.get('input[id="search"]')
          .should('be.visible')
        cy.visit('http://localhost:8083/#!/about');
        cy.wait(100);
        cy.get('input[id="search"]')
          .should('be.visible')
        cy.visit('http://localhost:8083/#!/help');
        cy.wait(100);
        cy.get('input[id="search"]')
          .should('be.visible')
            
    })

    it("L3d Search box searches job descriptions", () => {
    
        const searchterm = 'bowery'
        cy.visit('http://localhost:8083/');
        cy.wait(100);
        cy.get('input[id="search"]')
          .should('be.visible')
          .type(searchterm)
        cy.get('#searchbutton')
          .should('be.visible')
          .click()
        // check for jobs matching search term
        cy.get(".job")
          .should('have.length', 2)
          .each($job => {
            cy.wrap($job)
              .contains('Full Stack Software Engineer')
            cy.wrap($job)
              .contains('New York')
          })
    })
    
    
});