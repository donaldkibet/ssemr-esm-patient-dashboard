import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportsDashboard from './dashboard/reports-dashboard.component';

const RootComponent: React.FC = () => {
  const baseName = window.getOpenmrsSpaBase() + 'home/reports-dashboard';

  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<ReportsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootComponent;
