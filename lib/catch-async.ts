/* eslint-disable @typescript-eslint/no-explicit-any */
type FunctionResponse =
  | {
      status: "ok";
      message: string;
    }
  | {
      status: "error";
      message: string;
    };
export const catchAsync = <T extends FunctionResponse>(
  fn: (...args: any[]) => Promise<T>
): ((...args: any[]) => Promise<T>) => {
  return async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (e) {
      return {
        status: "error",
        message: e instanceof Error ? e.message : "Something went wrong",
      } as T;
    }
  };
};
