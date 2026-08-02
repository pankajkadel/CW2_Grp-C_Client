
  window.addEventListener('DOMContentLoaded', () => {
    const circumference = 2 * Math.PI * 45;
    const ring = document.getElementById('ringFill');
    ring.style.strokeDasharray = circumference;
    const pct = 0.62;
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = circumference * (1 - pct);
    });

    document.getElementById('barCompleted').style.width = (20/28*100) + '%';
    document.getElementById('barRemaining').style.width = (8/28*100) + '%';
  });

  document.querySelectorAll('.qa-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast(btn.dataset.toast));
  });

  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }


