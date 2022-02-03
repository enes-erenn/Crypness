const coinList = document.getElementById("coin-list");
const loader = document.querySelector(".loader");
const settings = document.getElementById("settings");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const currensies = document.getElementById("currensies");
const currencyBtn = document.querySelectorAll(".currency");
const hours = document.querySelectorAll(".hour");
const notifications = document.getElementById("notifications");
let count = document.getElementById("count");
let result;
let currency = localStorage.getItem("curr")
  ? localStorage.getItem("curr")
  : "usd";

let currHour = localStorage.getItem("hour")
  ? localStorage.getItem("hour")
  : "24h";

// chrome.action.setIcon({ path: "assets/images/icon128.png" });

document.getElementById(`${currency}`).style.border = "1px solid black";
document.getElementById(`${currHour}`).style.border = "1px solid black";

hours.forEach((h) =>
  h.addEventListener("click", (e) => {
    currHour = e.target.id;
    currHour === "24h"
      ? localStorage.setItem("hour", "24h")
      : localStorage.setItem("hour", "1h");
    document.querySelectorAll(".hour").forEach((h) => {
      h.style.border = "1px solid transparent";
      h.style = "b:hover {border: 1px solid transparent";
    });
    e.target.style.border = "1px solid black";
    window.location.reload();
  })
);

currencyBtn.forEach((b) =>
  b.addEventListener("click", (e) => {
    currency = e.target.id;
    document.querySelectorAll(".currency").forEach((b) => {
      b.style.border = "1px solid transparent";
      b.style = "b:hover {border: 1px solid transparent";
    });
    e.target.style.border = "1px solid black";
    window.location.reload();
    let currSign = setCurr(currency);

    function setCurr(c) {
      if (c === "eur") {
        localStorage.setItem("curr", "eur");
        return "€";
      } else if (c === "gbp") {
        localStorage.setItem("curr", "gbp");
        return "£";
      } else if (c === "cny") {
        localStorage.setItem("curr", "cny");
        return "元";
      } else {
        localStorage.setItem("curr", "usd");
        return "$";
      }
    }
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h`
    )
      .then((res) => res.json())
      .then((coins) => {
        result = coins.map(
          (coin) =>
            `
              <div class="coin" >
                <div class="coin_header">
                  <img class="image" src=${coin.image} />
                  <h3 class="coin_name" >${coin.name}</h3>
                </div>
                <div>
                  <h4>Current Value</h4>
                  <span>${currSign} ${coin.current_price}</span>
                </div>
                <div>
                  <h4>${currHour} Change</h4>
                  <span>${
                    currHour === "24h"
                      ? coin.price_change_percentage_24h_in_currency.toFixed(2)
                      : coin.price_change_percentage_1h_in_currency.toFixed(2)
                  }%</span>
                </div>
              </div>
            `
        );
        coinList.innerHTML = result.join("");
        console.log(coinList.childElementCount);
      });
  })
);

let currSign = setCurr(currency);

function setCurr(c) {
  if (c === "eur") return "€";
  else if (c === "gbp") return "£";
  else if (c === "cny") return "¥";
  else {
    return "$";
  }
}

let coins = [];
const coinCardTemplate = document.querySelector("[data-coin-template]");
const coinCardContainer = document.querySelector("[data-coin-cards-container]");
const searchInput = document.querySelector("[data-search]");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  coins.forEach((coin) => {
    const isVisible = coin.name.includes(value) || coin.symbol.includes(value);
    coin.element.classList.toggle("hidden", !isVisible);
  });
});

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h"
)
  .then((res) => res.json())
  .then((data) => {
    coins = data.map((coin) => {
      const card = coinCardTemplate.content.cloneNode(true).children[0];
      const name = card.querySelector("[data-name");
      const price = card.querySelector("[data-price]");
      const image = card.querySelector("[data-image]");
      const change = card.querySelector("[data-change]");
      const changeHeader = card.querySelector("[data-change-header]");
      name.textContent = coin.name;
      price.textContent = `${currSign}${coin.current_price} `;
      image.src = coin.image;
      change.textContent = `${
        currHour === "24h"
          ? coin.price_change_percentage_24h_in_currency.toFixed(2)
          : coin.price_change_percentage_1h_in_currency.toFixed(2)
      }%`;
      changeHeader.textContent = `${currHour} Change`;
      coinCardContainer.append(card);
      loader.classList.add("hidden");

      count.innerText = `Listed ${
        coinList.childElementCount - 1
      } cryptocurrencies`;
      return {
        image: coin.image,
        name: coin.id,
        price: coin.current_price,
        symbol: coin.symbol,
        change: coin.price_change_percentage_24h_in_currency.toFixed(2),
        element: card,
      };
    });
  });

settings.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

/* notifications.addEventListener("click", () => {}); */
/* function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notifyBackgroundPage(e) {
  var sending = chrome.runtime.sendMessage({
    greeting: "Greeting from the content script",
  });
  sending.then(handleResponse, handleError);
}

window.addEventListener("click", notifyBackgroundPage); */
/* 
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(input.value);
}); */
