// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const { Job, Settings, CompanySettings, Schedules } = initSchema(schema);

export {
  Job,
  Settings,
  CompanySettings,
  Schedules
};