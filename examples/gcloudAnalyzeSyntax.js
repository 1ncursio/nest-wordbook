const language = require('@google-cloud/language');
require('dotenv').config();

async function quickstart() {
  // Imports the Google Cloud client library
  try {
    // Instantiates a client
    const client = new language.LanguageServiceClient({
      keyFile: process.env.GCLOUD_KEYFILE,
    });

    // The text to analyze
    const text =
      '今度の週末にお祭りがあります。お祭りに行く時は普通の服でもいいですが、私は浴衣が着たいと思いました。それで、昨日百貨店に行きました。近所の店には着物しかなかったからです。百貨店の着物売り場には、たくさんの着物がありましたが、ここにも浴衣は少ししかありませんでした。';

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    // const [result] = await client.analyzeSentiment({ document: document });
    const [result] = await client.analyzeSyntax({ document, encodingType: 'UTF8' });
    const sentiment = result.documentSentiment;

    require('fs').writeFileSync(`${Date.now()}-analyze-syntax.json`, JSON.stringify(result));

    // console.log(`Text: ${text}`);
    // console.log(`result ${result.sentences}`);
    // console.log(`Sentiment score: ${sentiment.score}`);
    // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  } catch (error) {
    console.error(error);
  }
}

quickstart();
