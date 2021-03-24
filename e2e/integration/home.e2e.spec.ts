describe('Home', () => {
  before(() => {
    cy.visit('/');
  });

  it('loads examples', () => {
    cy.contains('Replace me with something relevant');
  });
});
