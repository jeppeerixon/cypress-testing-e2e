
it("should find search input", () => {
    cy.visit("http://localhost:1234");

    cy.get("input").type("joker").should("have.value", "joker");

    cy.get("button:first").click();

})