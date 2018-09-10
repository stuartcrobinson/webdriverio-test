var assert = require('assert');

const challenge = require('./challenge_helper_wdio.js');

describe('AI QA Dev Interview Code Challenge 2 - WebdriverIO', function() {

    const condition = "temperature > 70";
    const text = "It's hot"
    const email = "stuart.clifford@gmail.com";
    const password = "strongpassword"

    it('should create project with file upload', function() {

        challenge.login(email, password)

        challenge.createProjectFromCsvUpload("/Users/stuart.robinson/Downloads/ai.csv");

        challenge.addBranch(condition, text);

        assert(browser.isExisting("//span[text()=\"" + text + "\" and not(@class)]/../../../*[@class='branch']"))
    });

});