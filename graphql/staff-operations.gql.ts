export const GET_SHIFTS = `
  query GetShifts($dateFrom: String, $dateTo: String, $staffId: String) {
    shifts(dateFrom: $dateFrom, dateTo: $dateTo, staffId: $staffId) {
      id
      hotelId
      staffId
      staffName
      role
      shiftType
      startTime
      endTime
      status
      checkInTime
      checkOutTime
    }
  }
`;

export const GET_TASK_ASSIGNMENTS = `
  query GetTaskAssignments($status: String, $assignedTo: String) {
    taskAssignments(status: $status, assignedTo: $assignedTo) {
      id
      hotelId
      taskType
      assignedTo
      assignedBy
      roomId
      roomNumber
      priority
      status
      dueDate
      completedAt
      notes
      createdAt
    }
  }
`;

export const GET_TASK_TEMPLATES = `
  query GetTaskTemplates {
    taskTemplates {
      id
      name
      taskType
      estimatedDuration
      checklist
      isActive
    }
  }
`;

export const UPDATE_TASK_STATUS = `
  mutation UpdateTaskStatus($taskId: String!, $status: String!) {
    updateTaskStatus(taskId: $taskId, status: $status) {
      success
      message
      taskId
      status
    }
  }
`;
