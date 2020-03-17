const apiKey =
  "7281d41481632ac57ab5f3c97ce31de1fea0d2dad356cd2ffa71b4e2f0ec2256";
const ratesUrl =
  "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";
const apiURLNews = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
const currencyUrl =
  "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD";

const pageSize = 4; // limit of news item for each page

function displayNews(news) {
  let output = "";

  let latestNews = news.Data;
  latestNews.forEach(element => {
    output += `
      <div class="col-lg-3 col-md-6 col-sm-12 news-item">
        <div class="card h-100 w-100">
          <a href="${element.url}" target="_blank" "style="text-decoration: 15rem;">
          <h6 class="card-title"> ${element.title}</h6></a>
          <img class="card-img-bottom" src="${element.source_info.img}"style="height: 17rem;">
        </div>
      </div>`;
  });

  if (output !== "") {
    $("#newsResult").html(output);
  }

  $(`#newsResult .news-item:gt(${pageSize - 1})`).hide(); // hide all items over page limit
}

function fetchCryptoCurrencies(coin) {
  let output = `<option value ="" disabled selected>- Select Cryptocurrency-</option>`;
  let cryptocurrency = coin.Data;

  cryptocurrency.forEach(element => {
    output += `<option value="${element.CoinInfo.Name}">${element.CoinInfo.FullName}</option>`;
  });

  if (output !== "") {
    $("#CryptoType").html(output);
  }
}

function displayRateConversion(result) {
  const ccyResult = $("#CurrencyType").val();
  const rateConversion = `
    <div>
      <h6>The cryptocurrency rate is ${result[ccyResult]} ${ccyResult}</h6>
    </div>`;

  $(".result")
    .show()
    .html(rateConversion);
}

//to get the news from the api
$(document).ready(function() {
  $.ajax({
    url: apiURLNews,
    method: "GET",
    dataType: "JSON",
    success: function(news) {
      displayNews(news);
    },
    error: function() {
      $("#newsResult").html(
        "The news cannot be displayed now due to an error. Please try later."
      );
    }
  });

  // To get top 10 cryptocurrencies
  $.ajax({
    url: currencyUrl,
    method: "GET",
    dataType: "JSON",

    success: function(coin) {
      fetchCryptoCurrencies(coin);
    },
    error: function() {
      $("#CryptoType").html(
        "The currency cannot be displayed now due to an error. Please try later."
      );
    }
  });
});

function clearBtnHandler() {
  $("#CryptoType").val("");
  $("#CurrencyType").val("");
  $(".result").hide();
}

function submitBtnHandler() {
  const coinResult = $("#CryptoType").val();
  const ccyResult = $("#CurrencyType").val();

  // Check if both inputs are available
  if (coinResult === null || ccyResult === null) {
    alert("Please choose both values!");
    return;
  }

  // Example URL : "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";
  const modifiedRatesUrl = `https://min-api.cryptocompare.com/data/price?fsym=${coinResult}&tsyms=${ccyResult}`;

  //displaying result on HTML
  $.ajax({
    url: modifiedRatesUrl,
    method: "GET",
    dataType: "JSON",
    success: function(result) {
      displayRateConversion(result);
    }
  });
}

// adding event listner to the clear button
$("#clearBtn").on("click", clearBtnHandler);

//adding event listener to the submit button
$("#submitBtn").on("click", submitBtnHandler);
