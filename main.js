document.addEventListener('DOMContentLoaded', function() {
    fetchCryptocurrencyData();
});

function fetchCryptocurrencyData() {
    const apiUrl = 'https://api.binance.com/api/v3/ticker/24hr';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCryptocurrencyData(data);
        })
        .catch(error => {
            console.error('Error fetching cryptocurrency data:', error);
            alert("Error fetching cryptocurrency data");
        });
}

function displayCryptocurrencyData(data) {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = ''; 
    
    const gainers = data.filter(coin => parseFloat(coin.priceChangePercent) > 0).slice(0, 10);
    const losers = data.filter(coin => parseFloat(coin.priceChangePercent) < 0).slice(0, 10);


    const gainersTitle = document.createElement('h2');
    gainersTitle.textContent = 'Top 10 Gainers';
    appDiv.appendChild(gainersTitle);

    const gainersList = document.createElement('ul');
    gainers.forEach(coin => {
        const listItem = document.createElement('li');
        listItem.textContent = `${coin.symbol}: ${parseFloat(coin.priceChangePercent).toFixed(2)}% - Price: $${parseFloat(coin.lastPrice).toFixed(2)}`;
        listItem.style.color = 'green'; 
        gainersList.appendChild(listItem);
    });
    appDiv.appendChild(gainersList);


    const losersTitle = document.createElement('h2');
    losersTitle.textContent = 'Top 10 Losers';
    appDiv.appendChild(losersTitle);

    const losersList = document.createElement('ul');
    losers.forEach(coin => {
        const listItem = document.createElement('li');
        listItem.textContent = `${coin.symbol}: ${parseFloat(coin.priceChangePercent).toFixed(2)}% - Price: $${parseFloat(coin.lastPrice).toFixed(2)}`;
        listItem.style.color = 'red'; 
        losersList.appendChild(listItem);
    });
    appDiv.appendChild(losersList);
}
