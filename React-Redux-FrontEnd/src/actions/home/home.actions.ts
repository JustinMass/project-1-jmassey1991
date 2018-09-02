
export const homeTypes = {
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