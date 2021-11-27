import axios from 'axios';

//no hacer logica en ACTIONS, hacerla en Reducer

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

export function filterCharactersByStatus(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_STATUS',
        payload
    }

}

export function filterCreated(payload) {
    return{
        type: 'FILTER_CREATED',
        payload
    }
}