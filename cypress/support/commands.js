Cypress.Commands.add('login', (username, password) => { 
    cy.get('[data-test="username"]').should('be.visible').type(username)
    cy.get('[data-test="password"]').should('be.visible').type(password)
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.location('pathname').should('eq', '/inventory.html')
})

Cypress.Commands.add('logout', () => { 
    cy.get('#react-burger-menu-btn').should('be.visible').click()
    cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click()
    cy.location('pathname').should('eq', '/')
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })