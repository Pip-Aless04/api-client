document.addEventListener('DOMContentLoaded', function () {
    const reportCards = document.querySelectorAll('.report-card');
    const mantenimientoCards = document.querySelectorAll('.mantenimiento-card');
    const evalCards = document.querySelectorAll('.eval-card');
    const settingsIcon = document.querySelector('.settings-icon');
    const dropdown = document.querySelector('.dropdown');
    const tableRows = document.querySelectorAll('.pending-table tr[data-id]'); // Selecciona filas con data-id
    const modal = document.getElementById("filterModal");
    const historico = document.querySelector('[data-report-page="historico"]');
    const closeBtn = document.getElementsByClassName("close")[0];
    const filterForm = document.getElementById("filterForm");
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

    evalCards.forEach(card => {
        card.addEventListener('click', function () {
            const page = this.dataset.page;
            window.location.href = `evaluacion/${page}`;
        });
    });

    // Navegación por las tarjetas
    //estamos desplegando, volver a implementar cuando se tenga la funcionalidad
    
    reportCards.forEach(card => {
        card.addEventListener('click', function () {
            const page = this.dataset.reportPage;
            if (page !== 'historico') {
            window.location.href = `bienestar-integral/${page}`;
            }	
        });
    });
    
    mantenimientoCards.forEach(card => {
        card.addEventListener('click', function () {
            const page = this.dataset.page;
            if (page !== 'historico') {
            window.location.href = `mantenimiento/${page}`;
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

    if (historico) {
        historico.onclick = function() {
            modal.style.display = "block";
            setTimeout(() => modal.classList.add("show"), 10);
        }
    }
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            closeModal();
        }
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
    
    if (filterForm){
        filterForm.onsubmit = function(e) {
            e.preventDefault();
            const formData = new FormData(filterForm);
            const filters = Object.fromEntries(formData.entries());
            // Here you would typically send the filters to your backend
            // For this example, we'll just log them to the console
            console.log("Applied Filters:", filters);
                    // Enviar datos al servidor
            window.location.href=`/dhcoapp/bienestar-integral/historico?tipo_reporte=${filters.tipo_reporte}`;
        }
    }
    

    // Manejo de botones "Aceptar" y "Rechazar"
    tableRows.forEach(row => {
        const id = row.dataset.id;
        const currentStatus = row.dataset.estado; // Leer el estado actual desde data-estado
        const tipoReporte = row.dataset.tipoReporte; // Leer el tipo_reporte_id desde data-tipo-reporte
        const buttons = row.querySelectorAll('.action-buttons button');

        buttons.forEach(button => {
            
            button.addEventListener('click', function () {
                const action = button.value; // 1 para aceptar, 0 para rechazar
                // Determinar el próximo estado según el actual y la acción
                let newStatus;
                if (action === '1') {
                    if (tipoReporte == 2){
                        if (currentStatus === 'S') {
                            newStatus = 'P'; // De solicitado a pendiente
                        } else if (currentStatus === 'P') {
                            newStatus = 'A'; // De pendiente a aceptado
                        }
                    }else{
                        newStatus = 'A'
                    }
                } else if (action === '0') {
                    newStatus = 'D'; // Rechazado en cualquier estado
                }

                if (!newStatus) {
                    alert('Acción no válida para el estado actual');
                    return;
                }

                // Enviar la actualización al servidor
                fetch('/dhcoapp/bienestar-integral/aceptar_rechazar_vacaciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, estado: newStatus }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Pendiente actualizado a ${newStatus}:, data`);

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

    /*
    filterForm.onreset = function() {
        ratingValue.textContent = "3";
        //startDateInput.max = "";
        endDateInput.min = "";
    }  
    */
    
}); // Cierre del bloque DOMContentLoaded