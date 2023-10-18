import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { moduleName } from './constants';
import { configSchema } from './config-schema';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { dashboardMeta } from './dashboard.meta';

const options = {
  featureName: 'hiv-art-treatment-dashboard',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const hivArtTrendsDashboard = getAsyncLifecycle(
  () => import('./dashboard/hiv-art-dashboard.component'),
  options,
);

export const hivArtTreatmentDashboardLink =
  // t('HIV & ART Treatment', 'HIV & ART Treatment')
  getSyncLifecycle(
    createDashboardLink({
      ...dashboardMeta,
      moduleName,
    }),
    options,
  );
