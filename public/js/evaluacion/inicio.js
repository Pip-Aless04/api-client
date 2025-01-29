document.addEventListener("DOMContentLoaded", () => {
  
  const settingsIcon = document.querySelector('.settings-icon');
  const dropdown = document.querySelector('.dropdown');

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
  


})


function evaluateEmployee(employeeId) {
  alert(`Iniciando evaluación para el empleado con ID: ${employeeId}`)
  // Aquí puedes agregar la lógica para iniciar el proceso de evaluación
}
