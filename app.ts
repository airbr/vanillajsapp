class Wrapper {
    constructor(public element, public text, public display = true) {
      this.element = document.createElement(element);
      this.element.innerHTML = text;
      this.display = !display;
      this.toggleDisplay();
    }
    click(val) {
      this.element.addEventListener("click", () => val());
      return this;
    }
    showSelectable() {
      this.element.style.cursor = "pointer";
      return this;
    }
    addClass(className) {
      this.element.classList.add(className);
      return this;
    }
    addSource(url) {
        this.element.src = url;
        return this;
    }
    toggleDisplay() {
      this.display = !this.display;
      this.element.style.display = this.display ? "" : "none";
      return this;
    }
    appendChild(child) {
      this.element.appendChild(child.element);
      return this;
    }
    createChild(element, text, display = true) {
      var wrapper = new Wrapper(element, text, display);
      this.appendChild(wrapper);
      return this;
    }
    static generate(element, text, display = true) {
      return new Wrapper(element, text, display);
    }
  }
  
  class AnchorWrapper extends Wrapper {
    constructor(href, text, target = "_blank") {
      super("a", text);
      this.element.href = href;
      this.element.target = target;
    }
    static generateAnchor(href, text, target = "_blank") {
      return new AnchorWrapper(href, text, target);
    }
  }

  const renderInspirationalRandomQuote = (quote) => {
    const quoteDiv = Wrapper.generate("div", "", true)
      .createChild("h3", "Random Programming quote of the moment:" )
      .createChild("p", quote)
    return Wrapper.generate("div", "")
      .addClass("inspirationalquote") 
      .appendChild(quoteDiv)
      .element;
  };

  const get = (model, domain, done) => {
    fetch(`https://jsonplaceholder.typicode.com/${domain}`)
      .then(response => response.json())
      .then(json => {
        model[domain] = json;
        done();
      });
  };

  const getQuote = (model, done) => {
    fetch('https://programming-quotes-api.herokuapp.com/Quotes?count=20')
      .then(response => response.json())
      .then(json => {
        model.quotes = json;
        done();
      });
  };

  const app = document.getElementById("app");
  
  const run = (model) => getQuote(model, () => {
      model.users.forEach(user => model.userIdx[user.id] = user);
      app.innerText = '';
        model.quotes.forEach(quote =>
          app.appendChild(renderInspirationalRandomQuote(quote.en))); 
    });
  
  app.appendChild(Wrapper.generate("button", "Load").click(() => run({
    userIdx: {}
  })).element);


 