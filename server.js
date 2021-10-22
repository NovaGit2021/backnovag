import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb'; 
import Cors from "cors";



const stringbaseDeDatos =
    "mongodb+srv://milenapb:Lucianac2019@proyectozapatillas.w8scl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(stringbaseDeDatos, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;

const app = Express();
app.use(Express.json());
app.use(Cors());

//conexión a la base de datos hasta linea 31

app.get('/zapatillas', (req, res) => {
    console.log("alguien hizo get en la ruta /zapatillas");
    baseDeDatos
        .collection("zapatillas")
        .find({})
        .limit(50)
        .toArray((err, result) => {
            if (err) {
                res.status(500).send("Error consultando las zapatillas");
            } else {
                res.json(result);
            }
        });
});

app.post('/zapatillas/nuevo/', (req, res) => {
    const datosZapatillas = req.body;
    console.log('llaves: ', Object.keys(datosZapatillas));
    try {
        if (
            Object.keys(datosZapatillas).includes('reference') &&
            Object.keys(datosZapatillas).includes('brand') &&
            Object.keys(datosZapatillas).includes('edition')
        ) {

            // implementar código para crear zapatilla en la BD
            baseDeDatos.collection("zapatillas").insertOne(datosZapatillas, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.patch("/zapatillas/editar", (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroZapatillas = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    baseDeDatos.collection("zapatillas")
    .findOneAndUpdate(
        filtroZapatillas,
        operacion,
         { upsert: true, returnOriginal: true },
         (err, result) => {
        if (err) {
            console.error("Error actualizando las zapatillas: ", err);
            res.sendStatus(500);
        }
        else {
            console.log("Actualizado con exito");
            res.sendStatus(200);
        }
    }
    );
}
);

app.delete("/zapatillas/eliminar", (req, res) => {
    const filtroZapatillas = { _id: new ObjectId(req.body.id) };
    baseDeDatos.collection("zapatillas").deleteOne(filtroZapatillas, (err, result)=>{
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }

    });


});

app.get('/ventas', (req, res) => {
    console.log("alguien hizo get en la ruta /ventas");
    baseDeDatos
        .collection("ventas")
        .find({})
        .limit(50)
        .toArray((err, result) => {
            if (err) {
                res.status(500).send("Error consultando las ventas");
            } else {
                res.json(result);
            }
        });
});

app.post('/ventas/nueva/', (req, res) => {
    const datosVentas = req.body;
    console.log('llaves: ', Object.keys(datosVentas));
    
    try {
        if (
            Object.keys(datosVentas).includes('price') &&
            Object.keys(datosVentas).includes('agent') &&
            Object.keys(datosVentas).includes('reference')
        ) {

            // implementar código para crear zapatilla en la BD
            baseDeDatos.collection("ventas").insertOne(datosVentas, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.patch("/ventas/editar", (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroVentas = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    baseDeDatos.collection("ventas")
    .findOneAndUpdate(
        filtroVentas,
        operacion,
         { upsert: true, returnOriginal: true },
         (err, result) => {
        if (err) {
            console.error("Error actualizando la venta: ", err);
            res.sendStatus(500);
        }
        else {
            console.log("Actualizado con exito");
            res.sendStatus(200);
        }
    }
    );
}
);

app.delete("/ventas/eliminar", (req, res) => {
    const filtroVentas = { _id: new ObjectId(req.body.id) };
    baseDeDatos.collection("ventas").deleteOne(filtroVentas, (err, result)=>{
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }

    });


});

app.get('/usuarios', (req, res) => {
    console.log("alguien hizo get en la ruta /usuarios");
    baseDeDatos
        .collection("usuarios")
        .find({})
        .limit(50)
        .toArray((err, result) => {
            if (err) {
                res.status(500).send("Error consultando las ventas");
            } else {
                res.json(result);
            }
        });
});

app.post('/usuarios/nuevo', (req, res) => {
    const datosUsuarios = req.body;
    console.log('llaves: ', Object.keys(datosUsuarios));
    
    try {
        if (
            Object.keys(datosUsuarios).includes('name') &&
            Object.keys(datosUsuarios).includes('lastname') &&
            Object.keys(datosUsuarios).includes('email') &&
            Object.keys(datosUsuarios).includes('state') &&
            Object.keys(datosUsuarios).includes('role')
        ) {

            // implementar código para crear zapatilla en la BD
            baseDeDatos.collection("usuarios").insertOne(datosUsuarios, (err, result) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});

app.patch("/usuarios/editar", (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroUsuarios = { _id: new ObjectId(edicion.id) };
    delete edicion.id;
    const operacion = {
        $set: edicion,
    };
    baseDeDatos.collection("usuarios")
    .findOneAndUpdate(
        filtroUsuarios,
        operacion,
         { upsert: true, returnOriginal: true },
         (err, result) => {
        if (err) {
            console.error("Error actualizando el usuario: ", err);
            res.sendStatus(500);
        }
        else {
            console.log("Actualizado con exito");
            res.sendStatus(200);
        }
    }
    );
}
);

app.delete("/usuarios/eliminar", (req, res) => {
    const filtroUsuarios = { _id: new ObjectId(req.body.id) };
    baseDeDatos.collection("usuarios").deleteOne(filtroUsuarios, (err, result)=>{
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }

    });


});

const main = () => {

    client.connect((err, db) => {
        if (err) {
            console.error("Error conectando a la base de datos");
        }
        baseDeDatos = db.db("zapatillas");
        console.log("baseDeDatos exitosa");
        return app.listen(5000, () => {
            console.log("escuchando puerto 5000");
        });
    });
};

main();