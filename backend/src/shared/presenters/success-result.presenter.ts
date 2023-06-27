const successResult = <T>(data: T = undefined, message?: string) => {
  return {
    success: true,
    message,
    result: data,
  };
};

export default successResult;
