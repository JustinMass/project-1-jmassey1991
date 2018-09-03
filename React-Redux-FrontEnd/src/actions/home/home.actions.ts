
export const homeTypes = {
    APPROVE_OR_DENY: 'APPROVE_OR_DENY',
    FILTER_FM_TABLE: 'FILTER_FM_TABLE',
    FILTER_TABLE: 'FILTER_TABLE',
    LOAD_FM_TABLE: 'LOAD_FM_TABLE',
    LOAD_TABLE: 'LOAD_REIMB_TABLE'
}

export const loadFmTable = () => (dispatch: any) => {
    const getReimbs: any = fetch(`http://localhost:9001/reimbs`);
    getReimbs
        .then((resp: any) => {
            return resp.json();
        })
        .then((respObj: any) => {
            const reimbs = [];
            for (const i in respObj) {
                if (respObj[i]) {
                    reimbs.push({
                        reimb_amount: respObj[i].reimb_amount,
                        reimb_author: respObj[i].reimb_author,
                        reimb_description: respObj[i].reimb_description,
                        reimb_id: respObj[i].reimb_id,
                        reimb_receipt: respObj[i].reimb_receipt,
                        reimb_resolved: respObj[i].reimb_resolved,
                        reimb_resolver: respObj[i].reimb_resolver,
                        reimb_status: respObj[i].reimb_status,
                        reimb_submitted: respObj[i].reimb_submitted,
                        reimb_type: respObj[i].reimb_type,
                    });
                }
            }

            dispatch({
                payload: {
                    reimbs
                },
                type: homeTypes.LOAD_FM_TABLE,
            });
        })
        .catch((err: any) => {
            console.log(err);
        })
}

export const loadTable = (id: number) => (dispatch: any) => {
    const getReimbs: any = fetch(`http://localhost:9001/reimbs/${id}`);
    getReimbs
        .then((resp: any) => {
            return resp.json();
        })
        .then((respObj: any) => {
            const reimbs = [];
            for (const i in respObj) {
                if (respObj[i]) {
                    reimbs.push({
                        reimb_amount: respObj[i].reimb_amount,
                        reimb_author: respObj[i].reimb_author,
                        reimb_description: respObj[i].reimb_description,
                        reimb_id: respObj[i].reimb_id,
                        reimb_receipt: respObj[i].reimb_receipt,
                        reimb_resolved: respObj[i].reimb_resolved,
                        reimb_resolver: respObj[i].reimb_resolver,
                        reimb_status: respObj[i].reimb_status,
                        reimb_submitted: respObj[i].reimb_submitted,
                        reimb_type: respObj[i].reimb_type,
                    });
                }
            }

            dispatch({
                payload: {
                    reimbs
                },
                type: homeTypes.LOAD_TABLE,
            });
        })
        .catch((err: any) => {
            console.log(err);
        })
}

export const filterTable = (filter: string, id: number) => (dispatch: any) => {
    const getReimbs: any = fetch(`http://localhost:9001/reimbs/${filter}/${id}`);
    getReimbs
        .then((resp: any) => {
            return resp.json();
        })
        .then((respObj: any) => {
            const reimbs = [];
            for (const i in respObj) {
                if (respObj[i]) {
                    reimbs.push({
                        reimb_amount: respObj[i].reimb_amount,
                        reimb_author: respObj[i].reimb_author,
                        reimb_description: respObj[i].reimb_description,
                        reimb_id: respObj[i].reimb_id,
                        reimb_receipt: respObj[i].reimb_receipt,
                        reimb_resolved: respObj[i].reimb_resolved,
                        reimb_resolver: respObj[i].reimb_resolver,
                        reimb_status: respObj[i].reimb_status,
                        reimb_submitted: respObj[i].reimb_submitted,
                        reimb_type: respObj[i].reimb_type,
                    });
                }
            }

            dispatch({
                payload: {
                    filter,
                    reimbs
                },
                type: homeTypes.FILTER_TABLE,
            });
        })
        .catch((err: any) => {
            console.log(err);
        })
}

export const filterFmTable = (filter: string) => (dispatch: any) => {
    const getReimbs: any = fetch(`http://localhost:9001/reimbs/${filter}`);
    getReimbs
        .then((resp: any) => {
            return resp.json();
        })
        .then((respObj: any) => {
            const reimbs = [];
            for (const i in respObj) {
                if (respObj[i]) {
                    reimbs.push({
                        reimb_amount: respObj[i].reimb_amount,
                        reimb_author: respObj[i].reimb_author,
                        reimb_description: respObj[i].reimb_description,
                        reimb_id: respObj[i].reimb_id,
                        reimb_receipt: respObj[i].reimb_receipt,
                        reimb_resolved: respObj[i].reimb_resolved,
                        reimb_resolver: respObj[i].reimb_resolver,
                        reimb_status: respObj[i].reimb_status,
                        reimb_submitted: respObj[i].reimb_submitted,
                        reimb_type: respObj[i].reimb_type,
                    });
                }
            }

            dispatch({
                payload: {
                    filter,
                    reimbs
                },
                type: homeTypes.FILTER_FM_TABLE,
            });
        })
        .catch((err: any) => {
            console.log(err);
        })
}

export const approveDeny = (status: string, userId: number, reimbs: any[], ids: number[]) => (dispatch: any) => {
    const targetReimbs: any[] = []
    // console.log(reimbs);
    // console.log(ids);
    reimbs.forEach((index) => {
        // console.log(index);
        ids.forEach((j) => {
           // console.log(typeof (+j));
            // console.log(typeof (index.reimb_id));
            if (index.reimb_id === +j) {
                index.reimb_resolved = new Date().toISOString().slice(0, 19).replace('T', ' ');
                index.reimb_status = status;
                index.reimb_receipt = `Receipt:${index.reimb_id} \n
                Status:${index.reimb_status} \n
                for an amount of $${index.reimb_amount}`;
                index.reimb_resolver = userId;
                targetReimbs.push(index);
            }
        })
    });
    console.log(targetReimbs)
    targetReimbs.forEach((index) => {
        fetch('http://localhost:9001/reimbs', {
            body: JSON.stringify(index),
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
        })
            .then(resp => {
               // console.log(resp.status)
                if (resp.status === 401) {
                    console.log('got 401')
                } else if (resp.status === 201) {
                    return resp.json();
                }
               // throw new Error('Failed to login');
               return null;
            })
            .then(resp => {
                console.log(`Created Reimbursement with id:${resp}`);
            })
            .catch(err => {
                console.log(err);
            });
    });
}

export const addReimb = (type: string, userId: number, description: string, amount: number) => (dispatch: any) => {
   // console.log('in addReimb');
   const reimb = {
        reimb_amount: amount,
        reimb_author: userId,
        reimb_description: description,
        reimb_status: 'pending',
        reimb_submitted: new Date().toISOString().slice(0, 19).replace('T', ' '),
        reimb_type: type,
        }
    
        fetch('http://localhost:9001/reimbs', {
            body: JSON.stringify(reimb),
            // credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
            .then(resp => {
               // console.log(resp.status)
                if (resp.status === 401) {
                    console.log('got 401')
                } else if (resp.status === 201) {
                    return resp.json();
                }
               // throw new Error('Failed to login');
               return null;
            })
            .then(resp => {
                console.log(`Updated Reimbursement with id:${resp}`);
            })
            .catch(err => {
                console.log(err);
            });
}
    