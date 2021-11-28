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

export function getNameCharacters(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/characters?name=" + name)
            return dispatch ({
                type: "GET_NAME_CHARACTERS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getOccupations () {
    return async function (dispatch) {
        var info = await axios("http://localhost:3001/occupations",{

        });
        return dispatch({ type: "GET_OCCUPATIONS", 
        payload: info.data});
    };
}



export function postCharacter(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/character", payload);
        console.log(response);
        return response;
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
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