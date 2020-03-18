describe("AirVisual API testing - GET List supported states in a country", () => {
  it("GET and Save reponse to test", () => {
    cy.fixture("testData").then(td => {
      cy.request(
        "/states?country=" + td.countryData.country + "&key=" + td.apiKey
      ).then(response => {
        cy.writeFile("cypress/./fixtures/./getStatesResponse.json", response);
      });
    });
  });

  it("Validate the header", () => {
    cy.validateHeader("getStatesResponse.json");
  });

  it("Validate the status code", () => {
    cy.validateCode("getStatesResponse.json");
  });

  it("Validate returned states for particular country", () => {
    cy.fixture("testData").then(td => {
      cy.validateBody("getStatesResponse.json", td.statesUSA);
    });
  });
  it("Validate particular state in response", () => {
    cy.fixture("testData").then(td => {
      cy.checkContent("getStatesResponse.json", td.countryData.state);
    });
  });
});
