//
//  RootState.ts
//  Grafstrom
//
//  Created by Modern Logic on 2020-02-19
//  Copyright © 2020 Grafstrom. All Rights Reserved.

import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

import { rootReducer } from './RootReducer'

export type RootState = ReturnType<typeof rootReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
