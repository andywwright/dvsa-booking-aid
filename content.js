(async () => {
  const showCountdown = (seconds) => {
    let box = document.getElementById('dvsa-countdown-box');
    if (!box) {
      box = document.createElement('div');
      box.id = 'dvsa-countdown-box';
      box.style.position = 'fixed';
      box.style.bottom = '10px';
      box.style.right = '10px';
      box.style.background = '#444';
      box.style.color = '#fff';
      box.style.padding = '8px 12px';
      box.style.borderRadius = '8px';
      box.style.zIndex = '9999';
      box.style.fontFamily = 'sans-serif';
      document.body.appendChild(box);
    }
    box.textContent = `⏳ Refreshing in ${seconds}s`;
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const urlMatch = location.href.includes("dvsa.gov.uk/manage?execution");
  const phraseMatch = document.body.innerText.includes("Please choose one of the test centres below");

  if (!urlMatch || !phraseMatch) return;

  const { startDate, endDate } = await browser.storage.local.get(['startDate', 'endDate']);
  const start = new Date(startDate || Date.now());
  const end = new Date(endDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000));

  const loop = async () => {
    for (let i = rand(300, 500); i > 0; i--) {
      showCountdown(i);
      await sleep(1000);
    }

    const links = [...document.querySelectorAll('a.test-centre-details-link')];
    for (const link of links) {
      const text = link.innerText;
      if (!text.includes("No tests found on any date")) {
        const dateMatch = text.match(/\d{1,2} \w+ \d{4}/);
        if (dateMatch) {
          const date = new Date(dateMatch[0]);
          if (date >= start && date <= end) {
            clearInterval(timer);
            const audio = new Audio(browser.runtime.getURL("alert.mp3"));
            audio.play();
            link.click();
            return;
          }
        }
      }
    }
    location.reload();
  };

  let timer = setTimeout(loop, 1000);
})();