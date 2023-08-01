# Weather Shopper

To begin, clone the repository containing the code. After cloning, install the necessary dependencies by running the command "npm i" in your terminal. Once the dependencies are installed, To access the Cypress test portal, use the command "npm start", which will open the Cypress test portal interface. From there, you can interact with the test runner.To initiate the test suite, use the command "npm run test". This will start the execution of all the Cypress tests.

Next, create a Docker image for the Cypress tests using the command "docker build -t cypress-test-image .". Once the Docker image is successfully built, run the Cypress tests inside a container by executing "docker run -it --name cypress-test-container cypress-test-image".

During the execution of the tests inside the Docker container, a video output will be generated and stored within the container at the following location: "/app/cypress/videos/spec.cy.js.mp4". This video will provide a visual representation of the test execution that occurred inside the container.