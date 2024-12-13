document.addEventListener('DOMContentLoaded', function () {
    const settingsIcon = document.getElementById('settingsIcon');
    const dropdown = document.getElementById('settingsDropdown');
    const fileInput = document.getElementById('file-upload-1');
    const fileInputName = document.getElementById('file-input-name-1');
    const form = document.getElementById('incidentForm');

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

    // Mejorar manejo de archivos
    fileInput.addEventListener('change', function () {
        const fileNames = Array.from(this.files).map(file => file.name).join(', ');
        fileInputName.textContent = fileNames || 'No archivo adjunto';
    });

    function setupOtherOption(name) {
        const radioButtons = document.querySelectorAll(`input[name="${name}"]`);
        const otherInput = document.getElementById(`${name}-otro-input`);
        const otherTextInput = document.getElementById(`${name}-otro`);
        const otherRadio = document.querySelector(`input[name="${name}"][value="otro"]`);

        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this === otherRadio) {
                    otherInput.style.display = 'block';
                    otherTextInput.disabled = false;
                } else {
                    otherInput.style.display = 'none';
                    otherTextInput.disabled = true;
                    otherTextInput.value = ''; 
                }
            });
        });
    }
    
    // Configurar el comportamiento para "tipo-carta"
    setupOtherOption('tipo-carta');
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // Aquí puedes agregar el código para enviar el formulario
            console.log('Formulario enviado');
            // Puedes usar fetch() o XMLHttpRequest para enviar los datos al servidor
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validar campos requeridos
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Validar que se haya seleccionado un tipo de carta
        const tipoCarta = form.querySelector('input[name="tipo-carta"]:checked');
        if (!tipoCarta) {
            isValid = false;
            // Mostrar mensaje de error para tipo de carta
        }

        // Validar formato de correo electrónico
        const correo = document.getElementById('correo');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo.value && !emailRegex.test(correo.value)) {
            isValid = false;
            correo.classList.add('error');
        } else {
            correo.classList.remove('error');
        }

        return isValid;
    }
});