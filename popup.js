document.addEventListener('DOMContentLoaded', () => {
  const start = document.getElementById('startDate');
  const end = document.getElementById('endDate');
  const maxCentres = document.getElementById('maxCentres');
  const rangeDisplay = document.getElementById('currentRange');
  const save = document.getElementById('save');

  const today = new Date();
  const threeMonths = new Date();
  threeMonths.setMonth(today.getMonth() + 3);

  browser.storage.local.get(['startDate', 'endDate', 'maxCentres']).then(data => {
    const startVal = data.startDate || today.toISOString().split('T')[0];
    const endVal = data.endDate || threeMonths.toISOString().split('T')[0];
    const maxVal = data.maxCentres || 4;
    start.value = startVal;
    end.value = endVal;
    maxCentres.value = maxVal;
    rangeDisplay.textContent = `🔎 Range: ${startVal} → ${endVal}, Centres: ${maxVal}`;
  });

  save.addEventListener('click', () => {
    const newStart = start.value;
    const newEnd = end.value;
    const newMax = parseInt(maxCentres.value, 10) || 4;
    browser.storage.local.set({
      startDate: newStart,
      endDate: newEnd,
      maxCentres: newMax
    }).then(() => {
      rangeDisplay.textContent = `🔎 Range: ${newStart} → ${newEnd}, Centres: ${newMax}`;
    });
  });
});