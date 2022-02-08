function getFavPrices() {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h`
  )
    .then((res) => res.json())
    .then((coins) => {
      chrome.storage.sync.get(["key"], function (result) {
        console.log(result.key);
        console.log(coins[0].price_change_percentage_1h_in_currency.toFixed(2));
        if (
          (result.key !==
            coins[0].price_change_percentage_1h_in_currency.toFixed(2)) ===
            true &&
          coins[0].price_change_percentage_1h_in_currency.toFixed(2) >= 5 ===
            true
        ) {
          console.log("trigerred");
          chrome.notifications.create({
            title: "Crypness",
            message: `${coins[0].name} price is $${coins[0].current_price}`,
            iconUrl: `${coins[0].image}`,
            type: "basic",
          });
          chrome.action.setIcon({ path: "assets/images/update128.png" });
        } else {
          return;
        }
      });

      chrome.storage.sync.set(
        { key: coins[0].price_change_percentage_1h_in_currency.toFixed(2) },
        function () {
          console.log(
            "Value is set to " +
              coins[0].price_change_percentage_1h_in_currency.toFixed(2)
          );
        }
      );
    });
}

setInterval(getFavPrices, 1800000);
/* 
chrome.runtime.onMessage.addListener((message, sender, data) => {
  console.log(message);
  data = JSON.stringify(data);
});

chrome.runtime.onMessage.addListener((message, sender, data) => {
  if (message === "send a test notification") {
    chrome.notifications.create({
      title: "Crypness",
      message: "This is a test notification",
      iconUrl: "assets/images/update128.png",
      type: "basic",
    });
  }
});
 */
