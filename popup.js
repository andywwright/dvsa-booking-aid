document.getElementById('save').addEventListener('click', async () => {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const maxCentres = document.getElementById('maxCentres').value;
  await browser.storage.local.set({ startDate, endDate, maxCentres });
  updateCurrentRangeDisplay(startDate, endDate, maxCentres);
});

function updateCurrentRangeDisplay(start, end, centres) {
  const rangeBox = document.getElementById('currentRange');
  rangeBox.textContent = `🔎 Range: ${start} → ${end}, Centres: ${centres}`;
}

(async () => {
  const settings = await browser.storage.local.get(['startDate', 'endDate', 'maxCentres']);
  if (settings.startDate) document.getElementById('startDate').value = settings.startDate;
  if (settings.endDate) document.getElementById('endDate').value = settings.endDate;
  if (settings.maxCentres) document.getElementById('maxCentres').value = settings.maxCentres;
  updateCurrentRangeDisplay(settings.startDate, settings.endDate, settings.maxCentres);
})();

document.getElementById('clear').addEventListener('click', () => {
  browser.storage.local.clear().then(() => {
    alert('Local data cleared.');
    location.reload();
  });
});


document.getElementById('clear').addEventListener('click', async () => {
  await browser.storage.local.clear();
  alert('Local storage cleared. Reloading...');
  location.reload();
});
