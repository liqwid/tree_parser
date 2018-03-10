import * as React from 'react'

import { TreeNode } from 'models/tree'

import Paper from 'material-ui/Paper'
import { blueGrey700 } from 'material-ui/styles/colors'

import styled from 'styled-components'

export interface TreeNodeProps extends TreeNode {}

export interface TreeNodeState {
  isSelected: boolean
  isOpen: boolean
}

const TreeNodeContent = styled(Paper)`
  height: 40px;
  margin: 4px;
  color: white;
  padding: 11px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  color: white !important;
  background-color: ${blueGrey700} !important;
  display: flex;
  align-items: center;
`

const CHILD_LEFT_SHIFT = 10

export class TreeNodeComponent extends React.PureComponent<TreeNodeProps, TreeNodeState> {
  render(): JSX.Element {
    const { title, children } = this.props
    
    return (
      <div
        style={{
          marginLeft: CHILD_LEFT_SHIFT
        }}
      >
        <TreeNodeContent
        >
          {title}
        </TreeNodeContent>
        {children.map((childNode: TreeNode) =>
          <TreeNodeComponent
            {...childNode}
            key={childNode.dfsId}
          />
        )}
      </div>
    )
  }
}
