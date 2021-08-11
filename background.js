/* コンテキストメニューを作成 */
const parent = chrome.contextMenus.create({
  id: "share",
  title: "ページを共有",
  contexts: ["all"],
});

chrome.contextMenus.create({
  parentId: parent,
  id: "title",
  title: "ページタイトルをコピー",
  contexts: ["all"],
});
chrome.contextMenus.create({
  parentId: parent,
  id: "URL",
  title: "URL をコピー",
  contexts: ["all"],
});
chrome.contextMenus.create({
  parentId: parent,
  id: "both",
  title: "ページタイトルと URL をコピー",
  contexts: ["all"],
});
chrome.contextMenus.create({
  parentId: parent,
  id: "mail",
  title: "メールで送信",
  contexts: ["all"],
});
chrome.contextMenus.create({
  parentId: parent,
  id: "FB",
  title: "Facebook でシェア",
  contexts: ["all"],
});
chrome.contextMenus.create({
  parentId: parent,
  id: "tweet",
  title: "ツイート",
  contexts: ["all"],
});
chrome.contextMenus.create({
  parentId: parent,
  id: "LINE",
  title: "LINE で送る",
  contexts: ["all"],
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

    case "LINE":
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: LINE,
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
function LINE() {
  window.open(
    "https://social-plugins.line.me/lineit/share?url=" +
    encodeURIComponent(location.href),
    "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1"
  );
}
function mail() {
  const subject = "Web サイトの共有";
  const body = document.title + "%0D%0A" + location.href;
  window.open("mailto:?subject=" + subject + "&body=" + body, "tweetwindow",
    "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1");
}
