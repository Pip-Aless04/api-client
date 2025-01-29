document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const form = document.getElementById('salidaForm');
    const fileInputs = document.querySelectorAll('.file-input-wrapper input[type="file"]');


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

    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }

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

    // Mostrar nombre del archivo seleccionado
    fileInputs.forEach((input, index) => {
        const fileInputName = document.getElementById(`file-input-name-${index + 1}`);
        input.addEventListener('change', function () {
            const fileName = this.files[0]?.name || 'No archivo adjunto';
            fileInputName.textContent = fileName;
        });
    });

    // Configurar el comportamiento para "otro" en opciones de Motivo de Salida
    const motivoSalidaRadios = document.querySelectorAll('input[name="tipo-motivo"]');
    motivoSalidaRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const otherInput = document.getElementById('tipo-motivo-otro-input');
            if (this.value === 'otro') {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
            }
        });
    });


    function setDefaultValue() {
        const colaboradorInput = document.querySelector('#colaborador');
        colaboradorInput.value = '';

        const paisInput = document.querySelector('#pais');
        paisInput.value = '';

        const fechaSalida = document.getElementById('fecha_salida');
        fechaSalida.value = ''; 

        const salidas = document.querySelectorAll('input[name="tipo-salida"]');
        salidas.forEach(salida => {
            salida.checked = false;
        });

        const otherInput = document.getElementById('tipo-motivo-otro-input');
        otherInput.value = '';
        otherInput.style.display = 'none';

        const motivos = document.querySelectorAll('input[name="tipo-motivo"]');
        motivos.forEach(motivo => {
            motivo.checked = false;
        });

        const fileInputs = document.querySelectorAll('input[type="file"]');
        const fileInputNames = document.querySelectorAll('.file-input-name');

        fileInputs.forEach((input, index) => {
            input.value = null; 
            fileInputNames[index].textContent = 'Seleccione un archivo'; 
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const colaboradorInput = document.querySelector('#colaborador');
        const colaboradorId = (() => {
            const colaboradorNombre = colaboradorInput.value; // Toma el valor ingresado en el input
            const options = document.querySelectorAll('#colaboradoresList option'); // Asegúrate de tener el ID correcto
            for (const option of options) {
                if (option.value === colaboradorNombre) {
                    return option.dataset.id; // Devuelve el data-id del colaborador seleccionado
                }
            }
            return null; // Retorna null si no encuentra una coincidencia
        })();
        
        const pais = document.querySelector('#pais').value;
        const fechaSalida = document.querySelector('#fecha_salida').value;
        const tipoSalida = document.querySelector('input[name="tipo-salida"]:checked'); 
        const tipoSalidaId = tipoSalida ? tipoSalida.dataset.id : null;

        const motivoSalida = document.querySelector('input[name="tipo-motivo"]:checked'); 
        const motivoSalidaId = motivoSalida ? motivoSalida.dataset.id : null;

        if (!colaboradorId) {
            alert('Debe seleccionar un colaborador válido');
            return;
        }

        if (!tipoSalida) {     
            alert('Debe seleccionar un tipo de salida');
            return;
        }

        if (!motivoSalida) {     
            alert('Debe seleccionar un motivo de salida');
            return;
        }

        const formData = new FormData();
        formData.append('col_id_aplica', colaboradorId);
        formData.append('pais_solicita', pais);
        formData.append('fecha_fin', fechaSalida);
        formData.append('tipo_salida', tipoSalidaId);
        formData.append('motivo_salida', motivoSalidaId);
        formData.append('tipo_reporte', 1);
        formData.append('tipo_documento', [1,2,3,4]);

        // Agregar manejo del campo "otro" al crear FormData
        if (motivoSalida.value === 'otro') {
            const motivoSalidaOtro = document.getElementById('tipo-motivo-otro').value;
            formData.append('otro', motivoSalidaOtro);
        }
        // Enviar datos al servidor
        fetch('/dhcoapp/bienestar-integral/guardar_reporte', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            showAlert('success');
            setDefaultValue();
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            showAlert('error', error.message);
        });        
        
    });
});
