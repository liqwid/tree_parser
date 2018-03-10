import * as React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import styled from 'styled-components'

import { TreeTextInput } from 'components/TreeTextInput'
import { Tree } from 'components/Tree'

const Layout = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
`

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Layout>
          <TreeTextInput />
          <Tree/>
        </Layout>
      </MuiThemeProvider>
    )
  }
}

export default App
