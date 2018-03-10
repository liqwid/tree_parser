import { TreeNode, ROOT_TITLE } from 'models/tree'

export const ROOT_INDEX = 0

// Root indent is set negative to escape
// conflicts with 0 indent of 1st level nodes
const ROOT_INDENT = -1

/**
 * Parses text input and returns a json tree
 * Input and text examples can be viewed in the spec
 *
 * @param textTree
 * @return {TreeNode}
 */
export default function parseStringTree(textTree: string): TreeNode {
  const pages: string[] = textTree.split('\n')
  const rootNode: TreeNode = getTreeNode(ROOT_TITLE, true, ROOT_INDEX)
  // Constructing first level:
  // parent & previous nodes are root
  let parentNode: TreeNode = rootNode
  let prevNode: TreeNode = rootNode
  // levelIndent is taken from first page
  // 1-based index is used as 0 is root
  // It's done because root is nor generic - i.e. it has negative indent
  // and cannot be added to pages array to be handled as any other node
  let levelIndent: number = getSpaceIndent(pages, 1)
  let parentIndent: number = ROOT_INDENT
  let parentAddress: number[] = [ ROOT_INDEX ]
  
  for (let [index, page] of Array.from(pages.entries())) {
    const dfsId: number = index + 1
    const pageIndent: number = getSpaceIndent(pages, dfsId) 
    const node: TreeNode = getTreeNode(page, false, dfsId)

    /** 
     * If indent is bigger descend a level
     * Add current page id to address
     * Update level Indent
     * Set previous node as parent
     */
    if (pageIndent > levelIndent) {
      parentIndent = levelIndent
      parentNode = prevNode
      parentAddress.push(parentNode.dfsId)
    
    /**
     * If indent is smaller then parent's ascend
     * Ascend by removing previous parents from address
     */
    } else if (pageIndent <= parentIndent) {
      while (pageIndent <= parentIndent) {
        parentAddress.pop()
        const parentId: number = parentAddress[parentAddress.length - 1] || ROOT_INDEX
        parentIndent = getSpaceIndent(pages, parentId)
      }
      parentNode = findNode(rootNode, parentAddress)
    }
    
    levelIndent = pageIndent
    parentNode.children.push(node)  
    prevNode = node
  }
  
  return rootNode
}

/**
 * Finds node by it's index address
 * Goes from root downwards
 * @param {TreeNode} root root node
 * @param {number[]} address node index address
 * @return {TreeNode} target node
 */
function findNode(root: TreeNode, address: number[]): TreeNode {
  let node = root
  const addressWithoutRoot = address.slice(1)
  for (let index of addressWithoutRoot) {
    const nextNode = node.children.find(
      (childNode: TreeNode) => childNode.dfsId === index
    )
    
    if (!nextNode) return node
    
    node = nextNode
  }
  
  return node
}

/**
 * Returns number of indenting spaces
 * @param {string} page
 * @param {number} pageDfsId 1-based index of page (root having index of 0)
 * @return {string} spaces
 */
function getSpaceIndent(pages: string[], pageDfsId: number): number {
  // Handle root case
  if (pageDfsId === ROOT_INDEX) return ROOT_INDENT
  
  return pages[pageDfsId - 1].replace(/^(\ *)\S.*/g, ($0, $1) => $1).length
}

/**
 * Removes Indents from page title
 * @param {string} page page title with space Indents
 * @return {string} page title without space Indents
 */
function removeSpaceIndent(page: string): string {
  return page.replace(/^\ *(\S)/g, ($0, $1) => $1)
}

/**
 * Creates a json representation for the node
 * @param {string} page page title with space Indents
 * @param {boolean} isRoot
 * @param {number} index number of the node in the flat representation
 */
function getTreeNode(
  page: string,
  isRoot: boolean,
  index: number
): TreeNode {
  return {
    title: removeSpaceIndent(page),
    isRoot,
    children: [],
    // Index in the initial array can be used as the number of step in DFS tree walk
    dfsId: index
  }
}
