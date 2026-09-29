/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.login_logo').should('be.visible').and('contain', 'Swag Labs')
  })

  it('should successfully login with standard user', () => {
    cy.getUser('standardUser').then((user) => {
      cy.get('[data-test="username"]').should('be.visible').type(user.username)
      cy.get('[data-test="password"]').should('be.visible').type(user.password)
    })
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.url().should('include', '/inventory.html')
  })

  it('should display an error with invalid credentials', () => {
    cy.getUser('standardUser').then((user) => {
      cy.get('[data-test="username"]').should('be.visible').type(user.username)
    })
    cy.get('[data-test="password"]').should('be.visible').type('wrong_password')
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match any user')
  })

  it('should prevent login for locked out user', () => {
    cy.getUser('lockedOutUser').then((user) => {
      cy.get('[data-test="username"]').should('be.visible').type(user.username)
      cy.get('[data-test="password"]').should('be.visible').type(user.password)
    })
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Sorry, this user has been locked out.')
    cy.url().should('not.include', '/inventory.html')
  })

  it('should successfully login with performance glitch user', () => {
    cy.getUser('problemUser').then((user) => {
      cy.get('[data-test="username"]').should('be.visible').type(user.username)
      cy.get('[data-test="password"]').should('be.visible').type(user.password)
    })
    cy.get('[data-test="login-button"]').click()
    cy.url({timeout:50000}).should('include', '/inventory.html')
  })
})