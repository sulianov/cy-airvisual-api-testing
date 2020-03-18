describe("AirVisual API testing - GET List supported countries", () => {
  it("GET and Save reponse to test", () => {
    cy.fixture("testData").then(td => {
      cy.request("/countries?key=" + td.apiKey).then(response => {
        cy.writeFile(
          "cypress/./fixtures/./getCountriesResponse.json",
          response
        );
      });
    });
  });

  it("Validate the header", () => {
    cy.validateHeader("getCountriesResponse.json");
  });

  it("Validate the status code", () => {
    cy.validateCode("getCountriesResponse.json");
  });

  it("Validate response body not null", () => {
    cy.fixture("getCountriesResponse.json").then(response => {
      expect(response.body).to.not.be.null;
    });
  });

  it.only("Validate all returned countries", () => {
    cy.fixture("testData").then(td => {
      cy.validateBody("getCountriesResponse.json", td.countries);
    });
  });

  it("Validate particular country in response", () => {
    cy.fixture("testData").then(td => {
      cy.checkContent("getCountriesResponse.json", td.countryData.country);
    });
  });
});
