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
    formUuid: 'cf245d5c-9e6b-46f5-bf07-1c2746a9e54d', // HIV ENROLLMENT FORM
    encounterType: '81da9590-3f10-11e4-adec-0800271c1b75', // ADMISSION
    dashboardTitle: 'Client enrollment',
    errorMessage: 'Client enrollment',
  },
  initialHIVCareAndART: {
    formUuid: 'a5b831b5-168f-4de3-9975-7277f3ed4945',
    encounterType: '81852aee-3f10-11e4-adec-0800271c1b75', // CONSULTATION
    dashboardTitle: 'Initial HIV care and ART',
    errorMessage: 'Initial HIV care and ART',
  },
  artTreatmentInteruption: {
    formUuid: '5560f1f1-0903-4853-89d0-70365282ceb9',
    encounterType: '82024e00-3f10-11e4-adec-0800271c1b75', // LAB RESULTS
    dashboardTitle: 'ART treatment interruption',
    errorMessage: 'ART treatment interruption',
  },
  treatmentOutcome: {
    formUuid: '652ba093-39f7-4ef1-8d0b-ad00c2dd5d2a',
    encounterType: '81fbaddd-3f10-11e4-adec-0800271c1b75', // INVESTIGATION
    dashboardTitle: 'Treatment outcome',
    errorMessage: 'Treatment outcome',
  },
};

const HIVArtDashboard: React.FC<HIVArtDashboardProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { encounters, isLoading, error } = usePatientEncounters(patientUuid);
  console.log('encounters', encounters);
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
