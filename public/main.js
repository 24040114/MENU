// la funcion principal del main es:

//  1. Obtiene los valores del formulario 
//  2. Valida que los campos tengan información
//  3. La funcion fetch hace las peticiones al servidor
//  4. /calcular-promedio es la ruta a donde se estan enviando la petición
//  5. method: 'POST' → Vamos a enviar datos
//  6. headers → Estamos enviando JSON
//  7. body → Aquí van los datos convertidos a texto JSO

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE NAVEGACIÓN ---
    window.mostrarSeccion = (idSeccion) => {
        const secciones = ['seccion-moneda', 'seccion-notas'];
        secciones.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.display = (id === idSeccion) ? 'block' : 'none';
        });
    };

    // --- 2. LÓGICA DEL CONVERSOR DE MONEDA ---
    document.getElementById('btnConvertirMoneda').addEventListener('click', () => {
        const cantidadMXN = document.getElementById('cantidadMXN').value;

        if (!cantidadMXN || cantidadMXN <= 0) {
            alert('Por favor, ingresa una cantidad válida en pesos.');
            return;
        }

        fetch('/convertir-moneda', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidadMXN })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('resultadoUSD').value = `$ ${data.dolares} USD`;
        })
        .catch(err => console.error("Error en conversión:", err));
    });

    // --- 3. LÓGICA DE CALIFICACIONES (CORREGIDA) ---
    document.getElementById('btnCalcularNotas').addEventListener('click', () => {
        // Quitamos la línea de 'nombreAlumno' porque ya no existe en tu HTML
        const unidad1 = document.getElementById('unidad1').value;
        const unidad2 = document.getElementById('unidad2').value;
        const unidad3 = document.getElementById('unidad3').value;

        if (!unidad1 || !unidad2 || !unidad3) {
            alert('Por favor, completa todas las calificaciones.');
            return;
        }

        fetch('/calcular-promedio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Enviamos un nombre genérico para que el servidor no falle
            body: JSON.stringify({ nombre: "Estudiante", unidad1, unidad2, unidad3 })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('promedioRes').value = data.promedio;
            const estatusInput = document.getElementById('estatusRes');
            estatusInput.value = data.estatus;
            
            // Color dinámico según el estatus
            estatusInput.style.color = (data.estatus === "Aprobado") ? "#00ffcc" : "#ff0055";
        })
        .catch(err => {
            console.error("Error en promedio:", err);
            alert("Error al conectar con el servidor");
        });
    });

    // --- 4. BOTÓN LIMPIAR TODO ---
    document.getElementById('btnLimpiarTodo').addEventListener('click', () => {
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
            if(input.id === 'estatusRes') input.style.color = ''; 
        });
    });
});