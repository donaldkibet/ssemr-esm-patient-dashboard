import { OpenmrsResource, openmrsFetch } from '@openmrs/esm-framework';
import React from 'react';
import useSWR from 'swr';

export const usePatientEncounter = (patientUuid: string, encounterTypeUuid: string) => {
  const url = `/ws/rest/v1/encounter?patient=${patientUuid}&encounterType=${encounterTypeUuid}&v=full&limit=1`;
  const { data, isLoading, isValidating, error } = useSWR<{ data: { results: Array<OpenmrsResource> } }>(
    url,
    openmrsFetch,
  );
  return { encounters: data ?? [], isLoading, isValidating, error };
};
