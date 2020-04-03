// tslint:disable
// this is an auto generated file. This will be overwritten

export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      owner
      title
      startDate
      endDate
      workerCount
      hoursWorked
      estimatedNumberOfHours
      workContinuesOnWeekends
    }
  }
`;
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
      id
      owner
      title
      startDate
      endDate
      workerCount
      hoursWorked
      estimatedNumberOfHours
      workContinuesOnWeekends
    }
  }
`;
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
      id
      owner
      title
      startDate
      endDate
      workerCount
      hoursWorked
      estimatedNumberOfHours
      workContinuesOnWeekends
    }
  }
`;
export const createSettings = /* GraphQL */ `
  mutation CreateSettings(
    $input: CreateSettingsInput!
    $condition: ModelSettingsConditionInput
  ) {
    createSettings(input: $input, condition: $condition) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const updateSettings = /* GraphQL */ `
  mutation UpdateSettings(
    $input: UpdateSettingsInput!
    $condition: ModelSettingsConditionInput
  ) {
    updateSettings(input: $input, condition: $condition) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const deleteSettings = /* GraphQL */ `
  mutation DeleteSettings(
    $input: DeleteSettingsInput!
    $condition: ModelSettingsConditionInput
  ) {
    deleteSettings(input: $input, condition: $condition) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const createCompanySettings = /* GraphQL */ `
  mutation CreateCompanySettings(
    $input: CreateCompanySettingsInput!
    $condition: ModelCompanySettingsConditionInput
  ) {
    createCompanySettings(input: $input, condition: $condition) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const updateCompanySettings = /* GraphQL */ `
  mutation UpdateCompanySettings(
    $input: UpdateCompanySettingsInput!
    $condition: ModelCompanySettingsConditionInput
  ) {
    updateCompanySettings(input: $input, condition: $condition) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const deleteCompanySettings = /* GraphQL */ `
  mutation DeleteCompanySettings(
    $input: DeleteCompanySettingsInput!
    $condition: ModelCompanySettingsConditionInput
  ) {
    deleteCompanySettings(input: $input, condition: $condition) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const createSchedules = /* GraphQL */ `
  mutation CreateSchedules(
    $input: CreateSchedulesInput!
    $condition: ModelSchedulesConditionInput
  ) {
    createSchedules(input: $input, condition: $condition) {
      id
      owner
      s_id
      s_calendarId
      s_title
      s_category
      s_dueDateClass
      s_start
      s_end
      s_bgColor
      s_jobTitle
      s_jobHours
      s_jobWorkerNumbers
      s_jobHoursPerDay
    }
  }
`;
export const updateSchedules = /* GraphQL */ `
  mutation UpdateSchedules(
    $input: UpdateSchedulesInput!
    $condition: ModelSchedulesConditionInput
  ) {
    updateSchedules(input: $input, condition: $condition) {
      id
      owner
      s_id
      s_calendarId
      s_title
      s_category
      s_dueDateClass
      s_start
      s_end
      s_bgColor
      s_jobTitle
      s_jobHours
      s_jobWorkerNumbers
      s_jobHoursPerDay
    }
  }
`;
export const deleteSchedules = /* GraphQL */ `
  mutation DeleteSchedules(
    $input: DeleteSchedulesInput!
    $condition: ModelSchedulesConditionInput
  ) {
    deleteSchedules(input: $input, condition: $condition) {
      id
      owner
      s_id
      s_calendarId
      s_title
      s_category
      s_dueDateClass
      s_start
      s_end
      s_bgColor
      s_jobTitle
      s_jobHours
      s_jobWorkerNumbers
      s_jobHoursPerDay
    }
  }
`;
