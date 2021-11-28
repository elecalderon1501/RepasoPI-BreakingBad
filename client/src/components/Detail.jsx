import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

const myCharacter = useSelector ((state) => state.detail)
    return(
        <div>
            {
                myCharacter.length>0 ?
                <div>
                    <h1>Soy {myCharacter[0].name}</h1>
                    <img src={myCharacter[0].img?myCharacter[0].img : myCharacter[0].image} alt="" width="500px" height="700px"/>
                    <h2>Status: {myCharacter[0].status}</h2>
                    <p>Cumpleaños: {myCharacter[0].bithday}</p>
                    <h5>Ocupaciones: {!myCharacter[0].createdInDb? myCharacter[0].occupation + ' ': myCharacter[0].occupations.map(el => el.name + (''))} </h5> 
                    {/* este ternario pregunta porque esta guardado como 'occupations' en DB */}
                </div> : <p>Loading...</p>
            }
            <Link to= '/home'>
                <button>Volver</button>
            </Link>
        </div>
    )

}