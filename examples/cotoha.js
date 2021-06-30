const axios = require('axios');
const main = async () => {
  const { result } = await axios.post(
    'https://api.ce-cotoha.com/api/nlp/v1/parse',
    {
      sentence: '打っていいのは、打たれる覚悟のある奴だけだ。',
    },
    { Authorization: 'Bearer ' }
  );
  console.log(result);
};

main();
