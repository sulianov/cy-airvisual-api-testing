// AirVisualAPI commands
Cypress.Commands.add("validateHeader", fixt => {
  cy.fixture(fixt).then(response => {
    let headers = response.headers;
    expect(headers["cache-control"]).to.be.eq("no-store");
    expect(headers["content-encoding"]).to.be.eq("gzip");
    expect(headers["content-type"]).to.be.eq("application/json");
  });
});

Cypress.Commands.add("validateCode", fixt => {
  cy.fixture(fixt).then(response => {
    expect(response["status"]).to.be.eq(200);
  });
});

Cypress.Commands.add("validateBody", (fixt, data) => {
  cy.fixture(fixt).then(response => {
    expect(response.body.data).to.be.deep.eq(data);
  });
});

Cypress.Commands.add("checkContent", (fixt, country) => {
  cy.fixture(fixt).then(response => {
    let arr = [];
    response.body.data.forEach(item => {
      arr.push(Object.values(item)[0]);
    });
    expect(arr).to.include(country);
  });
});

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

Cypress.Commands.add("validateLocation", fixt => {
  cy.fixture(fixt).then(response => {
    const resLocation = response.body.data["location"];

    expect(resLocation).to.not.be.null;
    expect(resLocation).to.have.property("type");
    expect(resLocation).to.have.property("coordinates");
    expect(resLocation["type"]).to.not.be.null;
    expect(resLocation["coordinates"]).to.not.be.null;
  });
});

Cypress.Commands.add("validateData", (respJSON, exp) => {
  cy.fixture(respJSON).then(response => {
    const resp = response.body.data;

    expect(resp["city"]).to.be.eq(exp.city);
    expect(resp["country"]).to.be.eq(exp.country);
    expect(resp["state"]).to.be.eq(exp.state);
  });
});

Cypress.Commands.add(
  "validateCurrentData",
  (respJSON, actProp, expPropOne, expPropTwo) => {
    cy.fixture(respJSON).then(response => {
      const resCurrent = response.body.data[actProp];

      expect(resCurrent).to.have.property(expPropOne);
      expect(resCurrent).to.have.property(expPropTwo);
    });
  }
);
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
