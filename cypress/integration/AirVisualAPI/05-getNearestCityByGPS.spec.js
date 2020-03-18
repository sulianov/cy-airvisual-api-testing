describe("AirVisual API testing - Get nearest city data (GPS coordinates)", () => {
  it("GET and Save reponse to test", () => {
    cy.fixture("testData").then(td => {
      cy.request(
        "/nearest_city?lat=" +
          td.kashgar.LATITUDE +
          "&lon=" +
          td.kashgar.LONGITUDE +
          "&key=" +
          td.apiKey
      ).then(response => {
        cy.writeFile(
          "cypress/./fixtures/./getNearestCityGPSResponse.json",
          response
        );
      });
    });
  });

  it("Validate the header", () => {
    cy.validateHeader("getNearestCityGPSResponse.json");
  });

  it("Validate the status code", () => {
    cy.validateCode("getNearestCityGPSResponse.json");
  });

  it("Validate data - City/Country/State", () => {
    cy.fixture("testData").then(td => {
      cy.validateData("getNearestCityGPSResponse", td.kashgar);
    });
  });

  it("Validate data - Location", () => {
    cy.validateLocation("getNearestCityGPSResponse");
  });

  it.only("Validate data - Current Data", () => {
    cy.validateCurrentData(
      "getNearestCityGPSResponse",
      "current",
      "weather",
      "pollution"
    );
  });

  it("Validate data - Weather", () => {
    cy.fixture("testData").then(td => {
      cy.compareKeys(
        "getNearestCityGPSResponse",
        "current",
        "weather",
        td.weatherKeys
      );
    });
  });

  it("Validate nearest city data - Pollution", () => {
    cy.fixture("testData").then(td => {
      cy.compareKeys(
        "getNearestCityGPSResponse",
        "current",
        "pollution",
        td.pollutionKeys
      );
    });
  });
});
