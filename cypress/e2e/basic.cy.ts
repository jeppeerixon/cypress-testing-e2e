
beforeEach("load local host", () => {
    cy.visit("/");
});

describe("Tests for our happy flow", () => {

    it("should find search input, type and get and results", () => {
        cy.get("input").type("joker").should("have.value", "joker");
    
        cy.get("button:first").click();

        cy.get(".movie").should("have.length", 10);

        cy.get(".movie:first > h3").should("contain.text", "Joker");
    
    });

    it("should find search input, type and get results using keyboard", () => {
        cy.get("input").type("batman").should("have.value", "batman").type('{enter}');

        cy.get(".movie").should("have.length.at.least", 9);

        cy.get(".movie:first-child > h3").should("contain.text", "Batman Begins");
    
    });

});

describe("Tests for our not so happy flow", () => {
    it("should not find any search results", () => {

        cy.get("#searchText").type("borde inte hitta någon film").should("have.value", "borde inte hitta någon film");
    
        cy.get("#search").click();

        cy.get("p").should("contain.text", "Inga sökresultat att visa");

    });

});

describe("Tests using mockdata/fixtures", () => {

    it("should intercept respons and post mockdata", () => {

        cy.intercept("GET", "http://omdbapi.com/*", {fixture: 'mockdata'}).as('omdbGet')
    
        cy.get('#searchText').type("batman");
        cy.get("#search").click();

        cy.wait('@omdbGet').its('request.url').should('contain', "batman");

        cy.get(".movie").should("have.length", 2);
        cy.get(".movie:first > h3").should("contain.text", "Old Movie");
        
    });

    it("should not find any search results", () => {

        cy.intercept("GET", "http://omdbapi.com/*", {fixture: 'errormessage'}).as('omdbGet')
    
        cy.get('#searchText').type("superman");
        cy.get("#search").click();

        cy.wait('@omdbGet').its('request.url').should('contain', "superman");

        cy.get("p").should("contain.text", "Inga sökresultat att visa");
        
    });

});