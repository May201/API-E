const apiKey = "7281d41481632ac57ab5f3c97ce31de1fea0d2dad356cd2ffa71b4e2f0ec2256";
const apiURL = "https://min-api.cryptocompare.com/data/exchange/top/volume?e=Binance&direction=TO";
const apiURLNews ="https://min-api.cryptocompare.com/data/v2/news/?lang=EN"

//to get the news from the api on page load

$(document.ready).function(){
	 
	

$ajax({
	url:apiURLNews;
	method:'GET';
	dataType:'JSON';
	success: function(news){
		let output='';

		output+=

	}
}

