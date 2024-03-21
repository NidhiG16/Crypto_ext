document.addEventListener('DOMContentLoaded', function() {
    fetchCryptocurrencyData();
});

function fetchCryptocurrencyData() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    
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
    
   
    const gainers = data.filter(coin => coin.price_change_percentage_24h > 0).slice(0, 10);
    const losers = data.filter(coin => coin.price_change_percentage_24h < 0).slice(0, 10);

    if (gainers.length < 10) {
        fetchAdditionalData('gainers', 10 - gainers.length, data);
    } else {
        displayData('gainers', gainers);
    }

  
    if (losers.length < 10) {
        fetchAdditionalData('losers', 10 - losers.length, data);
    } else {
        displayData('losers', losers);
    }
}

function fetchAdditionalData(type, count, data) {
 
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=2&sparkline=false';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const additionalData = type === 'gainers' ? 
                data.filter(coin => coin.price_change_percentage_24h > 0).slice(0, count) :
                data.filter(coin => coin.price_change_percentage_24h < 0).slice(0, count);
            displayData(type, additionalData);
        })
        .catch(error => {
            console.error(`Error fetching additional ${type}:`, error);
            alert(`Error fetching additional ${type}`);
        });
}

function displayData(type, dataArray) {
    const appDiv = document.getElementById('app');

    const title = document.createElement('h2');
    title.textContent = type === 'gainers' ? 'Top 10 Gainers' : 'Top 10 Losers';
    appDiv.appendChild(title);

    const list = document.createElement('ul');
    dataArray.forEach(coin => {
        const listItem = document.createElement('li');
        listItem.textContent = `${coin.name} (${coin.symbol}): Price: $${coin.current_price.toFixed(2)}, Change: ${coin.price_change_percentage_24h.toFixed(2)}%`;
        listItem.style.color = type === 'gainers' ? 'green' : 'red';
        list.appendChild(listItem);
    });
    appDiv.appendChild(list);
}
