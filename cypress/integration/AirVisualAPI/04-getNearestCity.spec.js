describe("AirVisual API testing - Get nearest city data (IP geolocation)", () => {
  it("GET and Save reponse to test", () => {
    cy.fixture("testData").then(td => {
      cy.request("/nearest_city?key=" + td.apiKey).then(response => {
        cy.writeFile(
          "cypress/./fixtures/./getNearestCityResponse.json",
          response
        );
      });
    });
  });

  it("Validate the header", () => {
    cy.validateHeader("getNearestCityResponse.json");
  });

  it("Validate the status code", () => {
    cy.validateCode("getNearestCityResponse.json");
  });

  it("Validate nearest city data - City/Country/State", () => {
    cy.fixture("testData").then(td => {
      cy.validateData("getNearestCityResponse", td.brno);
    });
  });

  it("Validate nearest city data - Location", () => {
    cy.validateLocation("getNearestCityResponse");
  });

  it.only("Validate nearest city data - Current Data", () => {
    cy.validateCurrentData(
      "getNearestCityResponse",
      "current",
      "weather",
      "pollution"
    );
  });

  it("Validate nearest city data - Weather", () => {
    cy.fixture("testData").then(td => {
      cy.compareKeys(
        "getNearestCityResponse",
        "current",
        "weather",
        td.weatherKeys
      );
    });
  });

  it("Validate nearest city data - Pollution", () => {
    cy.fixture("testData").then(td => {
      cy.compareKeys(
        "getNearestCityResponse",
        "current",
        "pollution",
        td.pollutionKeys
      );
    });
  });
});
