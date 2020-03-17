describe("Crypto API Tests", function() {
  beforeEach(function() {
    $("body").append("<div id='test-container'></div>");
  });

  afterEach(function() {
    $("#test-container").remove();
  });

  function addTestElements(elements) {
    $("#test-container").append(elements);
  }

  it("fetch crypto currencies", function() {
    // Create a new DIV to the Jasmine test page
    addTestElements("<div id='CryptoType'></div>");

    // Dummy API response
    const apiResponse = {
      Data: [
        {
          CoinInfo: { Name: "BTC", FullName: "Bitcoin" }
        },
        {
          CoinInfo: { Name: "ETH", FullName: "Ethereum" }
        }
      ]
    };

    fetchCryptoCurrencies(apiResponse);
    const result = $("#CryptoType").html();
    expect(result).toContain("BTC");
    expect(result).toContain("Bitcoin");
    expect(result).toContain("ETH");
    expect(result).toContain("Ethereum");
  });

  it("display rate conversion", function() {
    addTestElements(`<select id='CurrencyType'>
    <option value='USD'>US Dollar<option>
    </select>
    <div class='result'></div>
    </div>`);

    const dummyRateConversionResult = {
      USD: 6480.32
    };
    displayRateConversion(dummyRateConversionResult);
    expect($(".result").html()).toContain(
      "The cryptocurrency rate is 6480.32 USD"
    );
  });

  it("will clear the inputs when clean button is clicked", function() {
    addTestElements(`
      <select id='CryptoType'>
        <option value='BTC'>Bitcoin<option>
      </select>
      <select id='CurrencyType'>
        <option value='USD'>US Dollar<option>
      </select>
      <div class='result'></div>
      <button id='clearBtn'>Clear</button>
    `);
    clearBtnHandler();
    expect($("#CryptoType").val()).toBe("");
    expect($("#CurrencyType").val()).toBe("");
    expect($(".result").css("display")).toBe("none");
  });

  it("will validate currency selections", function() {});
});
