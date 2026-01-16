import express from "express"
import  postsRouter from "./routers/post.js"
import gestoreErrore from "./middleware/gestoreErrori.js";
import notFound from "./middleware/notFound.js";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.use(express.json())

app.get("/", (req, res) => {
    console.log("rotta /");
    res.send("test")
})



app.use("/posts", postsRouter)

app.use(notFound);
app.use(gestoreErrore);


app.listen(port, () => {
    console.log("Il server è in ascolto sulla porta " + port)
})