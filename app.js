const express = require('express');
const app = express();

// Configuración para que Express entienda JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static('public'));

// --- RUTA 1: PROMEDIO DE CALIFICACIONES ---
app.post('/calcular-promedio', (req, res) => {
    const { unidad1, unidad2, unidad3 } = req.body;

    // Convertir a números
    const u1 = parseFloat(unidad1);
    const u2 = parseFloat(unidad2);
    const u3 = parseFloat(unidad3);

    // Validación básica
    if (isNaN(u1) || isNaN(u2) || isNaN(u3)) {
        return res.status(400).json({ error: "Por favor, ingresa números válidos." });
    }

    const promedio = (u1 + u2 + u3) / 3;
    const estatus = promedio >= 6 ? "Aprobado" : "Reprobado";

    res.json({
        promedio: promedio.toFixed(2),
        estatus: estatus
    });
});

// --- RUTA 2: CONVERSOR DE MONEDA (MXN a USD) ---
app.post('/convertir-moneda', (req, res) => {
    const { cantidadMXN } = req.body;
    const pesos = parseFloat(cantidadMXN);

    // Validación de cantidad
    if (isNaN(pesos) || pesos <= 0) {
        return res.status(400).json({ error: "Cantidad no válida" });
    }

    // Tipo de cambio (puedes ajustarlo)
    const tipoCambio = 18.50; 
    const dolares = pesos / tipoCambio;

    res.json({
        dolares: dolares.toFixed(2)
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`==============================================`);
    console.log(`🚀 Servidor Convertir y calificaciones corriendo con éxito`);
    console.log(`🌐 Accede en: http://localhost:${PORT}`);
    console.log(`==============================================`);
});