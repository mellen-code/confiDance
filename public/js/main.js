document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.dropdown-trigger');
    let unicorn = M.Dropdown.init(elems);
    let instance = M.Dropdown.getInstance(elems);

    instance.open();
  });