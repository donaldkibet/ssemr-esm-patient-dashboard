import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import ViralLoadCD4Trend from './tab-panels/viral-load-cd4-trend.component';
import ClientEnrollment from './tab-panels/client-enrollment.component';

interface HIVArtDashboardProps {
  patientUuid: string;
}

const HIVArtDashboard: React.FC<HIVArtDashboardProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  return (
    <Tabs>
      <TabList aria-label="List of tabs" contained>
        <Tab>{t('viralLoadAndCDTrend', 'Viral load and CD4 trends')}</Tab>
        <Tab>{t('clientEnrollment', 'Client enrollment')}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ViralLoadCD4Trend patientUuid={patientUuid} />
        </TabPanel>
        <TabPanel>
          <ClientEnrollment patientUuid={patientUuid} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HIVArtDashboard;
