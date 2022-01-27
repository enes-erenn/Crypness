function notification() {
  chrome.notifications.create({
    title: "LetXPath",
    message: "LetXPath got an update!",
    iconUrl: "img/icon32.png",
    type: "basic",
  });
}
