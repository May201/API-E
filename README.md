# Crypto Currency Converter

This project aims to provide a quick reference to find the conversion of crypto currencies to fiat currencies. The currency values are provided by a 3rd party service - cryptocompare.com

This app has only one page and organises data into different parts:

- Currency Conversion
- Crypto related News

## Currency Conversion

This section consists of a form to capture the combination of crypto and fiat currency like (BTC, USD). Clicking the `Submit` button will invoke the API from the 3rd party service and display the availabel conversion rate.

## Crypto related News

There are rapid changes happening the crypto space and the 3rd party service provides an API to get the top news in the crypto space. This section displays the top 4 news stories.

## Code Organization

There is one Javascript source file and a CSS file that is used to render the page along with other image assets. These are organized in their own respective folders to make it easier to access and update. There is an `index.html` file at the root of the project that links to all the related resources and displays the web application.

A `.gitignore` file has been added to prevent any VSCode settings from being included in the git repository.

### External libraries

- `bootstrap` framework has been used for managing the CSS features and for having baseline styles applied.

- `jquery` library has been used to simplify the operations on the DOM and also as a dependency for the CSS framework.

## Testing

Unit tests have been included to verify the changes introduced by different actions and API calls. `jasmine` has been used for this project and the `spec` file is available in the `js/spec` folder. An HTML page is available in the same folder that links the required `jasmine` dependencies imported from a CDN. The `spec` and source files are included in this HTML file. Tests will be executed when opening `js/spec/index.html` file.

### Structure

To test the DOM changes, a new DIV element with id `test-container` is injected for each unit test and any DOM elements required for a test are injected into this element. After a test is over, this test container is removed. This makes sure that any DOM changes introduced in one test does not affect other tests. A helper method has been addded to the test suite to make it add test DOM elements easily.
