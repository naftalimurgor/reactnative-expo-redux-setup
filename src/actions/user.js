export const UPDATE_USERNAME = 'UPDATE_USERNAME'

// the action factory
const updateUser = (username) => ({ type: UPDATE_USERNAME, username })