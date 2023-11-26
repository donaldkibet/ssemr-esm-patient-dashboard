import { getAsyncLifecycle, getSyncLifecycle, defineConfigSchema } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createReportsDashboardLink } from './left-panel-link.component';
import { reportsMeta } from './reports-meta';

const moduleName = '@ssemr/esm-reports-app';

const options = {
  featureName: 'reports-dashboard',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const reportsLinkDashboardLeftPanel = getSyncLifecycle(createReportsDashboardLink(reportsMeta), options);
