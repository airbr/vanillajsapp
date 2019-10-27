class Wrapper {
    constructor(element, text, display = true) {
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
    static generate(href, text, target = "_blank") {
      return new AnchorWrapper(href, text, target);
    }
  }
  
  const renderPost = (post, user) => {
    const bodyDiv = Wrapper.generate("div", "", false)
      .createChild("p", post.body).addClass("highlight")
      .appendChild(Wrapper.generate("img", "").addSource("https://via.placeholder.com/150/92c952"))
      .appendChild(Wrapper.generate("p", user.username).addClass("tooltip")
        .appendChild(Wrapper.generate("span", `${user.name} `)
          .appendChild(AnchorWrapper.generate(`mailto:${user.email}`, user.email))
          .createChild("br", "")
          .appendChild(AnchorWrapper.generate(
            `https://maps.google.com?q=${user.address.geo.lat}, ${user.address.geo.lng}`,
            "🌎 Locate"))
          .addClass("tooltiptext")));
    return Wrapper.generate("div", "")
      .addClass("post")
      .appendChild(Wrapper.generate("h1", `${user.username} &mdash; ${post.title}`)
        .showSelectable()
        .click(() => bodyDiv.toggleDisplay()))
      .appendChild(bodyDiv)
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
  
  const app = document.getElementById("app");
  
  const run = (model) => get(model, "users", () =>
    get(model, "posts",
      () => {
        model.users.forEach(user => model.userIdx[user.id] = user);
        app.innerText = '';
        model.posts.forEach(post =>
          app.appendChild(renderPost(post, model.userIdx[post.userId])));
      }));
  
  app.appendChild(Wrapper.generate("button", "Load").click(() => run({
    userIdx: {}
  })).element);

  const headerPhoto = fetch('https://jsonplaceholder.typicode.com/photos/1')
  .then(response => response.json())
  .then(json => console.log(json))