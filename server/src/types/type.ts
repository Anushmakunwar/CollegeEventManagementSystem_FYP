export type getReturn = {
  data: any[];
  total: number;
  limit: number;
  page: number;
};

export type Payload = {
  email: string;
  id: string;
  roles: string[];
};

export type LogInReturnDto = {
  user: {
    name: string;
    roles: string[];
    email: string;
    schoolSuffix?: string | null;
  };
  accessToken: string;
};
