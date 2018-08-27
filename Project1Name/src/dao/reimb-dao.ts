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
 * Retreive a single reimbursement by id
 * @param id 
 */
export async function findByReimbId(id: number): Promise<Reimb> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.reimbursements 
        WHERE reimb_id = $1`, [id]);


        let reimb = new Reimb();
        if(resp.rows.length !== 0) {
        reimb = resp.rows[0];
        return reimb;
      }
      return undefined;
  } finally {
    client.release();
  }
}

/**
 * Retreive all reimbursements for an author id
 * @param id 
 */
export async function findById(id: number): Promise<Reimb[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.reimbursements 
        WHERE reimb_author = $1`, [id]);

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
 * Add a new reinbursement to the DB
 * @param user 
 */
export async function create(reimb: Reimb): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.reimbursements 
        (reimb_submitted, reimb_resolved, reimb_description, reimb_receipt, reimb_author, reimb_resolver, reimb_status, reimb_type, reimb_amount)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING reimb_id`, [reimb.reimb_submitted, reimb.reimb_resolved, reimb.reimb_description, reimb.reimb_receipt, reimb.reimb_author, reimb.reimb_resolver, reimb.reimb_status, reimb.reimb_type, reimb.reimb_amount]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

/**
 * Update reinbursement
 */

export async function update(reimb: Reimb): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `UPDATE ers.reimbursements 
        SET reimb_resolved = $1, reimb_receipt = $2, reimb_resolver = $3, reimb_status = $4 
        WHERE reimb_id = $5 
        RETURNING reimb_id`, [reimb.reimb_resolved, reimb.reimb_receipt, reimb.reimb_resolver, reimb.reimb_status, reimb.reimb_id]);
    return resp.rows[0].reimb_id;
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