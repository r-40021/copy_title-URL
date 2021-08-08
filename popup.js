const title = document.getElementById("pageTitle");
const url = document.getElementById("pageURL");

chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
    const tabTitle = tabs[0].title;
    const tabUrl = tabs[0].url;

    title.value = tabTitle;
    url.value = tabUrl;
    
    document.getElementById("copyTitle").addEventListener("click", () => {
        navigator.clipboard.writeText(tabTitle);
        showCheck("copyTitle");
    }, false);
    document.getElementById("copyURL").addEventListener("click", () => {
        navigator.clipboard.writeText(tabUrl);
        showCheck("copyURL");
    }, false);
    document.getElementById("copyBoth").addEventListener("click", () => {
        navigator.clipboard.writeText(tabTitle + "\n" + tabUrl);
        showCheck("copyBoth");
    }, false);

    document.getElementById("shareToFB").addEventListener("click", () => {
        windowOpen("https://www.facebook.com/share.php?u=" + encodeURIComponent(tabUrl));
    }, false);

    document.getElementById("tweet").addEventListener("click", () => {
        windowOpen("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tabTitle) + "%0a&url=" + encodeURIComponent(tabUrl));
    }, false);
    document.getElementById("LINE").addEventListener("click", ()=>{
        windowOpen("https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(tabUrl));
    }, false);
    
    if(!/http\:\/\/|https\:\/\//.test(tabUrl)) {
        const element = document.getElementById("sns");
        element.style.marginTop = "1.5em";
        element.textContent = "このページでは SNS を用いたシェア機能をご利用になれません。ご了承ください。";
    }

});

let timeout;
function showCheck(parentId) {
    clearTimeout(timeout);
    const checkIcons = document.getElementsByClassName("checkIcon");
    for (let i = 0; i < checkIcons.length; i++) {
        checkIcons[i].style.display = "none";
    }
    const clipIcons = document.getElementsByClassName("bi-clipboard");
    for (let i = 0; i < clipIcons.length; i++) {
        clipIcons[i].style.display = "";

    }
    const child = document.getElementById(parentId).children;
    child[0].style.display = "none";
    child[1].style.display = "";

    timeout = setTimeout(() => {
        child[0].style.display = "";
        child[1].style.display = "none";
    }, 5000);
}

function windowOpen(url) {
    window.open(url, 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1');
    this.close();
    return false;
}