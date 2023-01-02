"use strict";
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
        if (text === void 0) { text = ""; }
        if (display === void 0) { display = true; }
        return new Wrapper(element, text, display);
    };
    Wrapper.prototype.disappear = function () {
        var that = this;
        setTimeout(function () {
            that.toggleDisplay();
        }, 3500 * Math.random());
        return this;
    };
    return Wrapper;
}());
var renderInspirationalRandomQuote = function (quote) {
    var quoteDiv = Wrapper.generate("div", "", true)
        .createChild("h2", quote.en)
        .createChild("p", quote.author);
    return Wrapper.generate("div")
        .disappear()
        .addClass("inspirationalquote")
        .click(function () { return quoteDiv.toggleDisplay(); })
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
    fetch('https://api.github.com/users/airbr/repos')
        .then(function (response) { return response.json(); })
        .then(function (json) {
        model.quotes = json;
        done();
    });
};
var app = document.getElementById("app");
var end = document.getElementById("end");
var run = function (model) { return getQuote(model, function () {
    app.innerText = '';
    model.quotes.forEach(function (quote) {
        return app.appendChild(renderInspirationalRandomQuote(quote));
    });
    end.style.display = "block";
}); };
app.appendChild(Wrapper.generate("button", "Load").click(function () { return run({}); }).element);
