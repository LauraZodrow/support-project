export const SET_MODAL_VIEW = 'modal: SET MODAL VIEW'
export const CLOSE_MODAL = 'modal: CLOSE MODAL'

export const MODAL_ACTION_CREATORS = {
    setModalView: (view) => ({
        type: SET_MODAL_VIEW,
        payload: { view }
    }),
    closeModal: () => ({
        type: CLOSE_MODAL
    })
}

export const INITIAL_STATE = {
    displayModal: false,
    view: null
}

export default function modalReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_MODAL_VIEW: {
            const { view } = action.payload 
            
            return {
                ...state,
                displayModal: true, 
                view
            }
        }

        case CLOSE_MODAL: {
            return {
                ...state,
                displayModal: false, 
            }
        }

        default: return state

    }
}
