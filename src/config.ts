import * as fs from "fs";
import * as path from "path";

class ConfigClass {
    public CockpitUrl = process.env.CockpitUrl || "http://api.yourdomain";
    public CockpitToken = process.env.CockpitToken || "longvaluetokenfromadmin";
    public VkToken = process.env.VkToken || "";
}

export let Config = new ConfigClass();

LoadCustomConfig("config.json");

async function LoadCustomConfig(filename: string) {
    console.log("=== Loading custom config " + filename + " ===");
    const configfile = fs.readFileSync(path.resolve(filename)).toString();
    const config = JSON.parse(configfile) as ConfigClass;

    for (const configvar in config) {
        if (!config.hasOwnProperty(configvar) || !Config.hasOwnProperty(configvar)) {
            continue;
        }

        console.log("Read " + configvar + " from custom config");

        (Config as any)[configvar] = (config as any)[configvar];
    }
    console.log("=== Loading custom config ended ===");
}
