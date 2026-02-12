export interface User {
  id: string | number;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user" | "monitor";
}
