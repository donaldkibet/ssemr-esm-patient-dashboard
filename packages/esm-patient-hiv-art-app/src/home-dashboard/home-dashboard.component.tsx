import React from 'react';
import styles from './home-dashboard.scss';
import { useTranslation } from 'react-i18next';
import DashboardCard from './dashboard-card/dashboard-card.component';
import { ExtensionSlot } from '@openmrs/esm-framework';

type HomeDashboardProps = {};

const HomeDashboard: React.FC<HomeDashboardProps> = () => {
  const { t } = useTranslation();

  const state = {};
  return (
    <div className={styles.homeContainer}>
      <section className={styles.header}>
        <p className={styles.title}>{t('hivAndCareTitle', 'HIV Care & ART')}</p>
        <p className={styles.subTitle}>{t('dashboard', 'Dashboard')}</p>
      </section>
      <section className={styles.dashboardCard}>
        <DashboardCard label={t('newClients', 'New Clients')} count={12} />
        <DashboardCard label={t('activeClients', 'Active Clients')} count={23} />
        <DashboardCard label={t('missedAppointments', 'Missed appointments')} count={42} />
        <DashboardCard label={t('interuptedTreatments', 'Interupted Treatment')} count={23} />
        <DashboardCard label={t('hivViralLoad', 'High Viral Load')} count={22} />
      </section>
      <section className="appointments">
        <ExtensionSlot name="hiv-art-dashboard-slot" />
      </section>
    </div>
  );
};

export default HomeDashboard;
