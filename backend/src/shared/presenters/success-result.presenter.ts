const successResult = <T>(data: T = undefined, message?: string) => {
  return {
    success: true,
    message,
    result: data,
  };
};

export const SuccessPresenter = (message?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Call the original method
      const result = await originalMethod.apply(this, args);

      // Modify the return value
      const modifiedResult = { success: true, result, message };

      // Return the modified value
      return modifiedResult;
    };

    return descriptor;
  };
};

export default successResult;
