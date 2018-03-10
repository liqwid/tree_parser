import * as React from 'react'

import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/takeUntil'

import { Container } from 'typedi'

import styled from 'styled-components'

import TextField from 'material-ui/TextField'

import { TreeBuilderService } from 'services/treeBuilder'
import { blueGrey900 } from 'material-ui/styles/colors'

export interface TreeTextInputProps {}

export interface TreeTextInputState {
  value: string
}

const StylesTextField = styled(TextField)`
  width: 50% !important;
  text-align: left;
  margin: 16px;

  label {
    color: ${blueGrey900} !important;
  }

  hr {
    border-color: ${blueGrey900} !important;
  }
`

const treeService = Container.get(TreeBuilderService)

export class TreeTextInput extends React.Component<TreeTextInputProps, TreeTextInputState> {
  public state = {
    value: ''
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
    treeService.getTreeStringStream()
    .takeUntil(this.unsubscribe$)
    .subscribe((treeString: string) => 
      this.setState({ value: treeString })
    )
  }
  
  render() {
    return (
      <StylesTextField
        value={this.state.value}
        onChange={({target}: React.ChangeEvent<any>) => treeService.updateTree(target.value)}
        floatingLabelText='Enter the tree text'
        multiLine={true}
        rows={1}
      />
    )
  }
}
