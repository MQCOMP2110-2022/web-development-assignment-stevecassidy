

var assert = chai.assert;


describe("Level 3", () => {

    it("L3e Search results on #!/search/<term>", () => {
    
        const searchterm = 'flumox'
        cy.visit('http://localhost:8083/');
        cy.wait(100);
        cy.get('input[id="search"]')
          .should('be.visible')
          .type(searchterm)
        cy.get('#searchbutton')
          .should('be.visible')
          .click()
        // check for jobs matching search term
        cy.window().then(win => {
          expect(win.location.hash).to.equal('#!/search/'+searchterm)
        })
    })
    
    it("L3e Requesting search page performs a search", () => {
    
      const searchterm = 'bowery'
      cy.visit('http://localhost:8083/#!/search/'+searchterm)
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