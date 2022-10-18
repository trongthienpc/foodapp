const authHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const returnObject = (status?: boolean, message?: string, data?: any) => {
  return { status, message, data };
};

export { authHeader, returnObject };
