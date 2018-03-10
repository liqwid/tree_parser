import * as React from 'react'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/takeUntil'

import { Container } from 'typedi'

import styled from 'styled-components'

import { TreeNode } from 'models/tree'
import { TreeBuilderService } from 'services/treeBuilder'
import { TreeNodeComponent } from 'components/TreeNode'

export interface TreeProps {}

export interface TreeState {
  tree: TreeNode | null
}

const TreeWrapper = styled.div`
  width: 50%;
`

const treeService = Container.get(TreeBuilderService)

export class Tree extends React.Component<TreeProps, TreeState> {
  public state = {
    tree: null
  }
  private unsubscribe$: Subject<void>

  componentDidMount() {
    this.unsubscribe$ = new Subject()
    this.connectToTreeService()
  }

  componentWillUnmount() {
    this.unsubscribe$.next()
  }

  connectToTreeService() {
    treeService.getTreeStream()
    .takeUntil(this.unsubscribe$)
    .subscribe((tree: TreeNode) => 
      this.setState({ tree })
    )
  }

  render() {
    const { tree } = this.state

    if (!tree) return null

    return (
      <TreeWrapper>
        <TreeNodeComponent {...tree}/>
      </TreeWrapper>
    )
  }
}
