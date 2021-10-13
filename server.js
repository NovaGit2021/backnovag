import Express from 'express';

const app = Express();
app.use(Express.json());

app.get('/zapatillas', (req, res) => {
    console.log("alguien hizo get en la ruta /zapatillas");
    const zapatillas = [
        { nombre: "total", marca: "nike", edicion: "2006" },
        { nombre: "running", marca: "adidas", edicion: "2020" }
    ];
    res.send(zapatillas);

});

app.post('/zapatillas/nuevo', (req, res) => {
    const datosZapatillas = req.body;
    console.log('llaves: ', Object.keys(datosZapatillas));
    try {
        if (
            Object.keys(datosZapatillas).includes('name') &&
            Object.keys(datosZapatillas).includes('brand') &&
            Object.keys(datosZapatillas).includes('model')
        ) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});


app.listen(5000, () => {
    console.log("escuchando puerto 5000");
});