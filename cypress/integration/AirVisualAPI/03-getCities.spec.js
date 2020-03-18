describe("AirVisual API testing - List supported cities in a state", () => {
  it("GET and Save reponse to test", () => {
    cy.fixture("testData").then(td => {
      cy.request(
        "/cities?state=" +
          td.countryData.state +
          "&country=" +
          td.countryData.country +
          "&key=" +
          td.apiKey
      ).then(response => {
        cy.writeFile("cypress/./fixtures/./getCitiesResponse.json", response);
      });
    });
  });

  it("Validate the header", () => {
    cy.validateHeader("getCitiesResponse.json");
  });

  it("Validate the status code", () => {
    cy.validateCode("getCitiesResponse.json");
  });

  it("Validate returned cities for particular state and country", () => {
    cy.fixture("testData").then(td => {
      cy.validateBody("getCitiesResponse.json", td.citiesUSA);
    });
  });
  it("Validate particular city in response", () => {
    cy.fixture("testData").then(td => {
      cy.checkContent("getCitiesResponse.json", td.countryData.city);
    });
  });
});
