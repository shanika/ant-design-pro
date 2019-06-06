const statsMap = {
  CRAETE_ENVIRONMENT_SCHEDULED : {
    index : 1,
    label : 'Creating environment'
  },
  CREATE_ENVIRONMENT : {
    index : 1,
    label : 'Creating environment'
  },
  DOWNLOADING_IMAGES : {
    index : 2,
    label : 'Setting up environment'
  },
  RUNNING_TEST_SCHEDULED : {
    index : 2,
    label : 'Setting up environment'
  },
  RUNNING_TEST : {
    index : 3,
    label : 'Running'
  },
  STOPPING : {
    index : 3,
    label : 'Stopping'
  },
  DELETING_ENVIRONMENT_SCHEDULED : {
    index : 4,
    label : 'Deleting environment'
  },
  DELETING_ENVIRONMENT : {
    index : 4,
    label : 'Deleting environment'
  },
  STOPPED : {
    index : 5,
    label : 'Complete'
  },
  TASK_FAILED : {
    index : 5,
    label : 'Error occurred'
  }
};


export const getStatusLabel = (status) => {
  return statsMap[status].label;
};

export const getStatusIndex = (status) => {
  return statsMap[status].index;
};
