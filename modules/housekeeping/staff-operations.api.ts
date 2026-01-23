import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_SHIFTS,
  GET_TASK_ASSIGNMENTS,
  GET_TASK_TEMPLATES,
  UPDATE_TASK_STATUS,
} from '../../graphql/staff-operations.gql';

export const getShifts = async (filters?: { dateFrom?: string; dateTo?: string; staffId?: string }) => {
  const data = await graphqlRequest(GET_SHIFTS, filters);
  return data.shifts;
};

export const getTaskAssignments = async (filters?: { status?: string; assignedTo?: string }) => {
  const data = await graphqlRequest(GET_TASK_ASSIGNMENTS, filters);
  return data.taskAssignments;
};

export const getTaskTemplates = async () => {
  const data = await graphqlRequest(GET_TASK_TEMPLATES);
  return data.taskTemplates;
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  const data = await graphqlRequest(UPDATE_TASK_STATUS, { taskId, status });
  return data.updateTaskStatus;
};
