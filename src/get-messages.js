const puppeteer = require('puppeteer');

function log(msg) {
  process.stderr.write(`${msg}\n`);
}

async function getMessages({
  username,
  password,
  url = 'https://tampere.helmi.fi',
  puppetOptions
}) {
  const browser = await puppeteer.launch(puppetOptions);
  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 800,
    deviceScaleFactor: 1.0
  });

  log('Logging in...');
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.type('input[type=text]', username);
  await page.type('input[type=password]', password);

  await Promise.all([
    page.click('.buttonLogin'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  await Promise.all([
    page.click('#messages'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  // Fetch inbox
  log('Fetching inbox contents...');
  const inbox = await page.evaluate(() => {
    const els = document.querySelectorAll('#tblInbox tr');
    return Array.from(els)
      .map(el => ({
        name: el.querySelectorAll('.td_link')[0].innerText,
        title: el.querySelectorAll('.td_link')[1].innerText,
        date: el.querySelectorAll('.td_link')[2].innerText,
        unread: el.className.includes('unreadMessage')
      }));
  });

  const els = await page.$$('#tblInbox tr');
  const getMessageAtIndex = async (index) => {
    await Promise.all([
      page.click(`#tblInbox tr:nth-child(${index + 1}) span`),
      page.waitForSelector('.message_body')
    ]);
    const message = await page.$eval('.message_body', el => el.innerText);
    await page.evaluate(() => {
      const body = document.querySelector('.message_body');
      body.parentNode.removeChild(body);
    });

    return message.replace(/\n\s*\n\s*\n/g, '\n\n');
  };

  log('Fetching messages...');
  for (var i = 0; i < els.length; i++) {
    inbox[i].message = await getMessageAtIndex(i);
  }
  await browser.close();
  log('Done!');

  return inbox;
}

module.exports = getMessages;
