import React, { useMemo } from 'react';
import { LineChart } from '@carbon/charts-react';
import { InlineLoading } from '@carbon/react';

import { usePatientObs } from '../../hooks/usePatientObs';
import { useTranslation } from 'react-i18next';
import { ErrorState, formatDate, useConfig } from '@openmrs/esm-framework';
import { ConfigObject } from '../../config-schema';
import { EmptyState } from '@openmrs/esm-patient-common-lib';

interface ViralLoadCD4TrendProps {
  patientUuid: string;
}

const ViralLoadCD4Trend: React.FC<ViralLoadCD4TrendProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { cd4ViralLoadConcepts } = useConfig<ConfigObject>();
  const { obs, isLoading, error } = usePatientObs(patientUuid, cd4ViralLoadConcepts);

  const chartData =
    obs
      ?.map((result) => ({
        group: result.code['text'],
        date: result.effectiveDateTime,
        value: result.valueQuantity.value,
        key: formatDate(new Date(result.effectiveDateTime), { time: false }),
      }))
      .splice(0, 10) ?? [];
  console.log(chartData);
  const chartOptions: any = useMemo(() => {
    return {
      title: 'HIV & Art trends',
      axes: {
        bottom: {
          title: 'Date',
          mapsTo: 'key',
          scaleType: 'labels',
        },
        left: {
          mapsTo: 'value',
          title: t('value', 'Value'),
          scaleType: 'linear',
        },
      },
      curve: 'curveMonotoneX',
      height: '400px',
      width: '800px',
      legend: {
        position: 'right',
      },
    };
  }, []);

  if (isLoading) {
    return <InlineLoading description={t('loading', 'Loading...')} />;
  }

  if (error) {
    return <ErrorState error={error} headerTitle={t('errorLoadingTrendsChart', 'VL & CD4 Chart error')} />;
  }

  if (chartData.length === 0) {
    return (
      <EmptyState displayText={t('viralEmpty', 'Viral load & CD4 ')} headerTitle={t('vL&CD4Chart', 'VL & CD4 Chart')} />
    );
  }
  return <LineChart data={chartData} options={chartOptions} />;
};

export default ViralLoadCD4Trend;
