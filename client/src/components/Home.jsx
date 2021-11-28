import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCharacters, filterCharactersByStatus, filterCreated, orderByName } from '../actions';
import {Link} from 'react-router-dom'
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';


export default function Home(){
    
const dispatch = useDispatch()

const allCharacters = useSelector ((state) => state.characters);
const occupations = useSelector ((state) => state.occupations);
const [orden, setOrden] = useState('')
const [currentPage,setCurrentPage] = useState(1) 
// la pagina actual sera 1
const [charactersPerPage, setCharactersPerPage] = useState(6)
//aca ponemos cuantos personajes queremos por pagina
const indexOfLastCharacter = currentPage * charactersPerPage; //6 indice del ultimo personaje
const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage //indice del primer personaje
const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter); // aca me devuelve un array con los personajes entres primer y ultimo 
// 1---0---6
// 2---7---13

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}
//


useEffect (() =>{
    dispatch(getCharacters());  //=mapDispatchtoprops

}, [dispatch])

function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
};

function handleSort (e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleFilterStatus(e){
    dispatch(filterCharactersByStatus(e.target.value))
}

function handleFilterCreated (e){
    dispatch(filterCreated(e.target.value))
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
            <select onChange={e => handleFilterStatus(e)}>
                {/* el value tiene q ser el mismo q los que trae la api */}
                <option value = 'All'>Todos</option>
                <option value = 'Alive'> Vivo</option>
                <option value = 'Deceased'>Muerto</option>
                <option value = 'Unknown'>Desconocido</option>
                <option value = 'Presumed Dead'>Probablemente Muerto</option>
            </select>
            <select onChange = { e => handleFilterCreated(e)}>
                <option value = 'All'>Todos</option>
                <option value = "created">Creados</option>
                <option value = 'api'>Existente</option>
            </select>

            <Paginado charactersPerPage = {charactersPerPage}
            allCharacters = {allCharacters.length}
            paginado = {paginado} />

        <SearchBar/>


            {currentCharacters?.map(el => { //mapeamos renderizamos la pagina seleccionada (1, 2 ...) 
                    return(
                        <div>
                            <Link to={"/home/" + el.id}>
                            <Card name = {el.name} img= {el.img ? el.img : el.image} nickname = {el.nickname} key={el.id}/>
                        </Link>
                        </div>
                    );
                })
            }
        </div>

    </div>
)
}

//c.image? c.image : <img src = 'url......'/>
//aca preguntamos si hay imagen, en caso negativo asignamos una imagen por defecto