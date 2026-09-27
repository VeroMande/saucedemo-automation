# SauceDemo E2E Automation

End-to-end test automation project for the [SauceDemo](https://www.saucedemo.com/) web application.

## Tech Stack

* Cypress
* JavaScript
* Node.js
* npm

## Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd saucedemo-automation
npm install
```

## Run Tests

Open Cypress in interactive mode:

```bash
npm run cy:open
```

Run all tests in headless mode:

```bash
npm run cy:run
```

## Test Coverage

The test suite covers:

* Login
* Invalid login
* Locked-out user
* Adding products to the cart
* Cart validation
* Checkout
* Checkout validation
* Order completion
* Order total calculation
