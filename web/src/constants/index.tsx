export const SERVER_URL: any = process.env.NEXT_PUBLIC_SERVER_URL;

const version: string = "/api/v1";
export const URLS = {
  AUTH: version + "/auths",
  USERS: version + "/users",
  EVENT: version + "/events",
  SCHOOL: version + "/schools",
  FACULTY: version + "/faculties",
};
