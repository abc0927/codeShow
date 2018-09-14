function Router() { //构造函数
    this.routes = {};
    this.currentURL = '';  // 当前的URL
}
//暂时把location.hash称作锚
Router.prototype.route = function (path, callback) { //原型添加route方法
    this.routes[path] = callback || function () {//给实例对象的routes属性添加一个指定属性，值为callback
    };
};

Router.prototype.refresh = function () { // 原型添加refresh方法
    this.currentURL = location.hash.slice(1) || '/index'; //设置实例对象的currentURL属性值为当前url标签值（#后的内容）
    if (this.routes[this.currentURL] !== undefined) {// 如果存在this.routes[this.currentURL]
        this.routes[this.currentURL](); // 如果实例对象的ruotes属性里面有currentURL属性，就执行回调函数
    } else {
        window.location.href = 'index.html';//如果没有这个属性，设置页面的url为index.html
        return;
    }
};
// slice(1)返回从索引1开始到最后的值

Router.prototype.init = function () { // 原型添加init方法，后面直接执行，当load和锚链接变化后调用refresh
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
};
// hashchange事件（IE8已支持该事件）
// ①当URL的片段标识符更改时，将触发hashchange事件（跟在#符号后面的URL部分，包括#符号）
// ②hashchange事件触发时，事件对象会有hash改变前的URL（oldURL）和hash改变后的URL（newURL）两个属性：
// window.addEventListener('hashchange',function(e) { console.log(e.oldURL);  console.log(e.newURL) },false);

function display_page(dataSrc) {
    var commonUrl = location.hash.slice(2); // 返回当前url#/后面的值，舍弃#/返回后面的值svg-dashboard
    $('.right-wrapper iframe').attr("src", 'component/' + commonUrl + '.html'); // 添加demo里iframe的src属性并给值
    $('#tabHtml pre').attr('data-src', dataSrc + commonUrl + '.html'); // 添加demo里tabHtml里pre的data-src属性并给值
    $('#tabCss pre').attr('data-src', dataSrc + commonUrl + '.css');//给pre元素添加data-src属性并给值
    $('#tabJs pre').attr('data-src', dataSrc + commonUrl + '.js');//给pre元素添加data-src属性并给值
    $('#tabJsUse pre').attr('data-src', dataSrc + commonUrl + '-use.js');//给pre元素添加data-src属性并给值
    Prism.fileHighlight(); // 把data-src属性指引的html，css，js文件代码转变到pre里面，
}
window.Router = new Router(); // 实例化

// Router.route('/index', function () {
//     console.log('index页面');
// })

window.Router.route('/first', function () {
    var dataSrc = "component/first/";
    display_page(dataSrc);
});

//函数执行顺序：
// 执行route,给实例对象的routes添加属性pro并赋值为回调函数callback，// window.Router.routes={'/svg-dashboard':callback};
// 执行init,当load和锚链接变化后调用refresh函数并绑定this
// 执行refresh，判断routes中有没有当前url的hash这个值作为属性，执行属性是当前url的hash这个值的回调函数
// 执行display_page,给对应的几个容器添加data-src属性并给值
// 执行Prism.fileHighlight，翻译data-src属性值对应的文件内容到容器中
window.Router.init();