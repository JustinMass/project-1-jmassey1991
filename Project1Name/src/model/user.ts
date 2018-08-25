
export class User {
  user_id = 0;
  username = '';
  user_pass = '';
  user_fname = '';
  user_lname = '';
  user_email = '';
  user_role = '';
  

  constructor(id?: number, username?: string, password?: string, firstName?: string, lastName?: string, email?: string, role?: string, ) {
    id && (this.user_id = id);
    username && (this.username = username);
    password && (this.user_pass = password);
    firstName && (this.user_fname = firstName);
    lastName && (this.user_lname = lastName);
    email && (this.user_email = email);
    role && (this.user_role = role);
    
  }
}