// tslint:disable
// this is an auto generated file. This will be overwritten

export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
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
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSettings = /* GraphQL */ `
  query GetSettings($id: ID!) {
    getSettings(id: $id) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
    }
  }
`;
export const listSettingss = /* GraphQL */ `
  query ListSettingss(
    $filter: ModelSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettingss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        companyName
        numberOfWorkers
        hoursPerDay
      }
      nextToken
    }
  }
`;
export const getCompanySettings = /* GraphQL */ `
  query GetCompanySettings($id: ID!) {
    getCompanySettings(id: $id) {
      id
      owner
      companyName
      numberOfWorkers
      hoursPerDay
      workWeek
    }
  }
`;
export const listCompanySettingss = /* GraphQL */ `
  query ListCompanySettingss(
    $filter: ModelCompanySettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanySettingss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        companyName
        numberOfWorkers
        hoursPerDay
        workWeek
      }
      nextToken
    }
  }
`;
export const getSchedules = /* GraphQL */ `
  query GetSchedules($id: ID!) {
    getSchedules(id: $id) {
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
export const listScheduless = /* GraphQL */ `
  query ListScheduless(
    $filter: ModelSchedulesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScheduless(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
