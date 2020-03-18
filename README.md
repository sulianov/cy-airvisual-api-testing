# cy-airvisual-api-testing
## Demo project for testing AirVisual API using Cypress framework.

In order to speed up the tests in each *.spec.js* file I call the API only once - in a separate *it* and then use *cy.writeFile* to save response in a *fixtures* folder so I could reuse it later for all the following tests.

### 01-getCountries.spec.js
```
  it("GET and Save reponse to test", () => {
    cy.fixture("testData").then(td => {
      cy.request("/countries?key=" + td.apiKey).then(response => {
        cy.writeFile(
          "cypress/./fixtures/./getCountriesResponse.json",
          response
        );
      });
    });
```
