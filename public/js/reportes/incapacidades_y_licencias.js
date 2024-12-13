document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload');
    const fileInputName = document.getElementById('file-input-name');
    const fileInputButton = document.querySelector('.file-input-button');

    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const documentDate = document.getElementById('document-date');

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
    document.querySelector('.form-content').addEventListener('submit', function (e) {
        e.preventDefault();

        const incidentType = document.getElementById('incident-type').value;
        const startDateValue = startDate.value;
        const endDateValue = endDate.value;
        const fechaDocValue = documentDate.value;
        const file = fileInput.files[0];

        // Validación de fechas
        if (new Date(startDateValue) > new Date(endDateValue)) {
            alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
            return;
        }

        const formData = new FormData();

        formData.append('tipo_novedad', incidentType);
        formData.append('fecha_inicio', startDateValue);
        formData.append('fecha_fin', endDateValue);
        formData.append('fecha_envio_doc', fechaDocValue);
        formData.append('file', file);
        formData.append('tipo_documento', 3); // Ejemplo de campo fijo
        formData.append('tipo_reporte', 4);   // Ejemplo de campo fijo

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
