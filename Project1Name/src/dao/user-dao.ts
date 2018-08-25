import { connectionPool } from "../util/connection-util";
//import { Movie } from "../model/movie";
import { User } from "../model/user";
//import { movieConverter } from "../util/movie-converter";
//import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their movies
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.users`);

    const users = [];
    resp.rows.forEach((user_result) => {
      
        users.push(user_result);
      }
    )
    return users;
  } finally {
    client.release();
 }
}

/**
 * Retreive a single user by id, will also retreive all of that users movies
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.users 
        WHERE user_id = $1`, [id]);
        let user = new User();
        if(resp.rows.length !== 0) {
        user = resp.rows[0];
      }
      return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.users u
        WHERE u.username = $1
        AND u.user_pass = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return new User(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}


/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user: User): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.users 
        (username, user_pass, user_fname, user_lname, user_email, user_role)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING user_id`, [user.username, user.user_pass, user.user_fname, user.user_lname, user.user_email, user.user_role]);
    return resp.rows[0].user_id;
  } finally {
    client.release();
  }
}

/**
 * Add a movie to a users list
//  * @param movieId 
//  * @param userId 
 */
// export async function addMovieToUser(movieId: number, userId: number): Promise<any> {
//   const client = await connectionPool.connect();
//   try {
//     const resp = await client.query(
//       `INSERT INTO movies.users_movies 
//         (user_id, movie_id)
//         VALUES ($1, $2)`, [userId, movieId]);
//   } finally {
//     client.release();
//   }
// }