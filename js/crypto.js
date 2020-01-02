const apiKey =
    "7281d41481632ac57ab5f3c97ce31de1fea0d2dad356cd2ffa71b4e2f0ec2256";
const apiURL =
    "https://min-api.cryptocompare.com/data/exchange/top/volume?e=Binance&direction=TO";
const apiURLNews = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN";
const currencyUrl =
    "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

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
                    <div class="card">
                        <h6>${element.title}</h6>
                    </div>
                </div>`;
            });

            if (output !== "") {
                $("#newsResult").html(output);
            }
        },
    });
});

// To get cryptocurrency converted values
$(document).ready(function() {
    $.ajax({
        URL: currencyUrl,
        method: "GET",
        dataType: "JSON",
        success: function(coin) {
            let output = "";
            let cryptocurrency = coin.Data;

            cryptocurrency.forEach(element => {
                output += `<option value="">${cryptocurrency.FullName}</option>`;
            });

            if (output !== "") {
                $("#CryptoType").html(output);
            }
        },
    });
});
