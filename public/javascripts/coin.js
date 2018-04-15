// Fetch data from API
function getCoins() {
    fetch("https://api.coinmarketcap.com/v1/ticker/?limit=50")
    .then(
        function(response){
            if (response.status !== 200){
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data){
                addData(data);
            });            
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

// This function adds response from CMC API to the grid
function addData(data) {
    data.forEach(element => {
        var ticker = element['symbol'].toLowerCase();
        var coinInfo = document.getElementById('coinInfo');
        var coinImg = document.createElement('img');
        coinImg.src = '/images/icons/' + ticker + '.png'
        
        coinInfo.insertAdjacentHTML('beforeend', "<div>" + element['rank'] + "</div>");
        coinInfo.appendChild(coinImg);        
        coinInfo.insertAdjacentHTML('beforeend', "<div>" + element['name'] + "</div>");
        coinInfo.insertAdjacentHTML('beforeend', "<div>$ " + parseFloat(element['price_usd']).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        + "</div>");
        coinInfo.insertAdjacentHTML('beforeend', "<div>$ " + format(parseFloat(element['market_cap_usd']))
        + "</div>");                
    });
}

// This function will truncate the market cap
function format(n) {
    with (Math) {
        var base = floor(log(abs(n))/log(1000));
        var suffix = 'kmb'[base-1];
        return suffix ? String(n/pow(1000,base)).substring(0,5)+' '+suffix : ''+n;
    }
}

$(document).ready(function() {
    getCoins();
});