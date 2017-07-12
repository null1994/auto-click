var isEnabled = false;

function setIcon(isEnabled) {
    var path = {
        "32": "../img/close32.png"
    };
    if (isEnabled) {
        path = {
            "32": "../img/open32.png"
        };
    }
    chrome.browserAction.setIcon({
        path: path
    });
}

// 加载时设置图标
setIcon(isEnabled);

function execute() {
    console.log("background==>execute");
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {isEnabled: !isEnabled},
                function (response) {
                    console.log(response);
                    isEnabled = response.run;
                    chrome.runtime.sendMessage({isEnabled: isEnabled}, function (response) {
                        console.log("background==>sendMessage");
                    });
                });
        });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    sendResponse({isEnabled: isEnabled});
});
