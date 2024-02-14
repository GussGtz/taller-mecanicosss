const express = require("express");
const cors = require("cors");
const trabajoRouter = require("./Router/trabajoRouter");
const piezasRouter = require("./Router/piezaRouter");
const mecanicosRouter = require("./Router/mecanicosRouter");
const loginRouter = require("./Router/loginRouter"); // Importa el enrutador de autenticación desde el archivo adecuado

const correoRouter = require("./Router/correoRouter");
// const emailRouter = require("./Router/emailRouter"); // Importa el enrutador de correo electrónico

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use("/api/trabajos", trabajoRouter);
app.use("/api/piezas", piezasRouter);
app.use("/api/mecanico", mecanicosRouter);
app.use("/api", loginRouter); // Usa el enrutador de autenticación
app.use("/api/correo", correoRouter);


// app.use("/api/email", emailRouter); // Usa el enrutador de correo electrónico

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
