# helmi-scraper

Get some JSON messages from your local school.

Scrapes tampere.helmi.fi with a headless Puppeteer and outputs your message inbox to stdout as JSON.

## Usage

Node.js v12 is required.

Install dependencies with `npm install`, and run:

```sh
HELMI_USERNAME="my.username" HELMI_PASSWORD="my.password" node index.js
```

You can also pipe the output to a file (or elsewhere) for additional processing.

Optionally set `DEVTOOLS=true` to launch a headful Chromium.

## License

MIT
