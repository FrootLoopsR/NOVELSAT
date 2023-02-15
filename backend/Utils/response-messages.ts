export const enum ResponseMessages {
  FORBIDDEN = 'Unauthorized to Access',
  SUCCESS_ADD = 'Satellite has been added successfully',
  FAIL_ADD = ' Failed to add satellite',
  SATELLITE_ALREADY_EXISTS = 'Satellite already exists. Please try updating',
  UPDATE_DATA_SUCCESS = 'Satellite has been updated successfully',
  UPDATE_DATA_ERROR = 'Failed to update satellite',
  GET_DATA_ERROR = 'Error Getting Satellite Data',
  NOT_FOUND = 'Resource was not found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error'
}
