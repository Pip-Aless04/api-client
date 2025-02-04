document.addEventListener("DOMContentLoaded", () => {
  
  const settingsIcon = document.querySelector('.settings-icon');
  const dropdown = document.querySelector('.dropdown');
  const btnStartEvaluation = document.querySelector('.btn-comenzar-evaluacion');
  const btnMoreInfo = document.querySelector('.btn-mas-info');

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
  
  btnStartEvaluation.addEventListener('click', function (event) {
    window.location.href = 'evaluaciones';
  });

  btnMoreInfo.addEventListener('click', function (event) {
    window.location.href = 'mas_info';
  });

})


function evaluateEmployee(employeeId) {
  alert(`Iniciando evaluación para el empleado con ID: ${employeeId}`)
  // Aquí puedes agregar la lógica para iniciar el proceso de evaluación
}
