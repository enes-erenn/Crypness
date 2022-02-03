let prevPrice;
function getFavPrices() {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h`
  )
    .then((res) => res.json())
    .then((coins) => {
      chrome.storage.sync.get(["key"], function (price) {
        if (price.key) {
          prevPrice = price.key;
          myFunc();
        } else {
          setPrice();
        }
      });
      function setPrice() {
        chrome.storage.sync.set({ key: coins[0].current_price });
      }
      console.log(currPrice);
      function myFunc() {
        if (coins[0].current_price % prevPrice > 1000) {
          chrome.notifications.create({
            title: "Crypness",
            message: `${coins[0].name} price is $${coins[0].current_price}`,
            iconUrl: `${coins[0].image}`,
            type: "basic",
          });
          chrome.action.setIcon({ path: "assets/images/update128.png" });
        } else {
          setPrice();
        }
      }
    });
}
setInterval(getFavPrices, 3600000);
