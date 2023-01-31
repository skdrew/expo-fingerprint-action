const core = require('@actions/core');
const path = require('path');
const fs = require ('fs');

try {
    const fingerprintPath = core.getInput('path') || "./.expo/fingerprint.json";
    const fullPath = path.resolve(fingerprintPath);

    const rawdata = fs.readFileSync(fullPath);
    const rootObj = JSON.parse(rawdata);

    core.setOutput("fingerprint", rootObj.hash);
} catch (error) {
    core.setFailed(error.message);
}
