// Postures menu dropdown:
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    let unicorn = M.Dropdown.init(elems);
    let instance = M.Dropdown.getInstance(elems);

    // instance.open();
  });

// Toggle dark mode:
let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('#dark-mode-toggle')

// check if dark mode is enabled
// if enabled, turn it off
// if enable, turn it on

const enableDarkMode = () => {
  // add class darkmode to the body
  document.body.classList.add('darkmode')
  localStorage.setItem('darkMode', 'enabled')
}

const disableDarkMode = () => {
  // add class darkmode to the body
  document.body.classList.remove('darkmode')
  localStorage.setItem('darkMode', null)
}

if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
    console.log(darkMode)
  } else {
    disableDarkMode();
  }
})