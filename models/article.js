// modules setup
const mongoose = require('mongoose');
const fs = require('fs');
const converter = require('json-2-csv');
const {PythonShell} = require('python-shell');


// mongodb model setup
const articleSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: { type: String, required: false}
});

const ArticleSchema = mongoose.model('article', articleSchema);

class Article {

  constructor( owner, title, content ) {
    this.owner = owner;
    this.title = title;
    this.content = content;
    this.tag = 'true';
  };

  async save() {
    let data = this.content;
    async function runPy(data) {
      const options = {
        mode: 'text',
        pythonPath: 'ml_algorithms/.venv/Scripts/python.exe',
        pythonOptions: ['-u'],
        args: [data],
      };
      const result = await new Promise((resolve, reject) => {
        PythonShell.run('ml_algorithms/main.py', options, (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        });
      });
      console.log(result);
      return result;
    };
    runPy(data).then((res) => {
      this.tag = res.toString();
      return Promise.resolve(ArticleSchema(this).save());
    });
  };

  static async findArticles(uid) {
    return Promise.resolve(ArticleSchema.find( {owner: uid} ));
  };

  static async deleteArticleById(id) {
    return Promise.resolve(ArticleSchema.deleteOne( {_id: id} ));
  };

  static async textRecogintion(encodedPicture) {
    let content = '';
    async function runPy(data) {
      const options = {
        mode: 'text',
        pythonPath: 'ml_algorithms/.venv/Scripts/python.exe',
        pythonOptions: ['-u']
      };
      const pyScript = new PythonShell('ml_algorithms/image_to_text/text_recognition.py', options);
      pyScript.send(data);

      let result = await new Promise((resolve, reject) => {
        pyScript.on('message', function (message) {
          // received a message sent from the Python script (a simple "print" statement)
          console.log(message);
          return resolve(message);
        });
      });

      // end the input stream and allow the process to exit
      pyScript.end();
      return result;
    };
    content = runPy(encodedPicture);
    return content;
  };

  static async jsonToCSV(article) {
    converter.json2csv(article, (err, csv) => {
      if (err) {
        throw err;
      };
      fs.writeFileSync(`${article.owner}.csv`, csv);
    });
  };
};

module.exports = Article;
