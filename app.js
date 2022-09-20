var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var renderInspirationalRandomQuote = function (quote) {
    var quoteDiv = Wrapper.generate("div", "", true)
        .createChild("h3", "Random Programming quote of the moment:")
        .createChild("p", quote);
    return Wrapper.generate("div", "")
        .addClass("inspirationalquote")
        .appendChild(quoteDiv)
        .element;
};
var get = function (model, domain, done) {
    fetch("https://jsonplaceholder.typicode.com/".concat(domain))
        .then(function (response) { return response.json(); })
        .then(function (json) {
        model[domain] = json;
        done();
    });
};
var getQuote = function (model, done) {
    fetch('https://programming-quotes-api.herokuapp.com/Quotes?count=20')
        .then(function (response) { return response.json(); })
        .then(function (json) {
        model.quotes = json;
        done();
    });
};
var app = document.getElementById("app");
var run = function (model) { return getQuote(model, function () {
    model.users.forEach(function (user) { return model.userIdx[user.id] = user; });
    app.innerText = '';
    model.quotes.forEach(function (quote) {
        return app.appendChild(renderInspirationalRandomQuote(quote.en));
    });
}); };
app.appendChild(Wrapper.generate("button", "Load").click(function () { return run({
    userIdx: {}
}); }).element);
