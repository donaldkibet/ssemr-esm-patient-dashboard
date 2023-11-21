import { FHIRResource, fhirBaseUrl, openmrsFetch } from '@openmrs/esm-framework';
import useSWR from 'swr';

interface Obs {
  entry: Array<FHIRResource>;
  id: string;
  resourceType: string;
  total: number;
  type: string;
}

/**
 * Custom hook to fetch patient observations based on given patient UUID and concept UUIDs.
 *
 * @param {string} patientUuid - The UUID of the patient.
 * @param {Array<string>} conceptUuids - An array of concept UUIDs.
 * @returns {object} - An object containing the observed results, error, loading status, and validation status.
 */
export const usePatientObs = (patientUuid: string, conceptUuids: Array<string>) => {
  const observationEndpoint = `${fhirBaseUrl}/Observation?subject:Patient=${patientUuid}&code=${conceptUuids.join(
    ',',
  )}`;

  const { data, error, isLoading, isValidating } = useSWR<{ data: Obs }>(observationEndpoint, openmrsFetch);

  const observedResults =
    data?.data?.entry?.reduce((results, entry) => {
      const resource = entry.resource;
      if (typeof resource.valueQuantity?.value === 'number') {
        results.push(resource);
      }
      if (typeof resource.valueString === 'string') {
        results.push(results);
      }
      return results;
    }, []) ?? [];

  return { obs: observedResults, error, isLoading, isValidating };
};
