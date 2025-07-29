const replacements = {
  "Connections": "Friends",
  "connections": "friends",
  "Connect": "Friends",
  "connect": "friends",
  "Charts": "Games",
  "charts": "games",
  "Marketplace": "Catalog",
  "marketplace": "catalog"
};

function replaceTextInNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    for (const [from, to] of Object.entries(replacements)) {
      const pattern = new RegExp(`\\b${from}\\b`, "g");
      text = text.replace(pattern, to);
    }
    node.textContent = text;
  } else {
    for (let child of node.childNodes) {
      replaceTextInNode(child);
    }
  }
}

// Initial run
replaceTextInNode(document.body);

// Observer for dynamic content
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      if (addedNode.nodeType === Node.ELEMENT_NODE) {
        replaceTextInNode(addedNode);
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});