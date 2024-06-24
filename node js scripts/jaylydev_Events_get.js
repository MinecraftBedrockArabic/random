const https = require("node:https");
const cheerio = require("cheerio");
const BeforeEvent = [];
const AfterEvent = [];

const className = "BeforeEvent"//AfterEvent or BeforeEvent
const vers = '1_11_0_beta' // 1_11_0_beta or 1_10_0

const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  https.get(
    `https://jaylydev.github.io/scriptapi-docs/1.20.80/classes/_minecraft_server_${vers}.World${className}s.html`,
    async (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", async () => {
        console.log(`"${className}":{`);
        const html = cheerio.load(data);
        for (const element of html("section")) {
          const section = html(element);
          const property = section.find("a").attr("id");
          if (!property || property === "constructor") continue;
          const propertyUrl = `https://jaylydev.github.io/scriptapi-docs/1.20.80/classes/_minecraft_server_${vers}.${capitalizeFirstLetter(property)}${className}.html`;
          const properties = await fetchProperties(propertyUrl);
          console.log(`"${property}" :{"name":"${property}","properties": ${JSON.stringify(properties)},"description": "${html(element).find('p').first().text().replace(/\s+/g, ' ').trim()}"},`);
        }
        console.log("}");
      });
    }
  );

async function fetchProperties(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const html = cheerio.load(data);
        const properties = [];
        for (const element of html("section")) {
          const section = html(element);
          const property1 = section.find("a").attr("id");
          if (!property1 || property1 === "constructor") continue;

          if(!properties.includes(properties.find(e => e.property === property1))) {
            properties.push({property: `${property1}`, description: `${html(element).find('p').first().text().replace(/\s+/g, ' ').trim()}`});
          }
        }
        resolve(properties);
      });
    });
  });
}

async function fetchClasses(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const html = cheerio.load(data);
        const classes = [];
        for (const element of html("section")) {
          const section = html(element);
          const property1 = section.find("a").attr("id");
          if (!property1 || property1 === "constructor") continue;
          classes.push(property1);
        }
        resolve(classes);
      });
    });
  })
}
