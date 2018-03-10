export interface TreeNode {
  isRoot: boolean
  title: string
  dfsId: number
  children: TreeNode[]
}

export const ROOT_TITLE: string = 'Root'

export const DEFAULT_ROOT_NODE: TreeNode = {
  isRoot: true,
  title: ROOT_TITLE,
  children: [],
  dfsId: 0
}
