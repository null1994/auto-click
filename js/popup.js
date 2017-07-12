function showState(isEnabled) {
    if (isEnabled) {
        document.getElementById("msg").innerHTML = "已开启";
    } else {
        document.getElementById("msg").innerHTML = "已关闭";
    }
    chrome.extension.getBackgroundPage().setIcon(isEnabled);
}

document.getElementById("btn").addEventListener("click", function () {
    chrome.extension.getBackgroundPage().execute();
});

chrome.runtime.sendMessage({data: "Handshake"}, function (response) {
    console.log(response);
    showState(response.isEnabled);
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        showState(request.isEnabled);
    }
);
