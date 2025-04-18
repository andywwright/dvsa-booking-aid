document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('startDate');
  const end = document.getElementById('endDate');
  const save = document.getElementById('save');

  browser.storage.local.get(['startDate', 'endDate']).then(data => {
    start.value = data.startDate || '';
    end.value = data.endDate || '';
  });

  save.addEventListener('click', () => {
    browser.storage.local.set({
      startDate: start.value,
      endDate: end.value
    });
  });
});