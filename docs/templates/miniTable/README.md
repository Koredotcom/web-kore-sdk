var elements = [
    {
        "primary": [["Current Accounts"], ["300", "right"]],
        "additional": [["CA00001", "150"], ["CA00123", "50"], ["CA23423", "100"]]
    },
    {
        "primary": [["Savings Accounts"], ["200", "right"]],
        "additional": [["SA33001", "75"], ["SA67345", "125"]]
    }
];
var message = {
    "type": "template",
    "payload": {
        "template_type": "mini_table",
        "layout": "horizontal",
        "text": "Account details",
        speech_hint: "Here is your account details",
        elements: []
    }
};
var ele = [];
for (var i = 0; i < elements.length; i++) {
    ele.push({'primary': elements[i].primary, 'additional': elements[i].additional});
}
message.payload.elements = ele;
print(JSON.stringify(message));
