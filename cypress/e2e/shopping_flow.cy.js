// shopping flow completo
/*
Login
 ↓
Products
 ↓
Aggiunge prodotto
 ↓
Cart
 ↓
Checkout
 ↓
Order completed
*/

/// <reference types="cypress" />

describe('Full shopping flow', () => {
    let standardUser

    before(() => {
        cy.fixture('users_credentials').then((users) => {
        standardUser = users.standardUser
        cy.visit('/')
        cy.login(standardUser.username, standardUser.password)
        })
    })

    after(() => {
        cy.get('#react-burger-menu-btn').should('be.visible').click()
        cy.get('[data-test="logout-sidebar-link"]').should('be.visible').click()
        cy.location('pathname').should('eq', '/')
    })

    it('User completed a purchase successfully', () => {
        cy.get('[data-test="title"]').should('be.visible').and('contain', 'Products')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click()
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain', '1')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.location('pathname').should('eq', '/cart.html')
        cy.get('[data-test="inventory-item-name"]').should('be.visible').and('contain', 'Sauce Labs Backpack')
        cy.get('[data-test="checkout"]').should('be.visible').click()
        cy.location('pathname').should('eq', '/checkout-step-one.html')
        cy.get('[data-test="firstName"]').should('be.visible').type('Mario')
        cy.get('[data-test="lastName"]').should('be.visible').type('Rossi')
        cy.get('[data-test="postalCode"]').should('be.visible').type('20100')
        cy.get('[data-test="continue"]').should('be.enabled').click()
        cy.location('pathname').should('eq', '/checkout-step-two.html')
        cy.get('[data-test="inventory-item-name"]').should('be.visible').and('contain', 'Sauce Labs Backpack')
        cy.get('[data-test="finish"]').should('be.visible').click()
        cy.location('pathname').should('eq', '/checkout-complete.html')
        cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!')
    })
})