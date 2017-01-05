export const types = {
  'GET_RESULTS': 'GET_RESULTS'
};

const initialState = {
  searchResults: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_RESULTS:
      return {
        ...state,
        searchResults: action.payload.results
      };
    default:
      return state;
  }
};

export const actions = {
  updateResults: ({searchstring = 'test'}) => ({
    type: types.GET_RESULTS,
    meta: {
      type: 'api',
      url: ''
    }
  })
};
