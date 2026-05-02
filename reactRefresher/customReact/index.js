const reactElement = {
  type: "a",
  props: {
    href: "https://kishanranaghosh.xyz",
    target: "_blank",
  },
  children: "Click me to visit kishan's portfolio",
};

const mainContainer = document.getElementById("root");

function customRender(reactElement, mainContainer) {
  const domElement = document.createElement(reactElement.type);
  domElement.innerHTML = reactElement.children;
  console.log();

  for (const key of Object.keys(reactElement.props)) {
    domElement.setAttribute(key, reactElement.props[key]);
  }
  mainContainer.appendChild(domElement);
}
customRender(reactElement, mainContainer);
console.log(mainContainer);

