# SauceDemo E2E Automation

End-to-end test automation project for the [SauceDemo](https://www.saucedemo.com/) web application.

## Tech Stack

* Cypress
* JavaScript
* Node.js
* npm

## Project Setup

### Prerequisites

Make sure the following are installed:

* Node.js -> ```node --version```
* npm ->  ```npm --version```
* Git -> ```git --version```

### Installation

Clone the repository and move into the project directory:

```bash
git clone <repository-url>
cd saucedemo-automation
```

Install the project dependencies:

```bash
npm install
```

### Run Cypress

Open Cypress in interactive mode:

```bash
npx cypress open
```

Run the tests in headless mode:

```bash
npx cypress run
```

## Project Structure

```text
saucedemo-automation/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Test Strategy

The test suite will focus on the main user journeys of the SauceDemo application, with particular attention to:

* Authentication
* Product selection
* Shopping cart
* Checkout
* Order completion

The goal is to validate realistic end-to-end user flows while keeping the test suite maintainable and reliable.

## Future Improvements

Potential improvements to the project include:

* CI/CD integration
* Cross-browser execution
* Test reporting
* Improved test data management
* Accessibility testing
* Visual regression testing
