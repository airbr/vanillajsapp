var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Wrapper = /** @class */ (function () {
    function Wrapper(element, text, display) {
        if (display === void 0) { display = true; }
        this.element = element;
        this.text = text;
        this.display = display;
        this.element = document.createElement(element);
        this.element.innerHTML = text;
        this.display = !display;
        this.toggleDisplay();
    }
    Wrapper.prototype.click = function (val) {
        this.element.addEventListener("click", function () { return val(); });
        return this;
    };
    Wrapper.prototype.showSelectable = function () {
        this.element.style.cursor = "pointer";
        return this;
    };
    Wrapper.prototype.addClass = function (className) {
        this.element.classList.add(className);
        return this;
    };
    Wrapper.prototype.addSource = function (url) {
        this.element.src = url;
        return this;
    };
    Wrapper.prototype.toggleDisplay = function () {
        this.display = !this.display;
        this.element.style.display = this.display ? "" : "none";
        return this;
    };
    Wrapper.prototype.appendChild = function (child) {
        this.element.appendChild(child.element);
        return this;
    };
    Wrapper.prototype.createChild = function (element, text, display) {
        if (display === void 0) { display = true; }
        var wrapper = new Wrapper(element, text, display);
        this.appendChild(wrapper);
        return this;
    };
    Wrapper.generate = function (element, text, display) {
        if (display === void 0) { display = true; }
        return new Wrapper(element, text, display);
    };
    return Wrapper;
}());
var AnchorWrapper = /** @class */ (function (_super) {
    __extends(AnchorWrapper, _super);
    function AnchorWrapper(href, text, target) {
        if (target === void 0) { target = "_blank"; }
        var _this = _super.call(this, "a", text) || this;
        _this.element.href = href;
        _this.element.target = target;
        return _this;
    }
    AnchorWrapper.generateAnchor = function (href, text, target) {
        if (target === void 0) { target = "_blank"; }
        return new AnchorWrapper(href, text, target);
    };
    return AnchorWrapper;
}(Wrapper));
var renderPost = function (post, user) {
    var bodyDiv = Wrapper.generate("div", "", false)
        .createChild("p", post.body).addClass("highlight")
        .appendChild(Wrapper.generate("img", "").addSource("https://via.placeholder.com/150/92c952"))
        .appendChild(Wrapper.generate("p", user.username).addClass("tooltip")
        .appendChild(Wrapper.generate("span", user.name + " ")
        .appendChild(AnchorWrapper.generateAnchor("mailto:" + user.email, user.email))
        .createChild("br", "")
        .appendChild(AnchorWrapper.generateAnchor("https://maps.google.com?q=" + user.address.geo.lat + ", " + user.address.geo.lng, "🌎 Locate"))
        .addClass("tooltiptext")));
    return Wrapper.generate("div", "")
        .addClass("post")
        .appendChild(Wrapper.generate("h1", user.username + " &mdash; " + post.title + user.company.bs)
        .showSelectable()
        .click(function () { return bodyDiv.toggleDisplay(); }))
        .appendChild(bodyDiv)
        .element;
};
var get = function (model, domain, done) {
    fetch("https://jsonplaceholder.typicode.com/" + domain)
        .then(function (response) { return response.json(); })
        .then(function (json) {
        model[domain] = json;
        done();
    });
};
var app = document.getElementById("app");
var run = function (model) { return get(model, "users", function () {
    return get(model, "posts", function () {
        model.users.forEach(function (user) { return model.userIdx[user.id] = user; });
        app.innerText = '';
        shuffleArray(model.posts);
        model.posts.forEach(function (post) {
            return app.appendChild(renderPost(post, model.userIdx[post.userId]));
        });
    });
}); };
app.appendChild(Wrapper.generate("button", "Load").click(function () { return run({
    userIdx: {}
}); }).element);
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffleArray = function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
};
var headerPhoto = fetch('https://jsonplaceholder.typicode.com/photos/1')
    .then(function (response) { return response.json(); })
    .then(function (json) { return console.log(json); });
