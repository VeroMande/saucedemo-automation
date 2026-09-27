/// <reference types="cypress" />

describe('Login', () => {
  let users

  beforeEach(() => {
    cy.fixture('users_credentials').then((data) => {
      users = data
    })
    cy.visit('/')
    cy.get('.login_logo').should('be.visible').and('contain', 'Swag Labs')
  })

  it('should successfully login with standard user', () => {
    cy.get('[data-test="username"]').should('be.visible').type(users.standardUser.username)
    cy.get('[data-test="password"]').should('be.visible').type(users.standardUser.password)
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.url().should('include', '/inventory.html')
  })

  it('should display an error with invalid credentials', () => {
    cy.get('[data-test="username"]').should('be.visible').type(users.standardUser.username)
    cy.get('[data-test="password"]').should('be.visible').type('wrong_password')
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username and password do not match any user')
  })

  it('should prevent login for locked out user', () => {
    cy.get('[data-test="username"]').should('be.visible').type(users.lockedOutUser.username)
    cy.get('[data-test="password"]').should('be.visible').type(users.lockedOutUser.password)
    cy.get('[data-test="login-button"]').should('be.enabled').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Sorry, this user has been locked out.')
    cy.url().should('not.include', '/inventory.html')
  })

  it('should successfully login with problem user', () => {
    cy.get('[data-test="username"]').type(users.problemUser.username)
    cy.get('[data-test="password"]').type(users.problemUser.password)
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('should successfully login with performance glitch user', () => {
    cy.get('[data-test="username"]').type(users.performanceGlitchUser.username)
    cy.get('[data-test="password"]').type(users.performanceGlitchUser.password)
    cy.get('[data-test="login-button"]').click()
    cy.url({timeout:50000}).should('include', '/inventory.html')
  })
})