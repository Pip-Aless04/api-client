document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload');
    const fileInputName = document.getElementById('file-input-name');
    const fileInputButton = document.querySelector('.file-input-button');

    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const documentDate = document.getElementById('document-date');
    const notification = document.getElementById('notification');

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

    function setDefaultValue() {

        const tipoNovedad = document.getElementById('incident-type');
        tipoNovedad.value = '';

        const startDate = document.getElementById('start-date');
        startDate.value = '';

        const endDate = document.getElementById('end-date');
        endDate.value = '';
        
        const documentDate = document.getElementById('document-date');
        documentDate.value = '';
        
        const fileInput = document.getElementById('file-upload');
        const fileText = document.getElementById('file-input-name');
        fileInput.value = '';
        fileText.textContent = 'Seleccione un archivo';

        const fechaEnvioDoc = document.getElementById('document-date');
        fechaEnvioDoc.value = null;
    }

    function closeAlert() {
        const alert = document.getElementById('alert');
        alert.classList.remove('show');
    }

    let alertTimeout;
    function showAlert(type, info) {
        const alert = document.getElementById('alert');
        const alertMessage = document.getElementById('alertMessage');
        const alertIcon = document.getElementById('alertIcon');
        // Clear any existing timeout
        clearTimeout(alertTimeout);
        // Set the alert message, type, and icon
        alert.className = `alert ${type} show`;
        // Set the appropriate icon
        switch(type) {
            case 'success':
                alertMessage.textContent = `La solicitud se ha enviado correctamente`;
                alertIcon.className = 'alert-icon fas fa-check-circle';
                break;
            case 'warning':
                alertIcon.className = 'alert-icon fas fa-exclamation-triangle';
                break;
            case 'error':
                alertMessage.textContent = `Error al enviar el reporte: ${info}`;
                alertIcon.className = 'alert-icon fas fa-times-circle';
                break;
            case 'info':
                alertIcon.className = 'alert-icon fas fa-info-circle';
                break;
        }
        
        // Automatically hide the alert after 5 seconds
        alertTimeout = setTimeout(() => {
            closeAlert();
        }, 5000);
    }
    
    function closeAlert() {
        const alert = document.getElementById('alert');
        alert.classList.remove('show');
    }

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
            showAlert('error', 'La fecha de inicio no puede ser mayor que la fecha de fin.');
        }

        const formData = new FormData();

        formData.append('tipo_novedad', incidentType);
        formData.append('fecha_inicio', startDateValue);
        formData.append('fecha_fin', endDateValue);
        formData.append('fecha_envio_doc', fechaDocValue);
        formData.append('file', file);
        formData.append('tipo_documento', 5); 
        formData.append('tipo_reporte', 4);  

        fetch('/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showAlert('success', 'La solicitud se ha enviado correctamente');
            setDefaultValue();
        })
        .catch(error => {
            showAlert('error', 'Ocurrió un error al conectar con el servidor.', error.message);
            console.error('Error al enviar la solicitud:', error);
        });
    });
});
