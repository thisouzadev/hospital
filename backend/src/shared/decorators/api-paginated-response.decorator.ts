const successResult = <T>(data: T = undefined, message?: string) => {
  return {
    success: true,
    message,
    result: data,
  };
};

export const ApiPaginatedResponse = (message?: string) => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Call the original method
      const data = await originalMethod.apply(this, args);

      // Modify the return value
      const modifiedResult = { success: true, message, ...data };

      // Return the modified value
      // return { target, key };
      return modifiedResult;
    };

    return descriptor;
  };
};
