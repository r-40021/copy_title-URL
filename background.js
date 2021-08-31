chrome.runtime.onInstalled.addListener(function (details) {
  /* コンテキストメニューを作成 */
  const menuText = {
    parent: { ja: "ページを共有", en: "Share this page" },
    title: { ja: "ページタイトルをコピー", en: "Copy title" },
    url: { ja: "URL をコピー", en: "Copy URL" },
    both: { ja: "ページタイトルと URL をコピー", en: "Copy both title and URL" },
    fb: { ja: "Facebook でシェア", en: "Share on Facebook" },
    tweet: { ja: "ツイート", en: "Tweet" },
    li: { ja: "LINE で送る", en: "Share on LinkedIn" },
    mail: { ja: "メールで送信", en: "Email" }
  }
  const parent = chrome.contextMenus.create({
    id: "share",
    title: getText("parent"),
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    parentId: parent,
    id: "title",
    title: getText("title"),
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "URL",
    title: getText("url"),
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "both",
    title: getText("both"),
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "FB",
    title: getText("fb"),
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "tweet",
    title: getText("tweet"),
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "li",
    title: getText("li"),
    contexts: ["all"],
  });
  chrome.contextMenus.create({
    parentId: parent,
    id: "mail",
    title: getText("mail"),
    contexts: ["all"],
  });

  function getText(type) {
    switch (type) {
      case "parent":
        return lang(menuText.parent);

      case "title":
        return lang(menuText.title);

      case "url":
        return lang(menuText.url);

      case "both":
        return lang(menuText.both);

      case "fb":
        return lang(menuText.fb);

      case "tweet":
        return lang(menuText.tweet);

      case "li":
        return lang(menuText.li);

      case "mail":
        return lang(menuText.mail);
    }

    function lang(string) {
      switch (navigator.language) {
        case "ja":
          return string.ja;
        default:
          return string.en;
      }
    }
  }
});



/* コンテキストメニューがクリックされた時の処理 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "title":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: title,
      });
      break;

    case "URL":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: URL,
      });
      break;

    case "both":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: both,
      });
      break;

    case "FB":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: FB,
      });
      break;

    case "tweet":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: tweet,
      });
      break;

    case "li":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: li,
      });
      break;
    case "mail":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: mail,
      });
      break;
  }
});
function title() {
  const element = document.createElement("textarea");
  element.value = document.title;
  document.body.append(element);
  element.select();
  document.execCommand("copy");
  element.remove();
}

function URL() {
  const element = document.createElement("textarea");
  element.value = location.href;
  document.body.append(element);
  element.select();
  document.execCommand("copy");
  element.remove();
}

function both() {
  const element = document.createElement("textarea");
  element.value = document.title + "\n" + location.href;
  document.body.append(element);
  element.select();
  document.execCommand("copy");
  element.remove();
}

function FB() {
  window.open(
    "https://www.facebook.com/share.php?u=" + encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
function tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(document.title) +
    "%0a&url=" +
    encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
function li() {
  window.open(
    (navigator.language === "ja" ? "https://social-plugins.line.me/lineit/share?url=" : "https://www.linkedin.com/sharing/share-offsite/?url=") +
    encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}

function mail() {
  window.open(
    "mailto:?Subject=" + encodeURIComponent((navigator.language === "ja" ? "【Web ページの共有】" : "Shared page: ") +
      document.title) +
    "&body=" +
    encodeURIComponent(document.title) + "%0D%0A" +
    encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
