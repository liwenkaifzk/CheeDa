/**
 * Created by guanyong on 16/6/4.
 */

var Server = {
    cookies: null,

    /**
     * 发送数据给服务器
     * @param action {Action} 动作
     * @param data {Object} 需要发送的数据
     * @param fn {Function} 成功回调
     * @param isPrompt {Boolean} 发生错误是否直接提示
     * @param error {Function} 发生错误回调
     */
    send(action, data, fn, isPrompt, error){
        let self = this;
        let method = 'post';
        if (this.hasFormFile(data)) {
            method = 'postFile';
        }
        return this[method](action, data, function (data) {
            let quitType = '';
            if (data.code == 200) {
                fn(data.data);
            } else if ((data.code == 307 || data.code == 800) && action != Action.Logout) {
                if (error != null && data.code == 800) {
                    let text = ErrorCode.getError(data.code);
                    error({type: ErrorType.AppError, code: data.code, text: text});
                    if (data.data) {
                        quitType = 'pc';
                    } else {
                        quitType = 'phoneOrTokenF';
                    }
                }
                let win = CubeWindow.getWindow('main');
                if (null != win) {
                    Engine.run(function (host) {
                        window.cube.getAccountService().logout();
                        host.close();
                    }, {});
                    Server.send(Action.Logout, {token: localStorage.getItem('app_token')}, () => {
                    }, false);
                    if (!win.isOffline) {
                        if (quitType == 'phoneOrTokenF') {
                            win.executeCode('(function(){MessageBox.showPrompt("下线通知","您已退出坐标", () => {const remote = require("electron").remote;remote.app.logout();},() => {const remote = require("electron").remote;remote.app.logout();}, false);})()');
                        } else if (quitType == 'pc') {
                            win.executeCode('(function(){MessageBox.showPrompt("下线通知","您的账号于 ' + self.getNowFormatDate() + '在另一台设备登录。如非本人操作，您的密码可能已经泄露，请及时修改密码。", () => {const remote = require("electron").remote;remote.app.logout();},() => {const remote = require("electron").remote;remote.app.logout();}, false);})()');
                        }
                        win.isOffline = true;
                        win.show();
                    }
                }
            } else {
                let text = ErrorCode.getError(data.code);
                if (isPrompt) {
                    UiHelper.error(text);
                }
                if (error != null) {
                    error({type: ErrorType.AppError, code: data.code, text: text});
                }
            }
        }, function (e, message) {
            if (isPrompt) {
                UiHelper.error("发生错误! 错误码: " + e.code);
            }
            if (error != null) {
                let text = '发生错误! 错误码: ' + e.code;
                error({type: ErrorType.NetworkError, code: e.code, text: text});
            } else {
                LogTool.error(e);
            }
        });
    },

    sendForm(action, form, fn){
        let data = form.serializeArray();
        this.post(action, data, fn);
    },

    post(action, data, fn, error){
        if (window.isDebug) {
            console.log('--- send: %s time:' + (new Date()).getTime() + '---\n ' +
                '%s \n' +
                '----------------------------------------------',
                action,
                JSON.stringify(data, null, '\t'));
        }

        let url = action;
        if (action.indexOf('im-upload') != -1) {
            url = action;
        } else if (action.indexOf('http://') != 0 && action.indexOf('https://') != 0) {
            url = Action._domain + action
        }

        $.ajax({
            url,
            data,
            type: 'post',
            dataType: 'json',
            success: (data) => {
                if (window.isDebug) {
                    console.log('--- receive: %s time:' + (new Date()).getTime() + '---\n ' +
                        '%s \n' +
                        '----------------------------------------------',
                        action,
                        JSON.stringify(data, null, '\t'));
                }
                fn(data);
            },

            error: (xhr, status, err) => {
                if (error)
                    error(err, err.message);
            }
        });
    },

    postFile(action, data, fn, error){
        if (window.isDebug) {
            console.log('--- send: %s time:' + (new Date()).getTime() + '---\n ' +
                '%s \n' +
                '----------------------------------------------',
                action,
                JSON.stringify(data, null, '\t'));
        }

        const fs = require('fs');
        const url = require('url');

        let urlObj, protocol;

        if (action.indexOf('http://') == 0 || action.indexOf('https://') == 0) {
            urlObj = url.parse(action);
        }
        else {
            urlObj = url.parse(Action._domain + action);
        }

        if (urlObj.protocol == 'https:') {
            protocol = require('https');
        }
        else {
            protocol = require('http');
        }

        let headCookies = localStorage.getItem('cookies_' + urlObj.hostname);
        let boundaryKey = new Date().getTime();

        let contentLength = 0;
        let tasks = [];
        for (let item in data) {
            let d = data[item];
            if (d instanceof FormFile) {
                let cell = '--' + boundaryKey + '\r\n' +
                    'Content-Disposition: form-data; name="' + item + '"; filename="' + d.name + '"\r\n' +
                    'Content-Type: ' + d.mime + '\r\n\r\n';
                contentLength += (Buffer.byteLength(cell) + d.size);
                tasks.push({
                    content: cell,
                    path: d.path,
                    run: function (req, callback) {
                        req.write(this.content);

                        //设置1M的缓冲区
                        let fileStream = fs.createReadStream(this.path, {bufferSize: 1024 * 1024});

                        fileStream.pipe(req, {end: false});

                        fileStream.on('end', function () {
                            callback();
                        });
                    }
                });
            } else {
                let cell = '--' + boundaryKey + '\r\n' +
                    'Content-Disposition: form-data; name="' + item + '"\r\n\r\n' +
                    d + '\r\n';
                contentLength += Buffer.byteLength(cell);
                tasks.push({
                    content: cell,
                    run: function (req, callback) {
                        req.write(this.content);
                        callback();
                    }
                });
            }
        }
        let endContent = '\r\n--' + boundaryKey + '--';
        contentLength += Buffer.byteLength(endContent);

        let options = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.path,
            method: 'POST',
            headers: {
                "Content-Type": 'multipart/form-data; boundary=' + boundaryKey,
                "Connection": 'keep-alive',
                "Content-Length": contentLength,
                "Cookie": null != headCookies ? headCookies : ''
            }
        };

        let req = protocol.request(options, function (res) {
            res.setEncoding('utf8');

            let result = '';

            res.on('data', function (chunk) {
                result += chunk;
            });

            res.on('end', function () {
                let cookies = res.headers['set-cookie'];
                if (null != cookies) {
                    let cookie = '';
                    for (let i = 0; i < cookies.length; i++) {
                        cookie += cookies[i].split(';')[0];
                        if (i < cookies.length - 1) {
                            cookie += ';';
                        }
                    }
                    window.localStorage.setItem('cookies_' + urlObj.hostname, cookie);
                }

                let resData = {};
                if ('' != result) {
                    resData = JSON.parse(result);
                }
                if (window.isDebug) {
                    console.log('--- receive: %s time:' + (new Date()).getTime() + '---\n ' +
                        '%s \n' +
                        '----------------------------------------------',
                        action,
                        JSON.stringify(resData, null, '\t'));
                }
                fn(resData);
            });
        });

        req.on('error', function (e) {
            if (error != null) {
                error(e, e.message);
            }
        });

        let isCancel = false;
        let isEnd = false;

        let task = function (index) {
            if (!isCancel) {
                if (index < tasks.length) {
                    tasks[index].run(req, function () {
                        task(++index);
                    });
                } else {
                    isEnd = true;
                    req.end(endContent);
                }
            }
        };
        task(0);
        return {
            cancel: () => {
                isCancel = true;
                if (!isEnd) {
                    req.end();
                    return true;
                }
                return false;
            }
        }
    },

    hasFormFile(data){
        for (let item in data) {
            if (data[item] instanceof FormFile) {
                return true;
            }
        }
        return false;
    },
    getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        let Hours = date.getHours();
        let Minutes = date.getMinutes();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (Hours >= 0 && Hours <= 9) {
            Hours = "0" + Hours;
        }
        if (Minutes >= 0 && Minutes <= 9) {
            Minutes = "0" + Minutes;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + Hours + seperator2 + Minutes;
        return currentdate;
    }
};