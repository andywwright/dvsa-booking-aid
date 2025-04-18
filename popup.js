document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('startDate');
  const end = document.getElementById('endDate');
  const rangeDisplay = document.getElementById('currentRange');
  const save = document.getElementById('save');

  const today = new Date();
  const threeMonths = new Date();
  threeMonths.setMonth(today.getMonth() + 3);

  browser.storage.local.get(['startDate', 'endDate']).then(data => {
    const startVal = data.startDate || today.toISOString().split('T')[0];
    const endVal = data.endDate || threeMonths.toISOString().split('T')[0];
    start.value = startVal;
    end.value = endVal;
    rangeDisplay.textContent = `🔎 Current Range: ${startVal} → ${endVal}`;
  });

  save.addEventListener('click', () => {
    const newStart = start.value;
    const newEnd = end.value;
    browser.storage.local.set({
      startDate: newStart,
      endDate: newEnd
    }).then(() => {
      rangeDisplay.textContent = `🔎 Current Range: ${newStart} → ${newEnd}`;
    });
  });
});