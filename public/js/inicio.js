document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    const settingsIcon = document.querySelector('.settings-icon');
    const dropdown = document.querySelector('.dropdown');
    const tableRows = document.querySelectorAll('.pending-table tr[data-id]'); // Selecciona filas con data-id
    const modal = document.getElementById("filterModal");
    const historico = document.querySelector('[data-page="historico"]'); 
    const closeBtn = document.getElementsByClassName("close")[0];
    const filterForm = document.getElementById("filterForm");
    const ratingInput = document.getElementById("rating");
    const ratingValue = document.getElementById("ratingValue");
    //const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    const reportTypes = {
        1: 'salida-personal',
        2: 'solicitud-vacaciones',
        3: 'traslado-personal',
        4: 'incapacidades-y-licencias',
        5: 'solicitud-cartas',
    }
    
    console.log(tableRows);

    // Navegación por las tarjetas
    cards.forEach(card => {
        card.addEventListener('click', function () {
            const page = this.dataset.page;
            if (page !== 'historico') {
            window.location.href = `bienestar-integral/${page}`;
            }	
        });
    });

    // Menú desplegable de configuración
    settingsIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!settingsIcon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Manejo de botones "Aceptar" y "Rechazar"
    tableRows.forEach(row => {
        const id = row.dataset.id;
        const currentStatus = row.dataset.estado; // Leer el estado actual desde data-estado
        const buttons = row.querySelectorAll('.action-buttons button');

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const action = button.value; // 1 para aceptar, 0 para rechazar

                // Determinar el próximo estado según el actual y la acción
                let newStatus;
                if (action === '1') {
                    if (currentStatus === 'S') {
                        newStatus = 'P'; // De solicitado a pendiente
                    } else if (currentStatus === 'P') {
                        newStatus = 'A'; // De pendiente a aceptado
                    }
                } else if (action === '0') {
                    newStatus = 'D'; // Rechazado en cualquier estado
                }

                if (!newStatus) {
                    alert('Acción no válida para el estado actual');
                    return;
                }

                // Enviar la actualización al servidor
                fetch('http://localhost:3000/dhcoapp/bienestar-integral/aceptar_rechazar_vacaciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, estado: newStatus }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Pendiente actualizado a ${newStatus}:`, data);

                        // Actualizar visualmente el estado en la tabla o eliminar la fila
                        row.dataset.estado = newStatus; // Actualizar el estado en el atributo
                        if (newStatus === 'D' || newStatus === 'A' || newStatus === 'P') {
                            row.remove(); // Eliminar la fila si ya no es relevante
                        }
                    })
                    .catch(error => console.error('Error al actualizar el pendiente:', error));
            });
        });
    });

    historico.onclick = function() {
        modal.style.display = "block";
        setTimeout(() => modal.classList.add("show"), 10);
    }

    closeBtn.onclick = function() {
        closeModal();
    }

    function closeModal() {
        modal.classList.remove("show");
        setTimeout(() => modal.style.display = "none", 300);
    }

    /*

    ratingInput.oninput = function() {
        ratingValue.textContent = this.value;
    }

    startDateInput.onchange = function() {
        endDateInput.min = this.value;
    }

    endDateInput.onchange = function() {
        startDateInput.max = this.value;
    }
    */
    filterForm.onsubmit = function(e) {
        e.preventDefault();
        const formData = new FormData(filterForm);
        const filters = Object.fromEntries(formData.entries());
        
        // Here you would typically send the filters to your backend
        // For this example, we'll just log them to the console
        console.log("Applied Filters:", filters);
        
        closeModal();
    }

    filterForm.onreset = function() {
        ratingValue.textContent = "3";
        //startDateInput.max = "";
        endDateInput.min = "";
    }
    document.getElementById('category').addEventListener('change', function() {
        // Get the selected report type
        const reportSelected = this.value;
        
        console.log('Report selected:', reportSelected);
        console.log(`.${reportTypes[reportSelected]}`)

        document.querySelectorAll(`.${reportTypes[reportSelected]}`).forEach(filter => filter.style.display = 'block');
    });
    
    // Lógica para actualizar el valor del rango de calificación
    /*
    document.getElementById('rating').addEventListener('input', function() {
        document.getElementById('ratingValue').textContent = this.value;
    });
    */  
}); // Cierre del bloque DOMContentLoaded

