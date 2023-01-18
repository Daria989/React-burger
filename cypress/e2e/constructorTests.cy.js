import '@4tw/cypress-drag-drop';
// import { eq } from 'cypress/types/lodash';

describe('service is available', function() {
  const WEB_SERVER_URL = 'http://localhost:3000';
  const URL = 'https://norma.nomoreparties.space/api/orders';
  const LOGIN_DATA = {
    email: 'lfif@yandex.ru',
    password: '789456123'
  }

  const ORDER = {
    order: {number: 333987}, 
    success: true
  }

    before(function() {
      cy.visit(WEB_SERVER_URL);
    });

    it('should open and close ingredient modal window', function() {
      cy.visit('http://localhost:3000');
      cy.contains('Соберите бургер');
      cy.get("[data-testid = link]:first").click();
      cy.contains('Детали ингредиента');
      cy.get("[data-testid = close] > svg").click();
      cy.contains('Соберите бургер');
    });

    it('should handle drag and drop and order', function () {
      cy.visit(WEB_SERVER_URL);
      cy.intercept('POST', URL, ORDER).as('getOrder');
      cy.contains('Соберите бургер');
      cy.get("[data-testid = link]").each(($el, index) => { index > 0 ? cy.wrap($el).drag("[data-testid = dropConstructor]") : cy.wrap($el).drag("[data-testid = dropEmptyBox]")});
      cy.get('button').contains('Оформить заказ').click();
      cy.contains('Войти');
      cy.get(':nth-child(2) > .input').type(LOGIN_DATA.email);
      cy.get(':nth-child(3) > .input').type(LOGIN_DATA.password);
      cy.get('button').contains('Войти').click();
      cy.get('button').contains('Оформить заказ').click();
      cy.wait('@getOrder');
      cy.get("[data-testid = orderNumber]");
      cy.get("[data-testid = close] > svg").click();
      cy.contains('Соберите бургер');
    })
}); 