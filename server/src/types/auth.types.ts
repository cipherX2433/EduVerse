export type AccountType = "Admin" | "Student" | "Instructor";

export interface SignupInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    accountType: AccountType;
    contactNumber?: string;
  }
  
  export interface SigninInput {
    email: string;
    password: string;
  }
  
  export interface JwtPayload {
    userId: string;
    email: string;
    role: AccountType;
  }
  