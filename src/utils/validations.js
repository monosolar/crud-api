export const getCreateValidateMessage = (data = {}) => {
  if (!data.username || data.username.length === 0) {
    return 'No username';
  }

  if (!data.age) {
    return 'No age';
  }

  if (!Array.isArray(data.hobbies)) {
    return 'No age';
  }
};
