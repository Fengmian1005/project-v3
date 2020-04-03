import './App.css'

import Auth from '@aws-amplify/auth'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'

import awsconfig from './aws-exports'
import { createStoreWithMiddleware } from './redux/CreateStore'
import { IAppScenario } from './redux/IAppScenario'
import { IAppServices } from './redux/IAppServices'
import Routes from './Routes'

Amplify.configure(awsconfig)

function createDependencies(appScenario: IAppScenario): IAppServices {
  switch (appScenario.type) {
    case 'mock':
      return {
        // MARKER_MOCK_SERVICES
      }
    case 'real':
      return {
        // MARKER_REAL_SERVICES
      }
  }
}

interface AppProps {
  scenario?: IAppScenario
}

try {
  Auth.currentAuthenticatedUser()
    .then(() => {
      localStorage.setItem('isAuthorized', '1')
    })
    .catch(() => {
      // localStorage.setItem('isAuthorized', '0')
    })
} catch {
  // localStorage.setItem('isAuthorized', '0')
}

function App(props: AppProps) {
  const store = createStoreWithMiddleware(createDependencies(props.scenario || { type: 'real' }))

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Routes></Routes>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

// export default withAuthenticator(App, true);

export default (withAuthenticator as any)(App, {
  usernameAttributes: 'email',
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
  },
})
