describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display login form', () => {
    cy.findByRole('button', { name: /acceder/i }).should('exist');
    cy.findByPlaceholderText(/email/i).should('exist');
    cy.findByPlaceholderText(/contraseña/i).should('exist');
    cy.findByRole('checkbox').should('exist');
  });

  it('Should display validations errors', () => {
    cy.findByPlaceholderText(/email/i).type('test');
    cy.findByRole('alert').should('not.exist');
    cy.findByPlaceholderText(/contraseña/i).type('test');
    cy.findByRole('button', { name: /acceder/i }).click();
    cy.findByRole('alert').within(() => {
      cy.findByText(/^la dirección de/i);
      cy.findByText(/^el campo contra/i);
    });

    cy.findByPlaceholderText(/email/i).clear().type('test@test.com');
    cy.findByRole('alert').within(() => {
      cy.findByText(/^la dirección de/i).should('not.exist');
      cy.findByText(/^el campo contra/i);
    });
    cy.findByPlaceholderText(/contraseña/i)
      .clear()
      .type('correcpassword');
    cy.findByRole('alert').should('not.exist');

    cy.findByRole('checkbox').should('exist').click();
    cy.findByRole('checkbox').should('be.checked');
  });

  it('Should display bad credentials errors', () => {
    cy.findByPlaceholderText(/email/i).type('prueba@prueba.com');
    cy.findByPlaceholderText(/contraseña/i).type('testpassword');

    cy.findByRole('button', { name: /acceder/i }).click();
    cy.findByRole('button', { name: /acceder/i }).should('be.disabled');
    cy.findByRole('alert').within(() => {
      cy.findByText(/^error/i);
    });

    cy.findByRole('button', { name: /acceder/i }).should('be.enabled');
  });

  it('Should login without remember doesnt keep session', () => {
    cy.findByPlaceholderText(/email/i).type('test@test.com');
    cy.findByPlaceholderText(/contraseña/i).type('testpassword');
    cy.findByRole('button', { name: /acceder/i }).click();
    cy.findByRole('button', { name: /acceder/i }).should('be.disabled');

    cy.findByText(/datos de usuario/i).should('exist');
    cy.findByText(/test@test.com/i).should('exist');
    cy.findByRole('button', { name: /cerrar sesión/i }).should('be.enabled');

    cy.reload();
    cy.findByText(/datos de usuario/i).should('not.exist');
    cy.findByPlaceholderText(/email/i).should('exist');
    cy.findByPlaceholderText(/contraseña/i).should('exist');
  });

  it('Should login without remember keep session and logout works', () => {
    cy.findByPlaceholderText(/email/i).type('test@test.com');
    cy.findByPlaceholderText(/contraseña/i).type('testpassword');
    cy.findByRole('checkbox').click();
    cy.findByRole('button', { name: /acceder/i }).click();
    cy.findByRole('button', { name: /acceder/i }).should('be.disabled');

    cy.findByText(/datos de usuario/i).should('exist');
    cy.findByText(/test@test.com/i).should('exist');
    cy.findByRole('button', { name: /cerrar sesión/i }).should('be.enabled');

    cy.reload();
    cy.findByText(/datos de usuario/i).should('exist');
    cy.findByPlaceholderText(/email/i).should('not.exist');
    cy.findByText(/datos de usuario/i).should('exist');
    cy.findByText(/test@test.com/i).should('exist');

    cy.findByRole('button', { name: /cerrar sesión/i }).click();
    cy.findByRole('button', { name: /cerrar sesión/i }).should('not.exist');
    cy.findByPlaceholderText(/email/i).should('exist');
    cy.findByRole('button', { name: /acceder/i }).should('be.enabled');
  });
});
