import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_REPORT_CATALOG,
  GET_EXPORT_TYPES,
  GET_SCHEDULED_REPORTS,
  GET_REPORT_HISTORY,
  GENERATE_REPORT,
  EXPORT_DATA,
} from '../../graphql/reports-export.gql';

export const getReportCatalog = async () => {
  const data = await graphqlRequest(GET_REPORT_CATALOG);
  return data.reportCatalog;
};

export const getExportTypes = async () => {
  const data = await graphqlRequest(GET_EXPORT_TYPES);
  return data.exportTypes;
};

export const getScheduledReports = async () => {
  const data = await graphqlRequest(GET_SCHEDULED_REPORTS);
  return data.scheduledReports;
};

export const getReportHistory = async (limit?: number) => {
  const data = await graphqlRequest(GET_REPORT_HISTORY, { limit });
  return data.reportHistory;
};

export const generateReport = async (reportId: string, parameters: any, format: string) => {
  const data = await graphqlRequest(GENERATE_REPORT, { reportId, parameters, format });
  return data.generateReport;
};

export const exportData = async (exportTypeId: string, filters: any, format: string) => {
  const data = await graphqlRequest(EXPORT_DATA, { exportTypeId, filters, format });
  return data.exportData;
};
