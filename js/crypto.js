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
            // let pagination;

            let latestNews = news.Data;
            latestNews.forEach(element => {
                output += `
                <div class="col-md-4 col-sm-12 news-item">
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

            //pagination
            const numberofItems = $("#newsResult").children().length;
            const pageSize = 3;

            $(`#newsResult .news-item:gt(${pageSize - 1})`).hide();

            const totalPages = Math.ceil(numberofItems / pageSize);

            for (i = 1; i <= totalPages; i++) {
                $(".pagination").append(`<li class="page-item">
                    <a class="page-link" href="#"> ${i} </a>
                </li>`);
            }

            $(".pagination").append(`<li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>`);

            $(".pagination li").on("click", function() {
                // Removing the "active" class from all of the paginatione elements
                $(".pagination li").removeClass("active");

                // Add the "active" class to the currently clicked element
                $(this).addClass("active");

                // Current selected page number
                const currentPage = $(this).index();

                // Calculate the start and end index for the current page
                const currentPageStartIndex = currentPage * pageSize - 1;
                const currentPageEndIndex = currentPageStartIndex + pageSize;

                // Hide all the loaded news elements
                $("#newsResult .news-item").hide();

                // Show only the elements for the currently selected page
                for (
                    let i = currentPageStartIndex;
                    i < currentPageEndIndex;
                    i++
                ) {
                    $(`#newsResult .news-item:eq(${i})`).show();
                }
            });
            // function createPagination(nxt,prev){
            //     if(nxt && prev ){
            //         return `<button onclick="writeToDocument('${prev}')">Previous</button>
            //                 <button onclick="writeToDocument('${nxt}')">Next</button>`;

            //     }else if (nxt && !prev){
            //         return `<button onclick="writeToDocument('${nxt}')">Next</button>`;
            //     }else if (!nxt && prev){
            //         return `< button onclick = "writeToDocument('${prev}')"> Previous</button >`;
            //     }
            // }
            //             if(latestNews.next || latestNews.previous){
            //                 pagination= createPagination(latestNews.next,latestNews.previous)
            //             }
        },
        error: function() {
            $("#newsResult").html(
                "The news cannot be displayed now due to an error. Please try later."
            );
        },
    });
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
