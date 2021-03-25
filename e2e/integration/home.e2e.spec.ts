describe('Home', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1251, 882);
  });

  it('should display welcome msg', () => {
    cy.findByText(/acceder/i);
  });
});
