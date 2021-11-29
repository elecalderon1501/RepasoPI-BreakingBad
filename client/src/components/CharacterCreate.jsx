import React, { useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'; //en react router dom v6 useHistory --> useNavigate()
import { postCharacter, getOccupations } from '../actions';
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
    let errors = {};
    if (!input.name) { //input = estado local
        errors.name = 'Se requiere un nombre';
    } else if (!input.nickname) {
        errors.nickname = 'Nickname debe ser completado';
    }
    return errors;
};


export default function CharacterCreate(){
    const dispatch = useDispatch()
    const history = useNavigate() //me redirige a la ruta que le indique (useHistory=useNavigate)
    const occupations = useSelector((state) => state.occupations)
    const[errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        occupation: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    }

function handleCheck(e){
    if (e.target.checked) {
        setInput({
            ...input,
            status: e.target.value
        })
    }
}

function handleSelect(e){
    setInput({
        ...input,
        occupation: [...input.occupation, e.target.value]
        // me guarda en un arreglo todo lo que vaya seleccionando de select
    })
}

function handleSubmit(e){
    e.preventDefault();
    console.log(input)
    dispatch(postCharacter(input))
    alert("Personaje Creado!")
    setInput({
        name: "",
        nickname: "",
        birthday: "",
        status: "",
        occupation: []
    })
    history.push('/home') //luego de crear el personaje, redirige automaticamente a Home
}

function handleDelete(el){
    setInput({
        ...input,
        occupation: input.occupation.filter(occ => occ!== el)
    })
}


    useEffect(() => {
        dispatch(getOccupations());
    }, [dispatch]);

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type="text"
                    value= {input.name}
                    name="name"
                    onChange = {(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p> //renderizo el error
                    )}
                </div>
                <div>
                <label>Nickname:</label>
                    <input
                    type="text"
                    value= {input.nickname}
                    name="nickname"
                    onChange = {(e)=>handleChange(e)}
                    />
                </div>
                <div>
                <label>Cumpleaños:</label>
                    <input
                    type="text"
                    value= {input.birthday}
                    name="birthday"
                    onChange = {(e)=>handleChange(e)}
                    />
                </div>
                <div>
                <label>Imagen:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange = {(e)=>handleChange(e)}
                    />
                </div>
                <div>
                <label>Status:</label>
                   <label> <input
                    type="checkbox"
                    value= "Alive"
                    name="Alive"
                    onChange={(e)=>handleCheck(e)}
                    /> Alive</label>
                     <label> <input
                    type="checkbox"
                    value= "Deceased"
                    name="Deceased"
                    onChange={(e)=>handleCheck(e)}
                    /> Deceased</label>
                    <label> <input
                    type="checkbox"
                    value= "Unknown"
                    name="Unknown"
                    onChange={(e)=>handleCheck(e)}
                    /> Unknown</label>
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {occupations.map((occ) => (
                        <option value = {occ.name} > {occ.name} </option>
                    ))}
                </select>

                
                <button type= 'submit'>Crear Personaje</button>
            </form>
            {input.occupation.map(el =>
                <div className='divOcc'>
                    <p>{el}</p>
                    <button className="botonX" onClick={()=> handleDelete(el)}>x</button>
                </div>
                )}
        </div>
    )
}