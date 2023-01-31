const core = require('@actions/core');
const fs = require ('fs');

try {
    const fingerprintPath = core.getInput('path') || "./.expo/fingerprint.json";

    const fullPath = path.resolve(fingerprintPath);
    core.info(`Processing file: ${fullPath}`);
    console.log(`Hello ${fullPath}!`);

    const rawdata = fs.readFileSync(fullPath);
    const rootObj = JSON.parse(rawdata);

    console.log({rootObj});
    console.log(`hash is: ${rootObj.hash}`);
    const fingerprint = (new Date()).toTimeString();
    core.setOutput("fingerprint", fingerprint);
} catch (error) {
    core.setFailed(error.message);
}
