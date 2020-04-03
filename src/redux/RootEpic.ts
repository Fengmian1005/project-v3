//
//  RootEpic.ts
//  Grafstrom
//
//  Created by Modern Logic on 2020-02-19
//  Copyright © 2020 Grafstrom. All Rights Reserved.

import { Epic, combineEpics } from 'redux-observable'

import { AllActions } from './AllActions'
import { IAppServices } from './IAppServices'
import { RootState } from './RootState'

// MARKER_IMPORTS_INSERTION_POINT

export type AppEpic = Epic<any, any, RootState, IAppServices>

export const RootEpic = combineEpics<AllActions, AllActions, RootState, IAppServices>()
// MARKER_EPIC_INSERTION_POINT
