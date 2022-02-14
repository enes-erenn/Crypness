const coinList = document.getElementById("coin-list"),
  loader = document.querySelector(".loader"),
  settings = document.getElementById("settings"),
  modalSettings = document.querySelector(".modalSettings"),
  overlay = document.querySelector(".overlay"),
  currensies = document.getElementById("currensies"),
  currencyBtn = document.querySelectorAll(".currency"),
  hours = document.querySelectorAll(".hour"),
  testInfoBtn = document.querySelector(".test-info-btn"),
  favsBtn = document.getElementById("fav");
let result,
  deneme,
  alertCoins = [],
  coins = [],
  favs =
    null === localStorage.getItem("favs")
      ? []
      : [localStorage.getItem("favs").split(",")],
  count = document.getElementById("count"),
  currency = localStorage.getItem("curr") || "usd",
  currHour = localStorage.getItem("hour") || "24h";
currHour && document.getElementById(currHour).classList.add("default"),
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
              a = r.querySelector("[data-image]"),
              o = r.querySelector("[data-change]"),
              s = r.querySelector("[data-change-header]");
            return (
              (c.textContent = e.name),
              (n.textContent = `${t}${e.current_price} `),
              (a.src = e.image),
              (o.textContent = `${
                "24h" === currHour
                  ? e.price_change_percentage_24h_in_currency.toFixed(2)
                  : e.price_change_percentage_1h_in_currency.toFixed(2)
              }%`),
              (s.textContent = `${currHour} Change`),
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
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h`
  )
    .then((e) => e.json())
    .then((e) => {
      (coins = e.map((e) => {
        const t = coinCardTemplate.content.cloneNode(!0).children[0],
          r = t.querySelector("[data-name"),
          c = t.querySelector("[data-price]"),
          n = t.querySelector("[data-image]"),
          a = t.querySelector("[data-change]"),
          o = t.querySelector("[data-change-header]");
        return (
          (r.textContent = e.name),
          (c.textContent = `${currSign}${e.current_price} `),
          (n.src = e.image),
          (a.textContent = `${
            "24h" === currHour
              ? e.price_change_percentage_24h_in_currency.toFixed(2)
              : e.price_change_percentage_1h_in_currency.toFixed(2)
          }%`),
          (o.textContent = `${currHour} Change`),
          coinCardContainer.append(t),
          a.innerHTML.includes("-") > 0
            ? (a.style = "background-color: #ae2012")
            : (a.style = "background-color: #2d6a4f"),
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
      })),
        document.querySelectorAll(".coin").forEach((e) => {
          e.addEventListener("mouseover", (e) => {
            localStorage.getItem("favs") &&
            favs[0].includes(
              e.target.closest(".coin").querySelector(".coin_name").innerHTML
            )
              ? ((e.target.closest(".coin").querySelector(".favs").src =
                  "assets/icons/fav-after.png"),
                e.target
                  .closest(".coin")
                  .querySelector("#fav-btn")
                  .classList.remove("hidden"))
              : ((e.target.closest(".coin").querySelector(".favs").src =
                  "assets/icons/fav-before.png"),
                e.target
                  .closest(".coin")
                  .querySelector("#fav-btn")
                  .classList.remove("hidden"));
          });
        }),
        document.querySelectorAll(".coin").forEach((e) => {
          e.addEventListener("mouseout", (e) => {
            e.target
              .closest(".coin")
              .querySelector("#fav-btn")
              .classList.add("hidden");
          });
        }),
        document.querySelectorAll("#fav-btn").forEach((e) => {
          e.addEventListener("click", (e) => {
            void 0 !== favs[0] &&
            !0 ===
              Boolean(
                favs[0].includes(
                  e.target.closest(".coin").querySelector(".coin_name")
                    .innerHTML
                )
              )
              ? ((e.target.closest(".coin").querySelector(".favs").src =
                  "assets/icons/fav-before.png"),
                favs[0].splice(
                  favs[0]
                    .indexOf(
                      e.target.closest(".coin").querySelector(".coin_name")
                        .innerHTML
                    )
                    .toString(),
                  "1"
                ),
                localStorage.setItem("favs", favs),
                location.reload())
              : ((e.target.closest(".coin").querySelector(".favs").src =
                  "assets/icons/fav-after.png"),
                favs.push(
                  e.target.closest(".coin").querySelector(".coin_name")
                    .innerHTML
                ),
                localStorage.setItem("favs", favs),
                (e.target.closest(".coin").querySelector(".favs").src =
                  "assets/icons/fav-after.png"),
                location.reload());
          });
        });
    }),
  settings.addEventListener("click", () => {
    modalSettings.classList.remove("hidden"),
      overlay.classList.remove("hidden");
  }),
  favsBtn.addEventListener("click", () => {
    !0 === document.getElementById("fav-img").src.includes("fav.svg")
      ? document.querySelectorAll(".coin").forEach((e) => {
          (document.getElementById("fav-img").src =
            "assets/icons/fav-after.png"),
            e.classList.add("hidden"),
            favs[0].map((t) =>
              e.querySelector(".coin_name").innerHTML === t
                ? e.classList.remove("hidden")
                : ""
            );
        })
      : location.reload();
  }),
  document.getElementById(currency).classList.add("default"),
  document.querySelectorAll(".close-modal").forEach((e) => {
    e.addEventListener("click", () => {
      modalSettings.classList.add("hidden"), overlay.classList.add("hidden");
    });
  }),
  localStorage.getItem("favs") && (favsBtn.style.display = "block");
