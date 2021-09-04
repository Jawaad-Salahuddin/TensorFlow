'use strict';

require('@tensorflow/tfjs-node');
const qna = require('@tensorflow-models/qna');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

run();

function run() {
    rl.question("What's your passage? ", function (passage) {
        rl.question("What's your question? ", function (question) {
            qna.load().then(model => {
                model.findAnswers(question, passage).then(answers => {
                    console.log(answers);
                    rl.question("Got another question? (Y/N) ", function (response) {
                        if (response == "N") process.exit(0);
                        else run();
                    });
                });
            });
        });
    });
}
