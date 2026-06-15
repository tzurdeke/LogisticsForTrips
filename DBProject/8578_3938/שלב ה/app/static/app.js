// app.js – Client-side logic
// Auto-dismiss alerts after 5 seconds
document.addEventListener('DOMContentLoaded', () => {
  // Auto-dismiss flash messages
  document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => {
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-8px)';
      alert.style.transition = 'all 0.4s ease';
      setTimeout(() => alert.remove(), 400);
    }, 5000);
  });

  // Highlight active sidebar link
  const path = window.location.pathname.split('/')[1] || 'index';
  document.querySelectorAll('.sidebar a').forEach(a => {
    if (a.getAttribute('href') === '/' + path || (path === '' && a.getAttribute('href') === '/')) {
      a.classList.add('active');
    }
  });

  // Confirm before delete
  document.querySelectorAll('[data-confirm]').forEach(el => {
    el.addEventListener('click', e => {
      if (!confirm(el.dataset.confirm || 'האם אתה בטוח שברצונך למחוק?')) {
        e.preventDefault();
      }
    });
  });

  // Table row highlight on click (for copy)
  document.querySelectorAll('tbody tr').forEach(tr => {
    tr.addEventListener('click', () => {
      document.querySelectorAll('tbody tr.selected').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
    });
  });
});
