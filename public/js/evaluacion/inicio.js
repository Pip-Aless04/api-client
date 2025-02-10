document.addEventListener("DOMContentLoaded", () => {
  
  const settingsIcon = document.querySelector('.settings-icon');
  const dropdown = document.querySelector('.dropdown');
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
  
  btnMoreInfo.addEventListener('click', function (event) {
    window.location.href = 'mas_info';
  });

})


function startEvaluation(colId) {
  window.location.href = `evaluaciones/${colId}`;
}
