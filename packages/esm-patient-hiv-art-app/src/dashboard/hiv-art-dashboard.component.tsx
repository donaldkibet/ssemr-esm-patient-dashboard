import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import ViralLoadCD4Trend from './tab-panels/viral-load-cd4-trend.component';
import DashboardPanel from './tab-panels/dashboard-panel';
import { usePatientEncounters } from '../hooks/usePatientEncounters';

interface HIVArtDashboardProps {
  patientUuid: string;
}

const dashboardPanelMap = {
  clientEnrollment: {
    formUuid: '2d27155e-f40c-4339-b292-232fa4ac53ff',
    encounterType: 'f469b65f-a4f6-4723-989a-46090de6a0e5',
    dashboardTitle: 'Client enrollment',
    errorMessage: 'Client enrollment',
  },
  initialHIVCareAndART: {
    formUuid: '81852aee-3f10-11e4-adec-0800271c1b75',
    encounterType: 'a09b3092-2408-4bc7-b23e-ca126f575bdd',
    dashboardTitle: 'Initial HIV care and ART',
    errorMessage: 'Initial HIV care and ART',
  },
  artTreatmentInteruption: {
    formUuid: '32229880-468e-4ce2-96bd-a61a999c1743',
    encounterType: '23299285-25b0-494f-b4e3-546f208762e8',
    dashboardTitle: 'ART treatment interruption',
    errorMessage: 'ART treatment interruption',
  },
  endOfFollowUp: {
    formUuid: '3bf40d2b-c8a2-4a7d-9da2-adb33860e0f8',
    encounterType: '3bf40d2b-c8a2-4a7d-9da2-adb33860e0f8',
    dashboardTitle: 'End of Follow-up',
    errorMessage: 'end of Follow-up',
  },
};

const HIVArtDashboard: React.FC<HIVArtDashboardProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { encounters, isLoading, error } = usePatientEncounters(patientUuid);
  return (
    <Tabs>
      <TabList aria-label="List of tabs" contained>
        <Tab>{t('viralLoadAndCDTrend', 'Viral load and CD4 trends')}</Tab>
        {Object.values(dashboardPanelMap).map(
          (panel) => Tab && <Tab key={panel}>{t(panel.dashboardTitle, panel.dashboardTitle)}</Tab>,
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ViralLoadCD4Trend patientUuid={patientUuid} />
        </TabPanel>
        {Object.values(dashboardPanelMap).map((panel) => (
          <TabPanel key={panel}>
            <DashboardPanel
              patientUuid={patientUuid}
              isLoading={isLoading}
              {...panel}
              encounters={encounters}
              error={error}
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default HIVArtDashboard;
