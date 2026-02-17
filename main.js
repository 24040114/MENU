document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE NAVEGACIÓN ---
    window.mostrarSeccion = (idSeccion) => {
        const secciones = ['seccion-moneda', 'seccion-notas'];
        secciones.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.display = (id === idSeccion) ? 'block' : 'none';
        });
    };

    // --- 2. LÓGICA DEL CONVERSOR DE MONEDA (CÁLCULO LOCAL) ---
    document.getElementById('btnConvertirMoneda').addEventListener('click', () => {
        const cantidadMXN = parseFloat(document.getElementById('cantidadMXN').value);
        const tipoCambio = 20.30; // Puedes ajustar el valor del dólar aquí

        if (!cantidadMXN || cantidadMXN <= 0) {
            alert('Por favor, ingresa una cantidad válida en pesos.');
            return;
        }

        // En lugar de fetch, calculamos aquí mismo
        const resultado = (cantidadMXN / tipoCambio).toFixed(2);
        document.getElementById('resultadoUSD').value = `$ ${resultado} USD`;
    });

    // --- 3. LÓGICA DE CALIFICACIONES (CÁLCULO LOCAL) ---
    document.getElementById('btnCalcularNotas').addEventListener('click', () => {
        const unidad1 = parseFloat(document.getElementById('unidad1').value);
        const unidad2 = parseFloat(document.getElementById('unidad2').value);
        const unidad3 = parseFloat(document.getElementById('unidad3').value);

        if (isNaN(unidad1) || isNaN(unidad2) || isNaN(unidad3)) {
            alert('Por favor, completa todas las calificaciones con números.');
            return;
        }

        // Cálculo del promedio localmente
        const promedio = ((unidad1 + unidad2 + unidad3) / 3).toFixed(2);
        const estatus = (promedio >= 7) ? "Aprobado" : "Reprobado";

        // Mostrar resultados en los inputs
        document.getElementById('promedioRes').value = promedio;
        const estatusInput = document.getElementById('estatusRes');
        estatusInput.value = estatus;
        
        // Color dinámico según el estatus
        estatusInput.style.color = (estatus === "Aprobado") ? "#00ffcc" : "#ff0055";
    });

    // --- 4. BOTÓN LIMPIAR TODO ---
    document.getElementById('btnLimpiarTodo').addEventListener('click', () => {
        document.querySelectorAll('input').forEach(input => {
            input.value = '';
            if(input.id === 'estatusRes') input.style.color = ''; 
        });
    });
});