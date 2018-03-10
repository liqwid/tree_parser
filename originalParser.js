var text = "\
page 1\n\
  page 1.1\n\
  page 1.2\n\
    page 1.2.1\n\
page 2\n\
page 3\n\
  page 3.1\n\
  page 3.2\n\
page 4\n\
  page 4.1\n\
    page 4.1.1\n\
      page 4.1.1.1\n\
page 5\
"

console.clear();
// console.log(text);

const delimeter = ':';

function parseStringTree(string) {
  const pages = string.split('\n');
  const root = { title: null, isRoot: true, children: [] };
  let currentRootNode = root;
  let spacesAtTheStartOfPage = '';
  let prevNode = null;
  let currentRootAddress = [];
  
  for (let page of pages) {
    let leadingSpaces = getLeadingSpaces(page);
    const node = getChildNode(page);
    
    if (spacesAtTheStartOfPage.length === leadingSpaces.length) {
      currentRootAddress.pop();
      currentRootAddress.push(page);
    }
    
    if (spacesAtTheStartOfPage.length < leadingSpaces.length) {
      currentRootAddress.push(page);

      spacesAtTheStartOfPage = leadingSpaces;
      
      currentRootNode = prevNode;
    }
    
    if (spacesAtTheStartOfPage.length > leadingSpaces.length) {
      while (spacesAtTheStartOfPage.length >= leadingSpaces.length) {
        spacesAtTheStartOfPage = getLeadingSpaces(currentRootAddress.pop());
      }
      console.log(currentRootAddress);
      currentRootNode = goToNode(root, currentRootAddress);
      spacesAtTheStartOfPage = leadingSpaces;
    }

    currentRootNode.children.push(node);  
    prevNode = node;
  }
  
  console.log(root)
}

function goToNode(root, address) {
  let node = root;
  address = address.slice(0);
  while (address.length) {
    const nextPage = address.shift();
    const nextNode = node.children.find((node) => node.title === nextPage);  
    
    if (!nextNode) return node;
    
    node = nextNode;
  }
}
  
function getLeadingSpaces(page) {
  return page.replace(/^(\ *)\S.*/g, ($0, $1) => $1);
}

function getChildNode(page) {
  return { title: page, isRoot: false, children: [] };
}

parseStringTree(text);

// Target object:
// { title: null, isRoot: true, children: [ ... ] }
