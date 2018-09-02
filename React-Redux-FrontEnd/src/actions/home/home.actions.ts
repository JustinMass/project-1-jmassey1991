
export const homeTypes = {
    LOAD_TABLE: 'LOAD_REIMB_TABLE',
}

export const loadTable = (id: number) => {
    return {
        payload: {

        },
        type: homeTypes.LOAD_TABLE
    }
}