const https = require("node:https");
const fs = require("node:fs");
const cheerio = require("cheerio");

const classes = ["World", "Player", "Block"];
const link = "https://jaylydev.github.io/scriptapi-docs/1.21.0/classes/_minecraft_server_1_12_0_beta.XxXxXxX.html";

classes.forEach((className) => {
  https.get(
    link.replace("XxXxXxX", className),
    (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        const html = cheerio.load(data);
        const properties = {
          noExample: [],
          exampleWithJs: [],
          exampleWithTs: [],
          thisShouldBeEmpty: [],
        };
        html("section").each((index, element) => {
          const section = html(element);
          const property = section.find("a").attr("id");
          if (!property || property == "constructor") return;
          const code = section.find("pre").find("code").attr("class");
          const example = section.find("h4").text().includes("Example");
          if (!code || !example) {
            properties.noExample.push({ property: property });
          } else if (code == "language-js" && example) {
            properties.exampleWithJs.push({
              property: property,
              language: "javascript",
            });
          } else if ((code == "language-typescript" || code == "language-ts") && example) {
            properties.exampleWithTs.push({
              property: property,
              language: "typescript",
            });
          } else properties.thisShouldBeEmpty.push({ property: property, code: code });
        });
        console.log(className ,":",properties);
      });
    }
  );
});
