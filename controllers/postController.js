import posts from "../data.js"
import connection from "../data/db.js"

function index(req, res) {
    const tags = req.query.tags;

    let filteredVideogames = posts;
    if (tags !== undefined) {
        filteredVideogames = posts.filter((videogame) =>
            videogame.tags.includes(tags)
        )
    }

    const listaVideogiochi = {
        totale: filteredVideogames.length,
        risultati: filteredVideogames,

    }
    res.json(listaVideogiochi)
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const videogioco = posts.find(game => game.id === id)

    if (videogioco !== undefined) {
        res.json(videogioco)
    } else {
        res.status(404)
        res.json({
            error: "Not found",
            message: "Videogioco non in elenco"
        })
    }

}


function store(req, res) {
    const dati = req.body;
    console.log(dati);

    if (dati.titolo === undefined || dati.titolo.length === 0) {
        res.status(400);
        return res.json({
            error: "Errore",
            message: "Il titolo è obbligatorio"
        })
    }

    const nuovoId = posts[posts.length - 1].id + 1;
    const nuovoVideogioco = {
        id: nuovoId,
        titolo: dati.titolo,
        contenuto: dati.contenuto,
        immagine: dati.immagine,
        tags: dati.tags
    }

    posts.push(nuovoVideogioco)
    res.status(201)
    res.json(nuovoVideogioco)
}

function update(req, res) {

    const id = parseInt(req.params.id);



    const videogioco = posts.find((videogioco) => videogioco.id === id)

    if (videogioco === undefined) {
        res.status(404)
        return res.json({
            error: "Not found",
            message: "Videogioco non trovato"
        })
    }
    const dati = req.body;
    videogioco.titolo = dati.titolo;
    videogioco.contenuto = dati.contenuto;
    videogioco.immagine = dati.immagine;
    videogioco.tags = dati.tags

    res.json(videogioco)
}

function modify(req, res) {
    console.log("aggiorno parzialmente videogioco")
    const id = req.params.id;
    res.send("Aggiorno parzialmente videogioco " + id)
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((gioco) => gioco.id === id)
    if (index === -1) {
        res.status(404)
        res.json({
            error: "Not found",
            message: "Videogioco non trovato"
        })
    } else {
        posts.splice(index, 1)
    }
    res.sendStatus(204)
}

const controller = {
    index,
    show,
    store,
    update,
    modify,
    destroy,


}

export { controller }