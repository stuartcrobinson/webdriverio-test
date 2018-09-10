var assert = require('assert');

module.exports = {

    /**
     * Loads the app and logs in with the given credentials.  
     * 
     * @param {string} email 
     * @param {string} password 
     */

    login: function(email, password) {
        browser.url('https://wordsmith.automatedinsights.com/');

        browser.waitUntil(() => (browser.isExisting('input.email')));

        browser.click('input.email');
        browser.keys(email);
        assert.equal(browser.getValue('input.email'), email);

        browser.click('input.password');
        browser.keys(password);
        browser.keys("\uE007"); //press ENTER

        browser.waitUntil(() => (!browser.isExisting('input.email')));
        browser.waitUntil(() => (browser.isExisting('*=Dashboard')));
    },

    /**
     * Creates a new project by manually filling out the default cities table.
     */
    createProjectDefault: function() {

        browser.waitUntil(() => (browser.isExisting("button=New Project")));
        browser.click("button=New Project");
        // browser.waitUntil(() => (!browser.isExisting("button=New Project")));
        browser.waitUntil(() => (browser.isExisting('div=Create a Project')));

        //now iteratively fill out table
        browser.elements('.ws-input')
            .value
            .forEach((we, index) => {

                const id = we.getAttribute("id")

                browser.click('//*[@id="' + id + '"]')
                browser.keys(we.getAttribute("placeholder"))
            })

        browser.click('button=Create Project');

        browser.waitUntil(() => (!browser.isExisting('button=Create Project')));
        browser.waitUntil(() => (browser.isExisting('button=Add Branch')));
    },

    /**
     * Creates a new project by uploading a csv file, starting from the Dashboard.
     * 
     * @param {string} csvFile Data to upload
     */
    createProjectFromCsvUpload: function(csvFile) {

        //to ensure correct initial page
        browser.waitUntil(() => (browser.isExisting('*=Dashboard')));

        //make sure the button's loaded
        browser.waitUntil(() => (browser.isExisting("button=New Project")));

        browser.click("//*[text()='New Project']/following-sibling::*/button");

        browser.waitUntil(() => (browser.isExisting('=Upload CSV')));

        browser.click('=Upload CSV');

        browser.waitUntil(() => (browser.isExisting('input#name')));

        browser.click('input#name');

        browser.keys("Challenge 2 webdriver.io")

        browser.waitUntil(() => (browser.isExisting('input#file-upload')));

        browser.chooseFile('input#file-upload', csvFile);

        browser.waitUntil(() => (!browser.isExisting('input#file-upload')));
        browser.waitUntil(() => (browser.isExisting('button=Add Branch')));
    },

    /**
     * Adds a new branch to a project, starting from the project template page.
     * 
     * @param {string} condition The branch condition 
     * @param {string} text The resulting branch text
     */
    addBranch: function(condition, text) {

        browser.waitUntil(() => (browser.isExisting('button=Add Branch')));
        browser.click('button=Add Branch')
        browser.waitUntil(() => (browser.isExisting("span=If this is true:")));

        browser.click("//*[text()='If this is true:']/..//*[@role='textbox']");
        browser.keys(condition);
        browser.keys("\uE004"); //tab
        browser.keys(text);

        browser.click('//*[text()="Done"]/../..');

        browser.waitUntil(() => (!browser.isExisting('//*[text()="Done"]/../..')));

        browser.waitUntil(() =>
            (browser.isExisting("//span[text()=\"" + text + "\" and not(@class)]/../../../*[@class='branch']")));
    }

};