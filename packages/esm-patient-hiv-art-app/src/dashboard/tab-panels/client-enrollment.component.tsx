import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import { CardHeader, EmptyState, launchPatientWorkspace } from '@openmrs/esm-patient-common-lib';
import { useVisit } from '@openmrs/esm-framework';
import { usePatientEncounter } from '../../hooks/usePatientEncounter';

interface ClientEnrollmentProps {
  patientUuid: string;
}

const ClientEnrollment: React.FC<ClientEnrollmentProps> = ({ patientUuid }) => {
  const { t } = useTranslation();
  const { currentVisit } = useVisit(patientUuid);
  const { encounters, isLoading, isValidating, error } = usePatientEncounter(
    patientUuid,
    '81da9590-3f10-11e4-adec-0800271c1b75',
  );
  console.log(encounters);
  const headers = useMemo(() => {
    return [
      {
        key: 'dateFilled',
        header: t('dateFilled', 'Date Filled'),
      },
      {
        key: 'place',
        header: t('place', 'Place'),
      },
      {
        key: 'dateTested',
        header: t('dateTested', 'Date Tested'),
      },
      {
        key: 'visitTime',
        header: t('visitTime', 'Visit Time'),
      },
      {
        key: 'visitType',
        header: t('visitType', 'Visit Type'),
      },
    ];
  }, []);

  const handleOpenForm = () =>
    launchPatientWorkspace('patient-form-entry-workspace', {
      workspaceTitle: t('clientEnrollment', 'Client enrollment'),
      formInfo: { encounterUuid: '', formUuid: '7ba743c8-d8e6-44ad-aeed-8d2ff9e985db', visit: currentVisit },
    });
  const rows = [];

  //   if (rows.length === 0) {
  //     return (
  //       <EmptyState
  //         displayText={t('noClientEnrollment', 'client enrollment')}
  //         headerTitle={t('clientEnrollment', 'Client enrollment')}
  //       />
  //     );
  //   }

  return (
    <>
      <CardHeader title={t('clientEnrollment', 'Client enrollment')}>
        <Button
          kind="ghost"
          renderIcon={(props) => <Add size={16} {...props} />}
          iconDescription={t('add', 'Add')}
          onClick={handleOpenForm}
        >
          {t('add', 'Add')}
        </Button>
      </CardHeader>
      <DataTable rows={rows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </>
  );
};

export default ClientEnrollment;
