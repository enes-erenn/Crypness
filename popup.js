const coinList = document.getElementById("coin-list"),
  loader = document.querySelector(".loader"),
  settings = document.getElementById("settings"),
  modalSettings = document.querySelector(".modalSettings"),
  modalNotifications = document.querySelector(".modalNotifications"),
  modalAlarm = document.querySelector(".modalAlarm"),
  overlay = document.querySelector(".overlay"),
  currensies = document.getElementById("currensies"),
  currencyBtn = document.querySelectorAll(".currency"),
  hours = document.querySelectorAll(".hour"),
  notifications = document.getElementById("notifications"),
  alarm = document.getElementById("alarm"),
  testBtn = document.getElementById("test-btn"),
  testInfoBtn = document.querySelector(".test-info-btn"),
  alarmInfoBtn = document.querySelector(".alarm-info-btn"),
  favsBtn = document.getElementById("fav");
let result,
  coins = [],
  favs =
    localStorage.getItem("favs") === null
      ? []
      : [localStorage.getItem("favs").split(",")],
  count = document.getElementById("count"),
  currency = localStorage.getItem("curr") || "usd",
  currHour = localStorage.getItem("hour") || "24h";

document.getElementById(`${currHour}`).classList.add("default"),
  hours.forEach((e) =>
    e.addEventListener("click", (e) => {
      "24h" === e.target.id
        ? localStorage.setItem("hour", "24h")
        : localStorage.setItem("hour", "1h"),
        location.reload();
    })
  ),
  currencyBtn.forEach((e) =>
    e.addEventListener("click", (e) => {
      (currency = e.target.id), window.location.reload();
      let t = (function (e) {
        return "eur" === e
          ? (localStorage.setItem("curr", "eur"), "€")
          : "gbp" === e
          ? (localStorage.setItem("curr", "gbp"), "£")
          : "cny" === e
          ? (localStorage.setItem("curr", "cny"), "元")
          : (localStorage.setItem("curr", "usd"), "$");
      })(currency);
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h`
      )
        .then((e) => e.json())
        .then((e) => {
          data.map((e) => {
            const r = coinCardTemplate.content.cloneNode(!0).children[0],
              c = r.querySelector("[data-name"),
              n = r.querySelector("[data-price]"),
              o = r.querySelector("[data-image]"),
              a = r.querySelector("[data-change]"),
              i = r.querySelector("[data-change-header]");
            return (
              (c.textContent = e.name),
              (n.textContent = `${t}${e.current_price} `),
              (o.src = e.image),
              (a.textContent = `${
                "24h" === currHour
                  ? e.price_change_percentage_24h_in_currency.toFixed(2)
                  : e.price_change_percentage_1h_in_currency.toFixed(2)
              }%`),
              (i.textContent = `${currHour} Change`),
              coinCardContainer.append(r),
              loader.classList.add("hidden"),
              (count.innerText = `Listed ${coinList.childElementCount} cryptocurrencies`),
              {
                image: e.image,
                name: e.id,
                price: e.current_price,
                symbol: e.symbol,
                change: e.price_change_percentage_24h_in_currency.toFixed(2),
                element: r,
              }
            );
          });
        });
    })
  );

let currSign = setCurr(currency);

function setCurr(e) {
  return "eur" === e ? "€" : "gbp" === e ? "£" : "cny" === e ? "¥" : "$";
}

const coinCardTemplate = document.querySelector("[data-coin-template]"),
  coinCardContainer = document.querySelector("[data-coin-cards-container]"),
  searchInput = document.querySelector("[data-search]");
searchInput.addEventListener("input", (e) => {
  const t = e.target.value.toLowerCase();
  coins.forEach((e) => {
    const r = e.name.includes(t) || e.symbol.includes(t);
    e.element.classList.toggle("hidden", !r),
      (count.innerText = `Listed ${Math.abs(
        document.getElementsByClassName("coin hidden").length - 250
      )} cryptocurrencies`);
  });
}),
  fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h"
  )
    .then((e) => e.json())
    .then((e) => {
      coins = e.map((e) => {
        const t = coinCardTemplate.content.cloneNode(!0).children[0],
          r = t.querySelector("[data-name"),
          c = t.querySelector("[data-price]"),
          n = t.querySelector("[data-image]"),
          o = t.querySelector("[data-change]"),
          a = t.querySelector("[data-change-header]");
        return (
          (r.textContent = e.name),
          (c.textContent = `${currSign}${e.current_price} `),
          (n.src = e.image),
          (o.textContent = `${
            "24h" === currHour
              ? e.price_change_percentage_24h_in_currency.toFixed(2)
              : e.price_change_percentage_1h_in_currency.toFixed(2)
          }%`),
          (a.textContent = `${currHour} Change`),
          coinCardContainer.append(t),
          o.innerHTML.includes("-") > 0.0
            ? (o.style = "background-color: #ae2012")
            : (o.style = "background-color: #2d6a4f"),
          loader.classList.add("hidden"),
          (count.innerText = `Listed ${coinList.childElementCount} cryptocurrencies`),
          {
            image: e.image,
            name: e.id,
            price: e.current_price,
            symbol: e.symbol,
            change: e.price_change_percentage_24h_in_currency.toFixed(2),
            element: t,
          }
        );
      });
      document.querySelectorAll(".coin").forEach((c) => {
        c.addEventListener("mouseover", (e) => {
          if (
            localStorage.getItem("favs") &&
            favs[0].includes(
              e.target.closest(".coin").querySelector(".coin_name").innerHTML
            )
          ) {
            e.target.closest(".coin").querySelector(".favs").src =
              "assets/icons/fav-after.png";
            e.target
              .closest(".coin")
              .querySelector("#fav-btn")
              .classList.remove("hidden");
          } else {
            e.target.closest(".coin").querySelector(".favs").src =
              "assets/icons/fav-before.png";
            e.target
              .closest(".coin")
              .querySelector("#fav-btn")
              .classList.remove("hidden");
          }
        });
      }),
        document.querySelectorAll(".coin").forEach((c) => {
          c.addEventListener("mouseout", (e) => {
            e.target
              .closest(".coin")
              .querySelector("#fav-btn")
              .classList.add("hidden");
          });
        }),
        document.querySelectorAll("#fav-btn").forEach((c) => {
          c.addEventListener("click", (e) => {
            if (
              favs[0] !== undefined &&
              Boolean(
                favs[0].includes(
                  e.target.closest(".coin").querySelector(".coin_name")
                    .innerHTML
                )
              ) === true
            ) {
              e.target.closest(".coin").querySelector(".favs").src =
                "assets/icons/fav-before.png";
              favs[0].splice(
                favs[0]
                  .indexOf(
                    e.target.closest(".coin").querySelector(".coin_name")
                      .innerHTML
                  )
                  .toString(),
                "1"
              );
              localStorage.setItem("favs", favs);
              location.reload();
            } else {
              e.target.closest(".coin").querySelector(".favs").src =
                "assets/icons/fav-after.png";

              favs.push(
                e.target.closest(".coin").querySelector(".coin_name").innerHTML
              );
              localStorage.setItem("favs", favs);
              e.target.closest(".coin").querySelector(".favs").src =
                "assets/icons/fav-after.png";
              location.reload();
            }
          });
        });
    });

settings.addEventListener("click", () => {
  modalSettings.classList.remove("hidden"), overlay.classList.remove("hidden");
}),
  notifications.addEventListener("click", () => {
    modalNotifications.classList.remove("hidden"),
      overlay.classList.remove("hidden");
  }),
  alarm.addEventListener("click", () => {
    modalAlarm.classList.remove("hidden"), overlay.classList.remove("hidden");
  }),
  favsBtn.addEventListener("click", () => {
    if (document.getElementById("fav-img").src.includes("fav.svg") === true) {
      document.querySelectorAll(".coin").forEach((c) => {
        document.getElementById("fav-img").src = "assets/icons/fav-after.png";
        c.classList.add("hidden");

        favs[0].map((f) =>
          c.querySelector(".coin_name").innerHTML === f
            ? c.classList.remove("hidden")
            : ""
        );
      });
    } else {
      location.reload();
    }
  });
testBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage("send a test notification", function () {
    console.log("test request");
  });
}),
  testInfoBtn.addEventListener("click", () => {
    document.querySelector(".test-des").classList.toggle("hidden");
  });
alarmInfoBtn.addEventListener("click", () => {
  document.querySelector(".alert-des").classList.toggle("hidden");
});
document.getElementById(`${currency}`).classList.add("default"),
  document.querySelectorAll(".close-modal").forEach((e) => {
    e.addEventListener("click", () => {
      modalSettings.classList.add("hidden"),
        modalNotifications.classList.add("hidden"),
        modalAlarm.classList.add("hidden"),
        overlay.classList.add("hidden");
    });
  });
