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
        const projectHash = JSON.parse(rawdata);

        console.log({fullPath});
        const currentHash = await Fingerprint.createFingerprintAsync(fullProjectPath);

        core.setOutput("project-fingerprint", projectHash.hash);
        core.setOutput("current-fingerprint", currentHash.hash);
        core.setOutput("matches", currentHash.hash === projectHash.hash);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
