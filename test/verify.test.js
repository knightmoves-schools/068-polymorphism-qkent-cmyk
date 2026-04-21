const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe('the index.js file', () => {
  it('should rename the `talk` method on the `Dog` class to `say`', async function() {
      const talkMethod = await page.evaluate(() => {
        let dog = new Dog();
        return dog.talk;
      });
      
      const sayMethod = await page.evaluate(() => {
        let dog = new Dog();
        return dog.say;
      });

      expect(talkMethod).toBeUndefined();
      expect(sayMethod).not.toBeUndefined();
  });

  it('should rename the `sing` method on the `Bird` class to `say`', async function() {
      const singMethod = await page.evaluate(() => {
        let bird = new Bird();
        return bird.sing;
      });
      
      const sayMethod = await page.evaluate(() => {
        let bird = new Bird();
        return bird.say;
      });

      expect(singMethod).toBeUndefined();
      expect(sayMethod).not.toBeUndefined();
  });

  it('should replace the if statements with a single call to the `say` method', async function() {
      const audio = await page.evaluate(() => {
        return listen(animals);
      });

      expect(audio.length).toBe(3);
  });
});

