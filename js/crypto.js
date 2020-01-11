const apiKey =
    "7281d41481632ac57ab5f3c97ce31de1fea0d2dad356cd2ffa71b4e2f0ec2256";
const ratesUrl =
    "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";
const apiURLNews = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
const currencyUrl =
    "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD";

//to get the news from the api

$(document).ready(function() {
    $.ajax({
        url: apiURLNews,
        method: "GET",
        dataType: "JSON",
        success: function(news) {
            let output = "";

            let latestNews = news.Data;
            latestNews.forEach(element => {
                output += `
                <div class="col-md-4 col-sm-12">
                    <div class="card h-100 w-100">
                        <h6>${element.title}</h6>
                        <img src="${element.source_info.img}">
                        <a href="${element.url}" target="_blank" class="card-link">Read more</a>
                    </div>
                </div>`;
            });

            if (output !== "") {
                $("#newsResult").html(output);
            }
        },

        error: function () {
            $("#newsResult").html(
                "The news cannot be displayed now due to an error. Please try later."
            )
    };
});

// To get top 10 cryptocurrencies
$(document).ready(function() {
    $.ajax({
        url: currencyUrl,
        method: "GET",
        dataType: "JSON",

        success: function(coin) {
            let output = `<option value ="" disabled selected>- Select Cryptocurrency-</option>`;
            let cryptocurrency = coin.Data;

            cryptocurrency.forEach(element => {
                output += `<option value="${element.CoinInfo.Name}">${element.CoinInfo.FullName}</option>`;
            });

            if (output !== "") {
                $("#CryptoType").html(output);
            }
        },
        error: function() {
            $("#CryptoType").html(
                "The currency cannot be displayed now due to an error. Please try later."
            );
        },
    });
});

//adding event listener to the submit button

$("#submitBtn").on("click", function() {
    const coinResult = $("#CryptoType").val();
    const ccyResult = $("#CurrencyType").val();

    // Example URL : "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";
    const modifiedRatesUrl = `https://min-api.cryptocompare.com/data/price?fsym=${coinResult}&tsyms=${ccyResult}`;
    console.log("modifiedRatesUrl : " + modifiedRatesUrl);

    //displaying result on HTML

    $.ajax({
        url: modifiedRatesUrl,
        method: "GET",
        dataType: "JSON",
        success: function(result) {
            const rateConversion = `

                     <h6>The cryptocurrency rate is ${result[ccyResult]} ${ccyResult}</h6>
                </div>


                    `;
            $("#finalResult").html(rateConversion);
        },
    });
});
