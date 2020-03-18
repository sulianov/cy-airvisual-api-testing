# Cypress - AirVisual API testing
## Demo project for testing AirVisual API using Cypress framework.

In order to speed up the tests in each *.spec.js* file I call the API only once - in a separate *it* and then use *cy.writeFile* to save response in a *fixtures* folder.
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
 I reuse it later for all the following tests using *cy.fixture*.
 ```
   it("Validate response body not null", () => {
    cy.fixture("getCountriesResponse.json").then(response => {
      expect(response.body).to.not.be.null;
    });
  });
 ```
All the data used for testing saved in *testData.json*.
```{
  "kashgar": {
    "LATITUDE": 40,
    "LONGITUDE": 74,
    "city": "Kashgar",
    "state": "Xinjiang",
    "country": "China"
  },
  "brno": {
    "city": "Brno",
    "country": "Czech Republic",
    "state": "South Moravian"
  },
  "apiKey": "9e797135-33d5-4ef4-b2be-867f7a258b99"
 ...
 ```
If same test occurs more than one time it has its own *Cypress.Command* saved in *commands.js*.
### On the example of the *"Validate the header"* test.
*commands.js*
```
Cypress.Commands.add("validateHeader", fixt => {
  cy.fixture(fixt).then(response => {
    let headers = response.headers;
    expect(headers["cache-control"]).to.be.eq("no-store");
    expect(headers["content-encoding"]).to.be.eq("gzip");
    expect(headers["content-type"]).to.be.eq("application/json");
  });
});
```
*.spec.js*
```
it("Validate the header", () => {
    cy.validateHeader("getCountriesResponse.json");
  });
```
