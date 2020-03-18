# Cypress - AirVisual API testing

## Demo project for testing AirVisual API using Cypress framework.

In order to speed up test runs in each _.spec.js_ file I call API only once - in a separate _it_ - and then use _cy.writeFile_ to save response in a _fixtures_ folder.

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

I call it later for all the following tests using _cy.fixture_ and _then_.

```
  it("Validate response body not null", () => {
   cy.fixture("getCountriesResponse.json").then(response => {
     expect(response.body).to.not.be.null;
   });
 });
```

All the data used for testing saved in _testData.json_.

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

If same test occurs more than one time it has its own _Cypress.Command_ saved in _commands.js_.

On the example of the _"Validate the header"_ test.

_commands.js_

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

_.spec.js_

```
it("Validate the header", () => {
    cy.validateHeader("getCountriesResponse.json");
  });
```

In order to check particular country in the object of countries I use _forEach_.

_commands.js_

```
Cypress.Commands.add("checkContent", (fixt, country) => {
  cy.fixture(fixt).then(response => {
    let arr = [];
    response.body.data.forEach(item => {
      arr.push(Object.values(item)[0]);
    });
    expect(arr).to.include(country);
  });
});
```

_.spec.js_

```
it("Validate particular country in response", () => {
cy.fixture("testData").then(td => {
cy.checkContent("getCountriesResponse.json", td.countryData.country);
});
});
```

I also use _forEach_ to compare two arrays - actual one from the response and expected one from the _fixtures.json_.
_comands.js_

```
Cypress.Commands.add(
  "compareKeys",
  (respJSON, parentObj, testedObj, expectedKeys) => {
    cy.fixture(respJSON).then(resp => {
      var ind = 0;
      Object.keys(resp.body.data[parentObj][testedObj]).forEach(key => {
        expect(key).to.be.eq(expectedKeys[ind]);
        ind = ind + 1;
      });
    });
  }
);
```

_.spec.js_

```
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
```
