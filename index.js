const core = require('@actions/core');
const path = require('path');
const fs = require ('fs');
const Fingerprint = require ("@expo/fingerprint");

async function run() {

    try {
        const fingerprintPath = core.getInput('path') || "./.expo/fingerprint.json";
        const fullFingerprintPath = path.resolve(fingerprintPath);

        const projectPath = core.getInput("project-path") || "./";
        const fullProjectPath = path.resolve(projectPath);

        const fullFingerprint = fs.readFileSync(fullFingerprintPath);
        const projectHash = JSON.parse(fullFingerprint);

        console.log({fullFingerprintPath, fullProjectPath});
        const currentHash = await Fingerprint.createFingerprintAsync(fullProjectPath);

        console.log({projectHash: JSON.stringify(projectHash), currentHash: JSON.stringify(currentHash)});
        core.setOutput("project-fingerprint", projectHash.hash);
        core.setOutput("current-fingerprint", currentHash.hash);
        core.setOutput("matches", currentHash.hash === projectHash.hash);

        const results = await Fingerprint.diffFingerprintChangesAsync(fullFingerprint, fullProjectPath);
        console.log({results});
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
