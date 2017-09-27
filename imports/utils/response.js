export default {
  success: resultObj => {
    return {
      success: true,
      description: 'ok',
      data: resultObj,
    };
  },

  failure: errorDesc => {
    return {
      success: false,
      description: errorDesc,
      errorCode: 404,
    };
  },
};
