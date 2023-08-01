# Weather Shopper


To begin, clone the repository containing the code. After cloning, install the necessary dependencies by running the command "npm i" in your terminal. Once the dependencies are installed, To access the Cypress test portal, use the command "npm start", which will open the Cypress test portal interface. From there, you can interact with the test runner.To initiate the test suite, use the command "npm run test". This will start the execution of all the Cypress tests.

# Docker command for testing

* docker build .
* docker compose up


During the execution of the tests inside the Docker container, a video output will be generated and stored within the container at the following location: "/app/cypress/videos/spec.cy.js.mp4". This video will provide a visual representation of the test execution that occurred inside the container.