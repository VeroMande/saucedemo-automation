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

import { addProductToCart, checkout, checkProductsInCart, completeOrder, goToCart, step1_checkoutInformation, step2_checkoutOverview } from "../support/shopping"
 
const products = [
    {
        selector: 'sauce-labs-fleece-jacket',
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99'
    },
    {
        selector: 'sauce-labs-backpack',
        name: 'Sauce Labs Backpack',
        price: '$29.99'
    },
    {
        selector: 'sauce-labs-bolt-t-shirt',
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99'
    }
]


describe('Full shopping flow', () => {
    let standardUser

    beforeEach(() => {
        cy.fixture('users_credentials').then((users) => {
        standardUser = users.standardUser
        cy.visit('/')
        cy.login(standardUser.username, standardUser.password)
        })
    })

    afterEach(() => {
        cy.logout()
    })

    it('User completed a purchase successfully', () => {
        addProductToCart(products)
        goToCart()
        checkProductsInCart(products)
        checkout()
        step1_checkoutInformation('Mario', 'Rossi', 20100)
        step2_checkoutOverview(products)
        completeOrder()
    })

    it('User cannot continue checkout without first name', () => {
        addProductToCart(products)
        goToCart()
        checkProductsInCart(products)
        checkout()
        cy.location('pathname').should('eq', '/checkout-step-one.html')
        cy.get('[data-test="firstName"]').should('be.visible')
        cy.get('[data-test="lastName"]').should('be.visible').type('Rossi')
        cy.get('[data-test="postalCode"]').should('be.visible').type('20100')
        cy.get('[data-test="continue"]').should('be.enabled').click()
        cy.get('[data-test="error-button"]').should('be.visible').parent().and('contain', 'Error: First Name is required')
    })

    it('User cannot continue checkout without Lastname', () => {
        addProductToCart(products)
        goToCart()
        checkProductsInCart(products)
        checkout()
        cy.location('pathname').should('eq', '/checkout-step-one.html')
        cy.get('[data-test="firstName"]').should('be.visible').type('Mario')
        cy.get('[data-test="lastName"]').should('be.visible')
        cy.get('[data-test="postalCode"]').should('be.visible').type('20100')
        cy.get('[data-test="continue"]').should('be.enabled').click()
        cy.get('[data-test="error-button"]').should('be.visible').parent().and('contain', 'Error: Last Name is required')
    })

    it('User cannot continue checkout without Postal Code', () => {
        addProductToCart(products)
        goToCart()
        checkProductsInCart(products)
        checkout()
        cy.location('pathname').should('eq', '/checkout-step-one.html')
        cy.get('[data-test="firstName"]').should('be.visible').type('Mario')
        cy.get('[data-test="lastName"]').should('be.visible').type('Rossi')
        cy.get('[data-test="postalCode"]').should('be.visible')
        cy.get('[data-test="continue"]').should('be.enabled').click()
        cy.get('[data-test="error-button"]').should('be.visible').parent().and('contain', 'Error: Postal Code is required')
    })
})