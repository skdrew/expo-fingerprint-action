const core = require('@actions/core');
const path = require('path');
const fs = require ('fs');
const Fingerprint = require ("@expo/fingerprint");

async function run() {

    try {
        const fingerprintPath = core.getInput('path') || "./.expo/fingerprint.json";
        const projectPath = core.getInput("project-path") || "./";
        const fullPath = path.resolve(fingerprintPath);
        const fullProjectPath = path.resolve(projectPath);

        const rawdata = fs.readFileSync(fullPath);
        const rootObj = JSON.parse(rawdata);

        core.setOutput("fingerprint", rootObj.hash);

        const currentHash = await Fingerprint.createFingerprintAsync(fullProjectPath);
        console.log({currentHash})
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
