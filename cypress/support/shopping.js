export function addProductToCart(productList) {
    cy.get('[data-test="title"]').should('be.visible').and('contain', 'Products')
    
    for (const product of productList) {
        cy.log(product)
        cy.get(`[data-test="add-to-cart-${product.selector}"]`).should('be.visible').click()
    }
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('contain', productList.length)
}

export function removeProductToCart(removeProducts){
    for (const product of removeProducts) {
        cy.log(product)
        cy.get(`[data-test="${product}"]`).should('be.visible').click()
    }
}

export function goToCart(){
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.location('pathname').should('eq', '/cart.html')
}

export function checkProductsInCart(productList){
    for (const product of productList) {
        cy.get('[data-test="inventory-item-name"]').should('contain', product.name)
    }
}

export function checkout(){
    cy.get('[data-test="checkout"]').should('be.visible').click()
}

export function step1_checkoutInformation(firstName, lastName, postalCode){
    cy.location('pathname').should('eq', '/checkout-step-one.html')
    cy.get('[data-test="firstName"]').should('be.visible').type(firstName)
    cy.get('[data-test="lastName"]').should('be.visible').type(lastName)
    cy.get('[data-test="postalCode"]').should('be.visible').type(postalCode)
    cy.get('[data-test="continue"]').should('be.enabled').click()
}

export function step2_checkoutOverview(products){
    cy.location('pathname').should('eq', '/checkout-step-two.html')
    for (const product of products){
        cy.get('[data-test="inventory-item-name"]').should('be.visible').and('contain', product.name)
        cy.get('[data-test="inventory-item-price"]').should('be.visible').and('contain', product.price)
    }

    //// summary information
    cy.get('.summary_info').within(() => {
        cy.get('[data-test="payment-info-label"]').contains('Payment Information:')
        cy.get('[data-test="payment-info-value"]').contains('SauceCard #31337')
        cy.get('[data-test="shipping-info-label"]').contains('Shipping Information:')
        cy.get('[data-test="shipping-info-value"]').contains('Free Pony Express Delivery!')
        cy.get('[data-test="total-info-label"]').contains('Price Total')
    })

    // Item total
    let total = 0
    cy.get('[data-test="inventory-item-price"]').each(($price) => {
        cy.wrap($price).invoke('text').then((itemPrice) => {
            cy.log(itemPrice)
            const price = parseFloat(itemPrice.replace('$', ''))
            total += price
            cy.log(total)
        })
    }).then(() => {
        cy.log("Calculated total:" + total)

        cy.get('[data-test="subtotal-label"]').invoke('text').then((subtotalUI) => {
            const subtotal = parseFloat(subtotalUI.replace('Item total: $', ''))
            cy.log("subtotalUI:" + subtotal)
            expect(subtotal).to.eq(total)
        })

        cy.get('[data-test="tax-label"]').invoke('text').then((tax) => {
            const taxValue = parseFloat(tax.replace('Tax: $', ''))
            const expectedTotal = total + taxValue
            cy.log(`Expected total: ${expectedTotal}`)

            cy.get('[data-test="total-label"]').invoke('text').then((totalUI) => {
                const totalValue = parseFloat(totalUI.replace('Total: $', ''))
                cy.log(`Total UI: ${totalValue}`)
                expect(totalValue).to.eq(expectedTotal)
            })
        })
    })
}

export function completeOrder(){
    cy.get('[data-test="finish"]').should('be.visible').click()
    cy.location('pathname').should('eq', '/checkout-complete.html')
    cy.get('[data-test="complete-text"]').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!')
    cy.get('[data-test="back-to-products"]').should('exist').click()
}