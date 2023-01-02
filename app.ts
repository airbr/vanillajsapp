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
    static generate(element, text = "", display = true) {
      return new Wrapper(element, text, display);
    }
    disappear(){
      var that = this;
      setTimeout(function () {
          that.toggleDisplay();
      }, 3500 * Math.random());
      return this;
    }

  }
  
  const renderInspirationalRandomQuote = (quote) => {
    const quoteDiv = Wrapper.generate("div", "", true)
      .createChild("h2", quote.en)
      .createChild("p", quote.author)
    return Wrapper.generate("div")
      .disappear()
      .addClass("inspirationalquote") 
      .click(() => quoteDiv.toggleDisplay())
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
    fetch('https://api.github.com/users/airbr/repos')
      .then(response => response.json())
      .then(json => {
        model.quotes = json;
        done();
      });
  };

  const app = document.getElementById("app");
  const end = document.getElementById("end");


  const run = (model) => getQuote(model, () => {
    app.innerText = '';
    model.quotes.forEach(quote =>
    app.appendChild(renderInspirationalRandomQuote(quote))); 
    end.style.display = "block"; 
  });
  
  app.appendChild(Wrapper.generate("button", "Load").click(() => run({
  })).element);


 