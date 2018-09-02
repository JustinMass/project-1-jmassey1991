import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /reimbs
export const reimbRouter = express.Router(); // routers represent a subset of routes for the express application

/**
 * Find all reinbursements
 */
reimbRouter.get('', async (req: Request, resp: Response) => {
  try {
    console.log('retrieving all reimbursments');
    let reimbs = await reimbDao.findAll();
    resp.json(reimbs);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});

// /**
//  * Find all reimbursements pending status
//  */
reimbRouter.get('/pending', [
  authMiddleware('fm'), async (req, resp) => {
  console.log(`retreiving pending reimbursements`)
  try {
    let reimbs = await reimbDao.findAll();
    if (reimbs !== undefined) {
      let pendReimbs = [];
      reimbs.forEach((reimb) => {
          if(reimb.reimb_status === 'pending') pendReimbs.push(reimb);
      })
      resp.json(pendReimbs);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
}]);

// /**
//  * Find reimbursements by reimb ID
//  */
reimbRouter.get('/reimb/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving reimbursement with reimbursement id ${id}`)
  try {
    let reimb = await reimbDao.findByReimbId(id);
    if (reimb !== undefined) {
      resp.json(reimb);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

// /**
//  * Find reimbursements by author ID
//  */
reimbRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving reimbursement with author id ${id}`)
  try {
    let reimbs = await reimbDao.findById(id);
    if (reimbs !== undefined) {
      resp.json(reimbs);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

// /**
//  * Find reimbursements by author ID and pending status
//  */
reimbRouter.get('/pending/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving pending reimbursement with author id ${id}`)
  try {
    let reimbs = await reimbDao.findById(id);
    if (reimbs !== undefined) {
      let pendReimbs = [];
      reimbs.forEach((reimb) => {
          if(reimb.reimb_status === 'pending') pendReimbs.push(reimb);
      })
      resp.json(pendReimbs);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

// /**
//  * Find reimbursements by author ID and approved status
//  */
reimbRouter.get('/approved/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving approved reimbursement with author id ${id}`)
  try {
    let reimbs = await reimbDao.findById(id);
    if (reimbs !== undefined) {
      let pendReimbs = [];
      reimbs.forEach((reimb) => {
          if(reimb.reimb_status === 'approved') pendReimbs.push(reimb);
      })
      resp.json(pendReimbs);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

// /**
//  * Find reimbursements by author ID and declined status
//  */
reimbRouter.get('/declined/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving declined reimbursement with author id ${id}`)
  try {
    let reimbs = await reimbDao.findById(id);
    if (reimbs !== undefined) {
      let pendReimbs = [];
      reimbs.forEach((reimb) => {
          if(reimb.reimb_status === 'declined') pendReimbs.push(reimb);
      })
      resp.json(pendReimbs);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    resp.sendStatus(500);
  }
});

// /**
//  * Add a new reimbursement
//  */
reimbRouter.post('', [
  authMiddleware('employee'), async (req, resp) => {
  console.log('creating reimbursement')
  try {
    const id = await reimbDao.create(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
}])
/*
* update reimbursement
*/
reimbRouter.put('', async (req, resp) => {
  console.log('updating reimbursement')
  try {
    const id = await reimbDao.update(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})

