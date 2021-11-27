const { Router } = require("express")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios")
//No olvidar traer los modelos
const { Occupation, Character } = require("../db")

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//TRAEMOS TODOS LOS PERSONAJES. Los paginados, filtros y ordenamiento los hacemos en el Front

//getApiInfo trae toda la info de la Api.
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    "https://www.breakingbadapi.com/api/characters"
  )
  const apiInfo = await apiUrl.data.map(el => {
    return {
      name: el.name,
      img: el.img,
      nickname: el.nickname,
      status: el.status,
      id: el.char_id,
      occupation: el.occupation.map(el => el),
      // me devuelve un arreglo con todas las occup
      birthday: el.birthday,
      appearance: el.appearance.map(el => el),
    }
  })
  return apiInfo
}

//traemos la info de la db

const getDbInfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ["name"], //para q me traiga el personaje y el nombre de la ocupacion
      through: {
        attributes: [],
      },
    },
  })
}
//obtenemos el array con toda la info (api + db)
const getAllCharacters = async () => {
  const apiInfo = await getApiInfo()
  const dbInfo = await getDbInfo()
  const infoTotal = apiInfo.concat(dbInfo)
  return infoTotal
}

//usamos esta ruta para obtener personajes y name por query: ?name
router.get("/characters", async (req, res) => {
  const name = req.query.name
  const charactersTotal = await getAllCharacters()
  //si me pasan un name por query --> filtro aquel q coincida con el name q me pasaron por query
  if (name) {
    //pasamos el name por query y el de la api a minusculas para no tener error
    let characterName = await charactersTotal.filter(el =>
      el.name.toLowerCase().includes(name.toLowerCase())
    )
    characterName.length //preguntamos si hubo coincidencia
      ? res.status(200).send(characterName)
      : res.status(404).send("no esta el personaje")
  } else {
    res.status(200).send(charactersTotal)
  }
})

//Traemos las ocupaciones a la DB y luego desde ahi las utilizamos
router.get("/occupations", async (req, res) => {
  const occupationsApi = await axios.get(
    "https://www.breakingbadapi.com/api/characters"
  )
  //las ocupaciones vienen como array ->debemos mapear para traer todas. Me va a devolver un array con varios array
  const occupations = occupationsApi.data.map(el => el.occupation)
  const occEach = occupations.map(el => {
    //aca podrimos utilizar flat
    for (let i = 0; i < el.length; i++) return el[i]
  })
  console.log(occEach)
  occEach.forEach(el => {
    //creamos en el modelo Occupation(db) las que estamos mapeando desde la api, antes buscamos y luego creamos para q no se repitan
    //si tenemos force:true en el index.js vamos a tener que ejecutar esta carga de ocupaciones cada vez que iniciamos. Si no deberiamos cambiar-> force: false
    Occupation.findOrCreate({
      where: { name: el },
    })
  })

  const allOccupations = await Occupation.findAll()
  res.send(allOccupations)
  //devuelvo todas las ocupaaciones que guarde en db
})

router.post("/character", async (req, res) => {
  let { name, nickname, birthday, img, status, createdInDb, occupation } =
    req.body
  //creo el personaje con los datos recibidos por body
  let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
  })
  //la ocupacion la buscamos en el modelo y que coincida con el name q me pasaron por body
  let occupationDb = await Occupation.findAll({
    where: { name: occupation }, //este occupation llega por body
  })
  characterCreated.addOcuppation(occupationDb) //agrego las ocupaciones al personaje creado (las ocupaciones se cargaran como array)
  res.send("Personaje creado con exitos")
})

router.get("/characters/:id", async (req, res) => {
  const id = req.params.id
  const charactersTotal = await getAllCharacters()
  if (id) {
    let characterId = await charactersTotal.filter(el => el.id == id)
    characterId.length
      ? res.status(200).json(characterId)
      : res.status(404).send("No encontre el personaje")
  }
})

module.exports = router
// [
//     {
//       "char_id": 1,
//       "name": "Walter White",
//       "birthday": "09-07-1958",
//       "occupation": [
//         "High School Chemistry Teacher",
//         "Meth King Pin"
//       ],
//       "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
//       "status": "Presumed dead",
//       "nickname": "Heisenberg",
//       "appearance": [
//         1,
//         2,
//         3,
//         4,
//         5
//       ],
//       "portrayed": "Bryan Cranston",
//       "category": "Breaking Bad",
//       "better_call_saul_appearance": [

//       ]
//     },
