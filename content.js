(async () => {
  const isCalendarPage = document.body.innerText.includes("Test date / time");
  if (!isCalendarPage) return;

  const clickAvailableDate = () => {
    const available = document.querySelector('.BookingCalendar-date--bookable a');
    if (available) {
      available.click();
      console.log('✅ Clicked available date.');
      return true;
    }
    return false;
  };

  const clickFirstTimeSlot = () => {
    const timeSlot = document.querySelector('input[name="slotTime"]');
    if (timeSlot) {
      timeSlot.click();
      console.log('✅ Clicked time slot.');
      return true;
    }
    return false;
  };

  const clickContinue = () => {
    const btn = document.querySelector('#slot-chosen-submit');
    if (btn) {
      btn.click();
      console.log('✅ Clicked Continue.');
      return true;
    }
    return false;
  };

  const playSound = () => {
    const audio = new Audio(browser.runtime.getURL("alert.mp3"));
    audio.play();
    console.log('🔊 Played sound alert.');
  };

  const proceedFlow = async () => {
    if (!clickAvailableDate()) return;

    const waitForTimeSlots = async (maxWait = 5000) => {
      const interval = 200;
      let waited = 0;
      return new Promise(resolve => {
        const timer = setInterval(() => {
          if (clickFirstTimeSlot()) {
            clearInterval(timer);
            setTimeout(() => {
              clickContinue();
              playSound();
            }, 500);
            resolve();
          } else {
            waited += interval;
            if (waited >= maxWait) {
              console.warn("⚠️ No time slot appeared.");
              clearInterval(timer);
              resolve();
            }
          }
        }, interval);
      });
    };

    await waitForTimeSlots();
  };

  setTimeout(proceedFlow, 500); // slight delay to allow calendar to fully render
})();