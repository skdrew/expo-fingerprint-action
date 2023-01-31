const core = require('@actions/core');
const fs = require ('fs');

try {
  // `who-to-greet` input defined in action metadata file
  const fingerprintPath = core.getInput('path') || "./.expo/fingerprint.json";
  console.log(`Hello ${fingerprintPath}!`);

  const rawdata = fs.readFileSync(fingerprintPath);
  const rootObj = JSON.parse(rawdata);

  console.log({rootObj});
  console.log(`hash is: ${rootObj.hash}`);
  const fingerprint = (new Date()).toTimeString();
  core.setOutput("fingerprint", fingerprint);
} catch (error) {
  core.setFailed(error.message);
}
