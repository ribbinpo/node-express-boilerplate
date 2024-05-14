export const ResponseSuccessMapping = <T>({
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

export const ResponseErrorMapping = ({
  status = 500,
  error,
}: {
  status?: number;
  error?: string;
}) => {
  return { status, error };
};
