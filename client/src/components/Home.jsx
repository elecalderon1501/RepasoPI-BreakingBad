import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCharacters } from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';


export default function Home(){
    
const dispatch = useDispatch()
const allCharacters = useSelector ((state) => state.characters)

useEffect (() =>{
    dispatch(getCharacters());  //=mapDispatchtoprops

}, [dispatch])

function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
}

return(
    <div>
        <Link to = '/character'>Crear personaje</Link>
        <h1>Aguante Breaking Bad</h1>
        <button onClick ={e => {handleClick(e)}}> 
        {/* resetea los personajes */}
            Volver a cargar todos los personajes
        </button>
        <div>
            {/* filtros */}
            <select>
                <option value = 'asc'>Ascendente</option>
                <option value = 'desc'>Descendente</option>
            </select>
            <select>
                <option value = 'All'>Todos</option>
                <option value = 'Alive'> Vivo</option>
                <option value = 'Deceased'>Muerto</option>
                <option value = 'Unknown'>Desconocido</option>
                <option value = 'Presumed Dead'>Probablemente Muerto</option>
            </select>
            <select>
                <option value = 'All'>Todos</option>
                <option value = "created">Creados</option>
                <option value = 'api'>Existente</option>
            </select>
            {allCharacters.map(el => {
                    return(
                        <div>
                            <Link to={"/home/" + el.id}>
                            <Card name = {el.name} image= {el.img} nickname = {el.nickname} key={el.id}/>
                        </Link>
                        </div>
                    );
                })
            }
        </div>

    </div>
)
}