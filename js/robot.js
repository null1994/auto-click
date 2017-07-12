console.log("注入成功！");
var timer = null;

// 模拟点击事件
function simulator() {
    try {
        if (document.querySelector(".dfss_down>a")) {
            document.querySelector(".dfss_down>a").click();
            console.log("点击下一页！");
        } else {
            console.warn("视频还没播放完！");
        }
    } catch (err) {
        console.error(err);
    }
}

function go(isEnabled) {
    if (isEnabled) {
        timer = setInterval(simulator, 3000);
        console.warn("定时器开始！");
        return true;
    } else {
        window.clearInterval(timer);
        timer = null;
        console.warn("定时器结束！");
        return false;
    }
}

chrome.runtime.sendMessage({me: "robot.js"}, function (response) {
    console.log("初始化请求！");
    go(response.isEnabled);
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var isEnabled = request.isEnabled;
        var ret = go(isEnabled);
        sendResponse({run: ret});
    });
