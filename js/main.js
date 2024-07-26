// JavaScript to handle mouse hover for dropdown display
  document.querySelector('.dropdown').addEventListener('mouseover', function() {
    this.querySelector('.dropdown-menu').style.display = 'block';
  });

  document.querySelector('.dropdown').addEventListener('mouseout', function() {
    this.querySelector('.dropdown-menu').style.display = 'none';
  });