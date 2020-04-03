//
//  CreateStore.ts
//  Grafstrom
//
//  Created by Modern Logic on 2020-02-19
//  Copyright © 2020 Grafstrom. All rights reserved.

import { EnhancedStore, Middleware, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'

import reactotron from '../reactotron'
import { AllActions } from './AllActions'
import { IAppServices } from './IAppServices'
import { RootEpic } from './RootEpic'
import { rootReducer } from './RootReducer'
import { RootState } from './RootState'

// MARKER_IMPORTS

function createStoreWithMiddleware(dependencies: IAppServices): EnhancedStore<RootState, any> {
  const epicMiddleware = createEpicMiddleware<AllActions, AllActions, RootState, IAppServices>({
    dependencies: dependencies,
  })

  const enhancers = []

  if ((reactotron as any).createEnhancer) {
    enhancers.push((reactotron as any).createEnhancer())
  }

  const store = configureStore<RootState, any, Middleware[]>({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), epicMiddleware],
    enhancers,
  })

  epicMiddleware.run(RootEpic)

  return store
}

export { createStoreWithMiddleware }
