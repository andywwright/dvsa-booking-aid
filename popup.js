document.getElementById("save").addEventListener("click", async () => {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const maxCentres = document.getElementById("maxCentres").value;

  await browser.storage.local.set({ startDate, endDate, maxCentres });
  showCurrentRange();
});

document.getElementById("clear").addEventListener("click", async () => {
  await browser.storage.local.clear();
  document.getElementById("startDate").value = '';
  document.getElementById("endDate").value = '';
  document.getElementById("maxCentres").value = 4;
  showCurrentRange();
});

async function showCurrentRange() {
  const { startDate, endDate, maxCentres } = await browser.storage.local.get(["startDate", "endDate", "maxCentres"]);
  const text = `🔍 Range: ${startDate || '→'} → ${endDate || '→'}, Centres: ${maxCentres || 4}`;
  document.getElementById("currentRange").textContent = text;
}

async function restore() {
  const { startDate, endDate, maxCentres } = await browser.storage.local.get(["startDate", "endDate", "maxCentres"]);
  document.getElementById("startDate").value = startDate || '';
  document.getElementById("endDate").value = endDate || '';
  document.getElementById("maxCentres").value = maxCentres || 4;
  showCurrentRange();
}

restore();