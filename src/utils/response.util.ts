export const successHandler = <T>({
  status = 200,
  message,
  data,
}: {
  status?: number;
  message?: string;
  data?: T;
}) => {
  return { status, message, data };
};
