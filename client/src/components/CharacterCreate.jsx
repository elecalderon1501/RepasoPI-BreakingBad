import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { postCharacter, getOccupations } from '../actions';
import { useDispatch, useSelector } from "react-redux";

export default function CharacterCreated(){
    const dispatch = useDispatch()
    const occupations = useSelector((state) => state.occupations)

    const [input, setInput] = useState({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        occupation: []
    })

    useEffect(() => {
        dispatch(getOccupations());
    }, []);

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input
                    type="text"
                    value= {input.name}
                    name="name"
                    />
                </div>
                <div>
                <label>Nickname:</label>
                    <input
                    type="text"
                    value= {input.nickname}
                    name="nickname"
                    />
                </div>
                <div>
                <label>Cumpleaños:</label>
                    <input
                    type="text"
                    value= {input.birthday}
                    name="birthday"/>
                </div>
                <div>
                <label>Imagen:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    />
                </div>
                <div>
                <label>Status:</label>
                   <label> <input
                    type="checkbox"
                    value= "Alive"
                    name="Alive"/> Alive</label>
                     <label> <input
                    type="checkbox"
                    value= "Deceased"
                    name="Deceased"/> Deceased</label>
                    <label> <input
                    type="checkbox"
                    value= "Unknown"
                    name="Unknown"/> Unknown</label>
                </div>
            </form>
        </div>
    )
}