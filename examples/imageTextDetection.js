const vision = require('@google-cloud/vision');
const path = require('path');
require('dotenv').config();
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFile: path.join(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */

// Performs text detection on the local file
async function main() {
  try {
    const [result] = await client.textDetection(path.join(__dirname, './sample/KakaoTalk_20210818_194210210.jpg'));
    const detections = result.textAnnotations;
    console.log('Text:');
    console.log(result);
    // detections.forEach((text) => console.dir(text, { depth: null cd}));
  } catch (error) {
    console.error(error);
  }
}

main();
