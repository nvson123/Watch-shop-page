type Iuser = {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  role: string;
};
type Ilogin = {
  _id: string;
  email: string;
  password: string;
  user: string[];
};
type Iaccount = {
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  avatar: string;
  phone: string;
};