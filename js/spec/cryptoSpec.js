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

  it("display news", function() {
    addTestElements(`<div id='newsResult'></div>`);
    const dummyAPIResponse = {
      Data: [
        {
          url: "some-url-1",
          title: "some-title-1",
          source_info: { img: "some-img-1" }
        },
        {
          url: "some-url-2",
          title: "some-title-2",
          source_info: { img: "some-img-2" }
        }
      ]
    };
    displayNews(dummyAPIResponse);
    const result = $("#newsResult").html();
    expect(result).toContain("some-url-1");
    expect(result).toContain("some-title-1");
    expect(result).toContain("some-img-1");
    expect(result).toContain("some-url-2");
    expect(result).toContain("some-title-2");
    expect(result).toContain("some-img-2");
  });

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

  it("will validate currency selections", function() {
    addTestElements(`
      <select id='CryptoType'></select>
      <select id='CurrencyType'></select>
      <button id='submitBtn'>Submit</button>
    `);
    const alertSpy = spyOn(window, "alert");
    submitBtnHandler();
    expect(alertSpy).toHaveBeenCalledWith("Please choose both values!");
  });
});
