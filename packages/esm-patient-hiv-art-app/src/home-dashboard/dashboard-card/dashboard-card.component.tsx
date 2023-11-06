import React from 'react';
import styles from './dashboard-card.scss';

type DashboardCardProps = {
  label: string;
  count: number;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ label, count }) => {
  return (
    <div className={styles.dashboardCardContainer}>
      <p className={styles.label}>{label}</p>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

export default DashboardCard;
