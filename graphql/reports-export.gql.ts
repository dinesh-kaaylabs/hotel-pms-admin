export const GET_REPORT_CATALOG = `
  query GetReportCatalog {
    reportCatalog {
      id
      name
      category
      description
      parameters
      outputFormats
      scheduleSupported
      accessRoles
    }
  }
`;

export const GET_EXPORT_TYPES = `
  query GetExportTypes {
    exportTypes {
      id
      name
      description
      dataSource
      columns
      formats
      maxRecords
    }
  }
`;

export const GET_SCHEDULED_REPORTS = `
  query GetScheduledReports {
    scheduledReports {
      id
      hotelId
      reportId
      reportName
      frequency
      schedule
      recipients
      format
      isActive
      lastRunAt
      nextRunAt
    }
  }
`;

export const GET_REPORT_HISTORY = `
  query GetReportHistory($limit: Int) {
    reportHistory(limit: $limit) {
      id
      hotelId
      reportId
      reportName
      generatedBy
      generatedAt
      parameters
      format
      fileUrl
      fileSize
      status
    }
  }
`;

export const GENERATE_REPORT = `
  mutation GenerateReport($reportId: String!, $parameters: JSON!, $format: String!) {
    generateReport(reportId: $reportId, parameters: $parameters, format: $format) {
      success
      message
      reportId
      fileUrl
      fileSize
    }
  }
`;

export const EXPORT_DATA = `
  mutation ExportData($exportTypeId: String!, $filters: JSON, $format: String!) {
    exportData(exportTypeId: $exportTypeId, filters: $filters, format: $format) {
      success
      message
      exportTypeId
      fileUrl
      fileSize
      recordCount
    }
  }
`;
