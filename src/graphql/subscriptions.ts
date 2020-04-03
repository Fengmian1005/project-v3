// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob($owner: String!) {
    onCreateJob(owner: $owner) {
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
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob($owner: String!) {
    onUpdateJob(owner: $owner) {
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
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob($owner: String!) {
    onDeleteJob(owner: $owner) {
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
export const onCreateSettings = /* GraphQL */ `
  subscription OnCreateSettings($owner: String!) {
    onCreateSettings(owner: $owner) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const onUpdateSettings = /* GraphQL */ `
  subscription OnUpdateSettings($owner: String!) {
    onUpdateSettings(owner: $owner) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const onDeleteSettings = /* GraphQL */ `
  subscription OnDeleteSettings($owner: String!) {
    onDeleteSettings(owner: $owner) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const onCreateCompanySettings = /* GraphQL */ `
  subscription OnCreateCompanySettings($owner: String!) {
    onCreateCompanySettings(owner: $owner) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const onUpdateCompanySettings = /* GraphQL */ `
  subscription OnUpdateCompanySettings($owner: String!) {
    onUpdateCompanySettings(owner: $owner) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const onDeleteCompanySettings = /* GraphQL */ `
  subscription OnDeleteCompanySettings($owner: String!) {
    onDeleteCompanySettings(owner: $owner) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const onCreateSchedules = /* GraphQL */ `
  subscription OnCreateSchedules {
    onCreateSchedules {
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
export const onUpdateSchedules = /* GraphQL */ `
  subscription OnUpdateSchedules {
    onUpdateSchedules {
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
export const onDeleteSchedules = /* GraphQL */ `
  subscription OnDeleteSchedules {
    onDeleteSchedules {
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
