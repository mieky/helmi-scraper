const scrapeMessages = require('./src/scrape-messages');

const { HELMI_USERNAME, HELMI_PASSWORD } = process.env;

if (!HELMI_USERNAME || !HELMI_PASSWORD) {
  process.stderr.write(`Please set HELMI_USERNAME and HELMI_PASSWORD as environment variables.\n`);
  process.exit(1);
}

const puppetOptions = !!process.env.DEVTOOLS ?
  { devtools: true } :
  {};

(async () => {
  const inbox = await scrapeMessages({
    username: HELMI_USERNAME,
    password: HELMI_PASSWORD,
    url: 'https://tampere.helmi.fi',
    puppetOptions
  })

  const inboxJson = JSON.stringify(inbox, null, 2);
  process.stdout.write(inboxJson);
  process.stdout.write("\n");
})();

