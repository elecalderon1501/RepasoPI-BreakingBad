import axios from 'axios';



//en esta funcion estamos conectando el Front con el Back
export function getCharacters() {
    return async function (dispatch) {
        var json = await axios ("http://localhost:3001/characters");
        return dispatch ({
            type: 'GET_CHARACTERS',
            payload: json.data
        })        
    }
}