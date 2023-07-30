describe('WeatherShopper', () => {
  const data = require('../../config.json');

  beforeEach(() => {
    cy.visit('https://weathershopper.pythonanywhere.com/');
    cy.viewport('macbook-13');
  });

  it('should make a successful purchase based on the weather', () => {
    cy.get('#temperature').then(($temp) => {
      const temperature = parseInt($temp.text().match(/\d+/)[0]);
      if (temperature <= 19) {
        console.log('The current temperature is ' + temperature + '. Selecting moisturizers.');
        cy.contains('Buy moisturizers').click();
        getCheapestAloe();
        getCheapestAlmond();
        cartClickAndPurchaseMoisturizer(data).then(() => {
          cardPayment(data);
        });
      } else {
        console.log('The current temperature is ' + temperature + '. Selecting sunscreens.');
        cy.contains('Buy sunscreens').click();
        getCheapestSPF30();
        getCheapestSPF50();
        cartClickAndPurchaseSunscreen(data).then(() => {
          cardPayment(data);
        });
      }
    });
  });
});

function getCheapestSPF30() {
  let cheapestPrice = Infinity;
  let cheapestElem = null;

  cy.get('p:contains("SPF-30")').each(($elem) => {
    const priceText = $elem.next().text();
    const priceMatch = priceText.match(/\d+/);
    if (priceMatch) {
      const price = parseInt(priceMatch[0]);
      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestElem = $elem.next();
      }
    } else {
      console.log("Could not find price for SPF-30 sunscreen.");
    }
  }).then(() => {

    if (cheapestElem) {
      console.log('Found SPF-30 sunscreen with price: ' + cheapestPrice);
      cy.wrap(cheapestElem).next().contains('Add').should('be.visible').click();
      console.log('Added cheapest SPF-30 sunscreen to cart.');

    }
  });
}

function getCheapestSPF50() {
  let cheapestPrice = Infinity;
  let cheapestElem = null;

  cy.get('p:contains("SPF-50")').each(($elem) => {
    const priceText = $elem.next().text();
    const priceMatch = priceText.match(/\d+/);
    if (priceMatch) {
      const price = parseInt(priceMatch[0]);
      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestElem = $elem.next();
      }
    } else {
      console.log("Could not find price for SPF-50 sunscreen.");
    }
  }).then(() => {

    if (cheapestElem) {
      console.log('Found SPF-50 sunscreen with price: ' + cheapestPrice);
      cy.wrap(cheapestElem).next().contains('Add').should('be.visible').click();
      console.log('Added cheapest SPF-50 sunscreen to cart.');
    }
  });
}

function getCheapestAloe() {
  let cheapestPrice = Infinity;
  let cheapestElem = null;

  return cy.get('p:contains("Aloe")').each(($elem) => {
    const priceText = $elem.next().text();
    console.log(priceText)
    const priceMatch = priceText.match(/\d+/);
    if (priceMatch) {
      const price = parseInt(priceMatch[0]);
      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestElem = $elem.next();
      }
    } else {
      console.log("Could not find price for Aloe moisturizer.");
    }
  }).then(() => {
    if (cheapestElem) {
      console.log('Found Aloe moisturizer with price: ' + cheapestPrice);
      cy.wrap(cheapestElem).next().contains('Add').should('be.visible').click();
      console.log('Added cheapest Aloe moisturizer to cart.');
    }
  });
}


function getCheapestAlmond() {
  let cheapestPrice = Infinity;
  let cheapestElem = null;

  cy.get('p:contains("Almond")').each(($elem) => {
    const priceText = $elem.next().text();
    console.log(priceText)
    const priceMatch = priceText.match(/\d+/);
    if (priceMatch) {
      const price = parseInt(priceMatch[0]);
      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestElem = $elem.next();
        console.log(cheapestPrice)
      }
    } else {
      console.log("Could not find price for Almond moisturizer.");
    }
  }).then(() => {

    if (cheapestElem) {
      console.log('Found Almond moisturizer with price: ' + cheapestPrice);
      cy.wrap(cheapestElem).next().contains('Add').should('be.visible').click();
      console.log('Added cheapest Almond moisturizer to cart.');
    }

  });
}

function cartClickAndPurchaseMoisturizer() {
  cy.contains('Cart').click();
  cy.get('button').contains('Pay with Card').should('be.visible').click().wait(1000);
  console.log('Purchased moisturizers successfully.');
  return cy.wrap(null);
}


function cartClickAndPurchaseSunscreen() {
  cy.contains('Cart').click();
  cy.get('button').contains('Pay with Card').should('be.visible').click();
  console.log('Purchased sunscreens successfully.');
  return cy.wrap(null);
}

function cardPayment(data) {
  cy.get('iframe[name="stripe_checkout_app"]').should('be.visible').then(($iframe) => {

    const iframeWindow = $iframe[0].contentWindow;
    const iframeDocument = iframeWindow.document;

    const emailInput = iframeDocument.querySelector('input#email');
    const cardNumberInput = iframeDocument.querySelector('input#card_number');
    const ccExp = iframeDocument.querySelector('input#cc-exp');
    const ccCSC = iframeDocument.querySelector('input#cc-csc');

    if (emailInput && cardNumberInput && ccExp && ccCSC) {
      emailInput.value = data.EMAIL;
      cardNumberInput.value = data.CARD_NUMBER;
      ccExp.value = data.CARD_YEAR;
      ccCSC.value = data.CVC;

      cy.wrap(iframeDocument).find('#submitButton').should('exist').click();

    } else {
      console.log('Input field not found within the iframe.');
    }

  });
}