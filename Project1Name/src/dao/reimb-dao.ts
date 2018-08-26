import { connectionPool } from "../util/connection-util";
//import { Movie } from "../model/movie";
import { Reimb } from "../model/reimb";
//import { movieConverter } from "../util/movie-converter";
//import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their movies
 */
export async function findAll(): Promise<Reimb[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.reimbursements`);

    const reimbs = [];
    resp.rows.forEach((reimb_result) => {
      
        reimbs.push(reimb_result);
      }
    )
    return reimbs;
  } finally {
    client.release();
 }
}

/**
 * Retreive a single user by id, will also retreive all of that users movies
 * @param id 
 */
export async function findById(id: number): Promise<Reimb> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.users 
        WHERE user_id = $1`, [id]);
        let user = new Reimb();
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
export async function findByUsernameAndPassword(username: string, password: string): Promise<Reimb> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.users u
        WHERE u.username = $1
        AND u.user_pass = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return new Reimb(resp.rows[0]); // get the user data from first row
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
export async function create(reimb: Reimb): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.users 
        (username, user_pass, user_fname, user_lname, user_email, user_role)
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING user_id`, [reimb.reimb_status]);
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