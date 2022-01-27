const btc = document.getElementById("btc");
const eth = document.getElementById("eth");

let loader = `<div class="loader"></div>`;
document.getElementById("tokens").innerHTML = loader;
fetch(
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
)
  .then((res) => res.json())
  .then((coin) => {
    let result = ``;
    console.log(coin);
    result += `
      <div class="coin" >
        <div class="coin_header">
          <img class="image" src=${coin[0].image} />
          <h3 class="coin_name" >${coin[0].name}</h3>
        </div>
        <div>
          <h4>Current Value</h4>
          <span>$ ${coin[0].current_price}</span>
        </div>
        <div>
          <h4>24h Change</h4>
          <span>${coin[0].price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
  
      <div class="coin" >
        <div class="coin_header">
          <img class="image" src=${coin[1].image} />
          <h3 class="coin_name" >${coin[1].name}</h3>
        </div>
        <div>
          <h4>Current Value</h4>
          <span>$ ${coin[1].current_price}</span>
        </div>
        <div>
          <h4>24h Change</h4>
          <span>${coin[1].price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
  
      <div class="coin" >
        <div class="coin_header">
          <img class="image" src=${coin[5].image} />
          <h3 class="coin_name" >${coin[5].name}</h3>
        </div>
        <div>
          <h4>Current Value</h4>
          <span>$ ${coin[5].current_price}</span>
        </div>
        <div>
          <h4>24h Change</h4>
          <span>${coin[5].price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
  
      <div class="coin" >
        <div class="coin_header">
          <img class="image" src=${coin[6].image} />
          <h3 class="coin_name" >${coin[6].name}</h3>
        </div>
        <div>
          <h4>Current Value</h4>
          <span>$ ${coin[6].current_price}</span>
        </div>
        <div>
          <h4>24h Change</h4>
          <span>${coin[6].price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
  
      <div class="coin" >
        <div class="coin_header">
          <img class="image" src=${coin[7].image} />
          <h3 class="coin_name" >${coin[7].name}</h3>
        </div>
        <div>
          <h4>Current Value</h4>
          <span>$ ${coin[7].current_price}</span>
        </div>
        <div>
          <h4>24h Change</h4>
          <span>${coin[7].price_change_percentage_24h.toFixed(2)}%</span>
        </div>
      </div>
  
            `;
    document.getElementById("tokens").innerHTML = result;
  });
