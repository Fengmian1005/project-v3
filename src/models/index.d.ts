import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Job {
  readonly id: string;
  readonly owner?: string;
  readonly title?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly workerCount?: number;
  readonly hoursWorked?: number;
  readonly estimatedNumberOfHours?: number;
  readonly workContinuesOnWeekends?: boolean;
  constructor(init: ModelInit<Job>);
  static copyOf(source: Job, mutator: (draft: MutableModel<Job>) => MutableModel<Job> | void): Job;
}

export declare class Settings {
  readonly id: string;
  readonly owner?: string;
  readonly companyName?: string;
  readonly numberOfWorkers?: number;
  readonly hoursPerDay?: number;
  constructor(init: ModelInit<Settings>);
  static copyOf(source: Settings, mutator: (draft: MutableModel<Settings>) => MutableModel<Settings> | void): Settings;
}

export declare class CompanySettings {
  readonly id: string;
  readonly owner?: string;
  readonly companyName?: string;
  readonly numberOfWorkers?: number;
  readonly hoursPerDay?: number;
  readonly workWeek?: boolean;
  constructor(init: ModelInit<CompanySettings>);
  static copyOf(source: CompanySettings, mutator: (draft: MutableModel<CompanySettings>) => MutableModel<CompanySettings> | void): CompanySettings;
}

export declare class Schedules {
  readonly id: string;
  readonly owner?: string;
  readonly s_id?: string;
  readonly s_calendarId?: string;
  readonly s_title?: string;
  readonly s_category?: string;
  readonly s_dueDateClass?: string;
  readonly s_start?: string;
  readonly s_end?: string;
  readonly s_bgColor?: string;
  readonly s_jobTitle?: string;
  readonly s_jobHours?: number;
  readonly s_jobWorkerNumbers?: number;
  readonly s_jobHoursPerDay?: number;
  constructor(init: ModelInit<Schedules>);
  static copyOf(source: Schedules, mutator: (draft: MutableModel<Schedules>) => MutableModel<Schedules> | void): Schedules;
}