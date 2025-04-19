(async () => {
  const isTargetPage = document.body.innerText.includes("Please choose one of the test centres below");
  if (!isTargetPage) return;

  const settings = await browser.storage.local.get(['startDate', 'endDate', 'maxCentres']);
  const startDate = settings.startDate ? new Date(settings.startDate) : new Date();
  const endDate = settings.endDate ? new Date(settings.endDate) : new Date(new Date().setMonth(new Date().getMonth() + 3));
  const maxCentres = parseInt(settings.maxCentres || 4, 10);

  const matchesRange = (text) => {
    const regex = /([0-9]{2}\/([0-9]{2})\/([0-9]{4}))/;
    const found = text.match(regex);
    if (!found) return false;
    const [day, month, year] = found[1].split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return date >= startDate && date <= endDate;
  };

  const links = [...document.querySelectorAll("a.test-centre-details-link")];
  let checked = 0;
  for (const link of links) {
    if (checked >= maxCentres) break;
    if (matchesRange(link.innerText)) {
      clearInterval(window.__dvsaCountdownInterval);
      const audio = new Audio(browser.runtime.getURL("alert.mp3"));
      audio.play();
      link.click();
      return;
    }
    checked++;
  }

  const countdown = document.createElement("div");
  countdown.style.cssText = "position:fixed;bottom:10px;right:10px;background:#333;color:#fff;padding:6px 12px;font-size:14px;border-radius:6px;z-index:9999;";
  document.body.appendChild(countdown);

  let remaining = Math.floor(Math.random() * 200) + 300;
  countdown.textContent = `🔄 Refreshing in ${remaining}s`;

  clearInterval(window.__dvsaCountdownInterval);
  window.__dvsaCountdownInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      location.reload();
    } else {
      countdown.textContent = `🔄 Refreshing in ${remaining}s`;
    }
  }, 1000);
})();