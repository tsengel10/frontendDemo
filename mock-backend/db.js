String.prototype.capitalize = function () {
    return `${this[0].toUpperCase()}${this.slice(1)}`;
};

module.exports = () => {
    "use strict";

    let faker = require("faker");

    function Group() {
        this.groupId = faker.random.number();
        this.groupName = `${faker.name.prefix()} ${faker.name.lastName()}'s ${faker.company.bsAdjective().capitalize()} Class`;
        this.groupCode = faker.lorem.words(1)[0];
    }

    let groups = [];
    while (groups.length < 3) {
        groups.push(new Group());
    }

    return {
        groups: groups,
        "api-response": { status: 200 }
    };
};