/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateJobInput = {
  id?: string | null,
  owner?: string | null,
  title?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  workerCount?: number | null,
  hoursWorked?: number | null,
  estimatedNumberOfHours?: number | null,
  workContinuesOnWeekends?: boolean | null,
};

export type ModelJobConditionInput = {
  title?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  workerCount?: ModelIntInput | null,
  hoursWorked?: ModelIntInput | null,
  estimatedNumberOfHours?: ModelIntInput | null,
  workContinuesOnWeekends?: ModelBooleanInput | null,
  and?: Array< ModelJobConditionInput | null > | null,
  or?: Array< ModelJobConditionInput | null > | null,
  not?: ModelJobConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateJobInput = {
  id: string,
  owner?: string | null,
  title?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  workerCount?: number | null,
  hoursWorked?: number | null,
  estimatedNumberOfHours?: number | null,
  workContinuesOnWeekends?: boolean | null,
};

export type DeleteJobInput = {
  id?: string | null,
};

export type CreateSettingsInput = {
  id?: string | null,
  owner?: string | null,
  companyName?: string | null,
  numberOfWorkers?: number | null,
  hoursPerDay?: number | null,
};

export type ModelSettingsConditionInput = {
  companyName?: ModelStringInput | null,
  numberOfWorkers?: ModelIntInput | null,
  hoursPerDay?: ModelIntInput | null,
  and?: Array< ModelSettingsConditionInput | null > | null,
  or?: Array< ModelSettingsConditionInput | null > | null,
  not?: ModelSettingsConditionInput | null,
};

export type UpdateSettingsInput = {
  id: string,
  owner?: string | null,
  companyName?: string | null,
  numberOfWorkers?: number | null,
  hoursPerDay?: number | null,
};

export type DeleteSettingsInput = {
  id?: string | null,
};

export type CreateCompanySettingsInput = {
  id?: string | null,
  owner?: string | null,
  companyName?: string | null,
  numberOfWorkers?: number | null,
  hoursPerDay?: number | null,
  workWeek?: boolean | null,
};


export type ModelCompanySettingsConditionInput = {
  companyName?: ModelStringInput | null,
  numberOfWorkers?: ModelIntInput | null,
  hoursPerDay?: ModelIntInput | null,
  workWeek?: ModelBooleanInput | null,
  and?: Array< ModelCompanySettingsConditionInput | null > | null,
  or?: Array< ModelCompanySettingsConditionInput | null > | null,
  not?: ModelCompanySettingsConditionInput | null,
};

export type UpdateCompanySettingsInput = {
  id: string,
  owner?: string | null,
  companyName?: string | null,
  numberOfWorkers?: number | null,
  hoursPerDay?: number | null,
  workWeek?: boolean | null,
};

export type DeleteCompanySettingsInput = {
  id?: string | null,
};

export type CreateSchedulesInput = {
  id?: string | null,
  owner?: string | null,
  s_id?: string | null,
  s_calendarId?: string | null,
  s_title?: string | null,
  s_category?: string | null,
  s_dueDateClass?: string | null,
  s_start?: string | null,
  s_end?: string | null,
  s_bgColor?: string | null,
  s_jobTitle?: string | null,
  s_jobHours?: number | null,
  s_jobWorkerNumbers?: number | null,
  s_jobHoursPerDay?: number | null,
};

export type ModelSchedulesConditionInput = {
  owner?: ModelStringInput | null,
  s_id?: ModelStringInput | null,
  s_calendarId?: ModelStringInput | null,
  s_title?: ModelStringInput | null,
  s_category?: ModelStringInput | null,
  s_dueDateClass?: ModelStringInput | null,
  s_start?: ModelStringInput | null,
  s_end?: ModelStringInput | null,
  s_bgColor?: ModelStringInput | null,
  s_jobTitle?: ModelStringInput | null,
  s_jobHours?: ModelIntInput | null,
  s_jobWorkerNumbers?: ModelIntInput | null,
  s_jobHoursPerDay?: ModelIntInput | null,
  and?: Array< ModelSchedulesConditionInput | null > | null,
  or?: Array< ModelSchedulesConditionInput | null > | null,
  not?: ModelSchedulesConditionInput | null,
};

export type UpdateSchedulesInput = {
  id: string,
  owner?: string | null,
  s_id?: string | null,
  s_calendarId?: string | null,
  s_title?: string | null,
  s_category?: string | null,
  s_dueDateClass?: string | null,
  s_start?: string | null,
  s_end?: string | null,
  s_bgColor?: string | null,
  s_jobTitle?: string | null,
  s_jobHours?: number | null,
  s_jobWorkerNumbers?: number | null,
  s_jobHoursPerDay?: number | null,
};

export type DeleteSchedulesInput = {
  id?: string | null,
};

export type ModelJobFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  title?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  workerCount?: ModelIntInput | null,
  hoursWorked?: ModelIntInput | null,
  estimatedNumberOfHours?: ModelIntInput | null,
  workContinuesOnWeekends?: ModelBooleanInput | null,
  and?: Array< ModelJobFilterInput | null > | null,
  or?: Array< ModelJobFilterInput | null > | null,
  not?: ModelJobFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSettingsFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  companyName?: ModelStringInput | null,
  numberOfWorkers?: ModelIntInput | null,
  hoursPerDay?: ModelIntInput | null,
  and?: Array< ModelSettingsFilterInput | null > | null,
  or?: Array< ModelSettingsFilterInput | null > | null,
  not?: ModelSettingsFilterInput | null,
};

export type ModelCompanySettingsFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  companyName?: ModelStringInput | null,
  numberOfWorkers?: ModelIntInput | null,
  hoursPerDay?: ModelIntInput | null,
  workWeek?: ModelBooleanInput | null,
  and?: Array< ModelCompanySettingsFilterInput | null > | null,
  or?: Array< ModelCompanySettingsFilterInput | null > | null,
  not?: ModelCompanySettingsFilterInput | null,
};

export type ModelSchedulesFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  s_id?: ModelStringInput | null,
  s_calendarId?: ModelStringInput | null,
  s_title?: ModelStringInput | null,
  s_category?: ModelStringInput | null,
  s_dueDateClass?: ModelStringInput | null,
  s_start?: ModelStringInput | null,
  s_end?: ModelStringInput | null,
  s_bgColor?: ModelStringInput | null,
  s_jobTitle?: ModelStringInput | null,
  s_jobHours?: ModelIntInput | null,
  s_jobWorkerNumbers?: ModelIntInput | null,
  s_jobHoursPerDay?: ModelIntInput | null,
  and?: Array< ModelSchedulesFilterInput | null > | null,
  or?: Array< ModelSchedulesFilterInput | null > | null,
  not?: ModelSchedulesFilterInput | null,
};

export type CreateJobMutationVariables = {
  input: CreateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type CreateJobMutation = {
  createJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type UpdateJobMutationVariables = {
  input: UpdateJobInput,
  condition?: ModelJobConditionInput | null,
};

export type UpdateJobMutation = {
  updateJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type DeleteJobMutationVariables = {
  input: DeleteJobInput,
  condition?: ModelJobConditionInput | null,
};

export type DeleteJobMutation = {
  deleteJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type CreateSettingsMutationVariables = {
  input: CreateSettingsInput,
  condition?: ModelSettingsConditionInput | null,
};

export type CreateSettingsMutation = {
  createSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type UpdateSettingsMutationVariables = {
  input: UpdateSettingsInput,
  condition?: ModelSettingsConditionInput | null,
};

export type UpdateSettingsMutation = {
  updateSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type DeleteSettingsMutationVariables = {
  input: DeleteSettingsInput,
  condition?: ModelSettingsConditionInput | null,
};

export type DeleteSettingsMutation = {
  deleteSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type CreateCompanySettingsMutationVariables = {
  input: CreateCompanySettingsInput,
  condition?: ModelCompanySettingsConditionInput | null,
};

export type CreateCompanySettingsMutation = {
  createCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type UpdateCompanySettingsMutationVariables = {
  input: UpdateCompanySettingsInput,
  condition?: ModelCompanySettingsConditionInput | null,
};

export type UpdateCompanySettingsMutation = {
  updateCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type DeleteCompanySettingsMutationVariables = {
  input: DeleteCompanySettingsInput,
  condition?: ModelCompanySettingsConditionInput | null,
};

export type DeleteCompanySettingsMutation = {
  deleteCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type CreateSchedulesMutationVariables = {
  input: CreateSchedulesInput,
  condition?: ModelSchedulesConditionInput | null,
};

export type CreateSchedulesMutation = {
  createSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};

export type UpdateSchedulesMutationVariables = {
  input: UpdateSchedulesInput,
  condition?: ModelSchedulesConditionInput | null,
};

export type UpdateSchedulesMutation = {
  updateSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};

export type DeleteSchedulesMutationVariables = {
  input: DeleteSchedulesInput,
  condition?: ModelSchedulesConditionInput | null,
};

export type DeleteSchedulesMutation = {
  deleteSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};

export type GetJobQueryVariables = {
  id: string,
};

export type GetJobQuery = {
  getJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type ListJobsQueryVariables = {
  filter?: ModelJobFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListJobsQuery = {
  listJobs:  {
    __typename: "ModelJobConnection",
    items:  Array< {
      __typename: "Job",
      id: string,
      owner: string | null,
      title: string | null,
      startDate: string | null,
      endDate: string | null,
      workerCount: number | null,
      hoursWorked: number | null,
      estimatedNumberOfHours: number | null,
      workContinuesOnWeekends: boolean | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSettingsQueryVariables = {
  id: string,
};

export type GetSettingsQuery = {
  getSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type ListSettingssQueryVariables = {
  filter?: ModelSettingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSettingssQuery = {
  listSettingss:  {
    __typename: "ModelSettingsConnection",
    items:  Array< {
      __typename: "Settings",
      id: string,
      owner: string | null,
      companyName: string | null,
      numberOfWorkers: number | null,
      hoursPerDay: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCompanySettingsQueryVariables = {
  id: string,
};

export type GetCompanySettingsQuery = {
  getCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type ListCompanySettingssQueryVariables = {
  filter?: ModelCompanySettingsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanySettingssQuery = {
  listCompanySettingss:  {
    __typename: "ModelCompanySettingsConnection",
    items:  Array< {
      __typename: "CompanySettings",
      id: string,
      owner: string | null,
      companyName: string | null,
      numberOfWorkers: number | null,
      hoursPerDay: number | null,
      workWeek: boolean | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSchedulesQueryVariables = {
  id: string,
};

export type GetSchedulesQuery = {
  getSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};

export type ListSchedulessQueryVariables = {
  filter?: ModelSchedulesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulessQuery = {
  listScheduless:  {
    __typename: "ModelSchedulesConnection",
    items:  Array< {
      __typename: "Schedules",
      id: string,
      owner: string | null,
      s_id: string | null,
      s_calendarId: string | null,
      s_title: string | null,
      s_category: string | null,
      s_dueDateClass: string | null,
      s_start: string | null,
      s_end: string | null,
      s_bgColor: string | null,
      s_jobTitle: string | null,
      s_jobHours: number | null,
      s_jobWorkerNumbers: number | null,
      s_jobHoursPerDay: number | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateJobSubscriptionVariables = {
  owner: string,
};

export type OnCreateJobSubscription = {
  onCreateJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type OnUpdateJobSubscriptionVariables = {
  owner: string,
};

export type OnUpdateJobSubscription = {
  onUpdateJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type OnDeleteJobSubscriptionVariables = {
  owner: string,
};

export type OnDeleteJobSubscription = {
  onDeleteJob:  {
    __typename: "Job",
    id: string,
    owner: string | null,
    title: string | null,
    startDate: string | null,
    endDate: string | null,
    workerCount: number | null,
    hoursWorked: number | null,
    estimatedNumberOfHours: number | null,
    workContinuesOnWeekends: boolean | null,
  } | null,
};

export type OnCreateSettingsSubscriptionVariables = {
  owner: string,
};

export type OnCreateSettingsSubscription = {
  onCreateSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type OnUpdateSettingsSubscriptionVariables = {
  owner: string,
};

export type OnUpdateSettingsSubscription = {
  onUpdateSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type OnDeleteSettingsSubscriptionVariables = {
  owner: string,
};

export type OnDeleteSettingsSubscription = {
  onDeleteSettings:  {
    __typename: "Settings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
  } | null,
};

export type OnCreateCompanySettingsSubscriptionVariables = {
  owner: string,
};

export type OnCreateCompanySettingsSubscription = {
  onCreateCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type OnUpdateCompanySettingsSubscriptionVariables = {
  owner: string,
};

export type OnUpdateCompanySettingsSubscription = {
  onUpdateCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type OnDeleteCompanySettingsSubscriptionVariables = {
  owner: string,
};

export type OnDeleteCompanySettingsSubscription = {
  onDeleteCompanySettings:  {
    __typename: "CompanySettings",
    id: string,
    owner: string | null,
    companyName: string | null,
    numberOfWorkers: number | null,
    hoursPerDay: number | null,
    workWeek: boolean | null,
  } | null,
};

export type OnCreateSchedulesSubscription = {
  onCreateSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};

export type OnUpdateSchedulesSubscription = {
  onUpdateSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};

export type OnDeleteSchedulesSubscription = {
  onDeleteSchedules:  {
    __typename: "Schedules",
    id: string,
    owner: string | null,
    s_id: string | null,
    s_calendarId: string | null,
    s_title: string | null,
    s_category: string | null,
    s_dueDateClass: string | null,
    s_start: string | null,
    s_end: string | null,
    s_bgColor: string | null,
    s_jobTitle: string | null,
    s_jobHours: number | null,
    s_jobWorkerNumbers: number | null,
    s_jobHoursPerDay: number | null,
  } | null,
};
