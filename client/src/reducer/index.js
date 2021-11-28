const initialState = {
  characters: [],
  allCharacters: [],
  occupations: [],
  detail: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      }
    case 'GET_NAME_CHARACTERS':
      return {
        ...state, 
        characters: action.payload
      }

    case 'GET_OCCUPATIONS':
      return{
        ...state, 
        occupations: action.payload
      }


    case 'FILTER_BY_STATUS':
      const allCharacters = state.allCharacters
      const statusFiltered =
        action.payload === 'All'
          ? allCharacters
          : allCharacters.filter(el => el.status === action.payload)
      //hacer la logica antes del return, si no rompe
      return {
        ...state,
        characters: statusFiltered,
      }

      case 'POST_CHARACTER':
        return{
          ...state,
        }


      //recordar crear personajes para probar este filtro
    case 'FILTER_CREATED':
      const statusFiltered2 = action.payload === 'created'
          ? state.allCharacters.filter(el => el.createdInDb)
          : state.allCharacters.filter(el => !el.createdInDb)
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharacters : statusFiltered2,
      }
        case "GET_DETAILS":
          return {
            ...state,
            detail: action.payload
          }

      case 'ORDER_BY_NAME':
        let sortedArr = action.payload === 'asc' ? state.characters.sort(function (a, b){
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.characters.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        })
      return {
        ...state,
        characters: sortedArr
      }

    default:
      return state
  }
}

export default rootReducer
