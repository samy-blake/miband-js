'use strict';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function displayInfos(miband, device) {

  const idOutput        = document.getElementById('idTd');
  const stepOutput      = document.getElementById('stepsTd');
  // const heartRateOutput = document.getElementById('heartRadTd');
  const batteryOutput   = document.getElementById('batteryTd');


  idOutput.innerHTML = device.id;

  let battery = await miband.getBatteryInfo()
  console.log(battery);
  batteryOutput.innerHTML = battery.level || battery.charge_level + '%';
  
  let pedo = await miband.getPedometerStats();
  stepOutput.innerHTML = pedo.steps;

  // miband.on('heart_rate', (rate) => {
  //   console.log(rate)
  //   heartRateOutput.innerHTML = rate;
  // });

  // await miband.hrmStart();
  // await delay(30000);
  // await miband.hrmStop();
}

module.exports = displayInfos;
