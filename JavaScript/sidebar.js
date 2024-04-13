const sidebarBtn = document.getElementById('sidebar-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.querySelector('.sidebar');





sidebarBtn.addEventListener('click', ()=>{
  sidebar.classList.add('translate-x-0');
})
closeBtn.addEventListener('click', ()=>{
  sidebar.classList.remove('translate-x-0');
})