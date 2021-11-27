const initialState = {
  characters: [],
  allCharacters: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      }
    case "FILTER_BY_STATUS":
      const allCharacters = state.allCharacters
      const statusFiltered =
        action.payload === "All"
          ? allCharacters
          : allCharacters.filter(el => el.status === action.payload)
      //hacer la logica antes del return, si no rompe
      return {
        ...state,
        characters: statusFiltered,
      }
    case "FILTER_CREATED":
      const allCharacters2 = state.allCharacters
      const createdFilter =
        action.payload === "created"
          ? state.allCharacters.filter(el => el.createdInDb)
          : state.allCharacters.filter(el => !el.createdInDb)
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharacters : createdFilter,
      }
    default:
      return state
  }
}

export default rootReducer
