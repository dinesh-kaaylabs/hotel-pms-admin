import { graphqlRequest } from '../../api/graphqlRequest';
import {
  GET_OTA_CONNECTIONS,
  GET_SYNC_LOGS,
  GET_CONFLICT_RESOLUTION,
  GET_ROOM_MAPPING,
} from '../../graphql/channel-manager.gql';

export const getOTAConnections = async () => {
  const data = await graphqlRequest(GET_OTA_CONNECTIONS);
  return data.otaConnections;
};

export const getSyncLogs = async (otaConnectionId?: string, limit?: number) => {
  const data = await graphqlRequest(GET_SYNC_LOGS, { otaConnectionId, limit });
  return data.syncLogs;
};

export const getConflictResolution = async () => {
  const data = await graphqlRequest(GET_CONFLICT_RESOLUTION);
  return data.conflicts;
};

export const getRoomMapping = async (otaConnectionId?: string) => {
  const data = await graphqlRequest(GET_ROOM_MAPPING, { otaConnectionId });
  return data.roomMapping;
};
