document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.querySelector('.settings-icon');
    const dropdown = document.querySelector('.dropdown');
    const fileInput = document.getElementById('file-upload');
    const fileInputName = document.getElementById('file-input-name');
    const fileInputButton = document.querySelector('.file-input-button');
    const vacationForm = document.getElementById('vacationForm');
    const vacationFormSubmitButton = document.getElementById('vacationFormSubmitButton');

    const fechaInicio = document.getElementById('fecha_inicio');
    const fechaFin = document.getElementById('fecha_fin');

    // Mostrar/ocultar dropdown
    settingsIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!settingsIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Restringir fechas a mañana en adelante
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Formatear fecha como yyyy-mm-dd
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const minDate = formatDate(tomorrow);
    fechaInicio.setAttribute('min', minDate);
    fechaFin.setAttribute('min', minDate);

    // Actualizar la fecha final mínima cuando se selecciona una fecha de inicio
    fechaInicio.addEventListener('change', function () {
        const startDateValue = fechaInicio.value;
        fechaFin.setAttribute('min', startDateValue);
        if (fechaFin.value && fechaFin.value < startDateValue) {
            fechaFin.value = ''; // Limpiar fecha final si es menor que la de inicio
        }
    });

    // Simular clic en el input file al hacer clic en el botón
    fileInputButton.addEventListener('click', function () {
        fileInput.click();
    });

    // Mostrar nombre de los archivos seleccionados
    fileInput.addEventListener('change', function () {
        fileInputName.textContent = this.files.length > 0
            ? Array.from(this.files).map(file => file.name).join(', ')
            : 'No archivo adjunto';
    });


    // Manejo del formulario
    document.getElementById('vacationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const observaciones = document.getElementById('observaciones').value || '';
        const fechaInicioValue = document.getElementById('fecha_inicio').value;
        const fechaFinValue = document.getElementById('fecha_fin').value;
        const fechaDocValue = document.getElementById('fecha_documento').value;
        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];

        // Validación de fechas
        if (new Date(fechaInicioValue) > new Date(fechaFinValue)) {
            alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }

        formData.append('fecha_inicio', fechaInicioValue);
        formData.append('fecha_fin', fechaFinValue);
        formData.append('detalle_reporte', observaciones);
        if (fechaDocValue !== '' && fechaDocValue !== null) {
            formData.append('fecha_envio_doc', fechaDocValue);
        }
        formData.append('tipo_documento', 5);
        formData.append('tipo_reporte', 2);

        console.log('Datos que se enviarán:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        
        fetch('http://localhost:3000/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }
            return response.json(); // Cambia a response.text() si el servidor no devuelve JSON.
        })
        .then(result => {
            console.log(result);
            alert('Formulario enviado exitosamente.');
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            alert('Ocurrió un error al conectar con el servidor.');
        });
        
    });
});
