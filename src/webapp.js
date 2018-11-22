'use strict';

import MiBand from './miband';
import test_all from './test';
import displayInfos  from './displayInfos';

import './styles/index.less';

const bluetooth = navigator.bluetooth;

const output = document.querySelector('#output');
const infoDisplay = document.querySelector('#infoDisplay');

function log() {
  document.querySelector('main').style.display = 'block';

  output.innerHTML += [...arguments].join(' ') + '\n';
}

function setInfo(text) {
  infoDisplay.innerHTML = text;
}

async function scan() {
  if (!bluetooth) {
    setInfo('Dein Browser unterstütz kein Web Bluetooth');
    return;
  }

  try {
    setInfo('Scan Bluetooth Geräte...');
    const device = await bluetooth.requestDevice({
      filters: [
        { services: [ MiBand.advertisementService ] }
      ],
      optionalServices: MiBand.optionalServices
    });

    device.addEventListener('gattserverdisconnected', () => {
      setInfo('Mi Band disconnected');
    });

    await device.gatt.disconnect();

    setInfo('Verbindung wird aufgebaut...');
    const server = await device.gatt.connect();
    setInfo('Verbunden');

    let miband = new MiBand(server);

    await miband.init();


    await displayInfos(miband, device);

    // await test_all(miband, log);

  } catch(error) {
    log('Argh!', error);
  }
}

document.querySelector('#scanBtn').addEventListener('click', scan)

