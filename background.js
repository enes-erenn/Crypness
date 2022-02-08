function getFavPrices() {
  fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h`
  )
    .then((res) => res.json())
    .then((coins) => {
      chrome.storage.local.get(["key"], function (result) {
        if (
          coins[0].price_change_percentage_1h_in_currency.toFixed(2) >= 5 &&
          result.key !==
            coins[0].price_change_percentage_1h_in_currency.toFixed(2)
        ) {
          sendNotification();
        } else {
          return;
        }
      });

      function sendNotification() {
        chrome.storage.local.set(
          { key: coins[0].price_change_percentage_1h_in_currency.toFixed(2) },
          function () {}
        );

        chrome.notifications.create({
          title: "Crypness",
          message: `${coins[0].name} price is $${coins[0].current_price}`,
          iconUrl: `${coins[0].image}`,
          type: "basic",
        });
        chrome.action.setIcon({ path: "assets/images/update128.png" });
      }
    });
}

setInterval(getFavPrices, 3600000);

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
