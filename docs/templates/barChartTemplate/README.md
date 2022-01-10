var elements = [{
    "title": "Peter",
    "values": [10, 5, 15, 20],
    "displayValues": ["10ml", "5ml", "15ml", "20ml"]
},
{
    "title": "Sam",
    "values": [30, 15, 12, 60],
    "displayValues": ["30 mins", "15 mns", "12 mins", "1 hour"]
}
];

var X_axis = ["15-Jan-2017", "20-Jan-2017", "25-Jan-2017", "30-Jan-2017"];

var message = {
    "type": "template",
    "payload": {
        "text": "Peter Sam Report",
        "template_type": "barchart",
        "direction": "vertical",
        "auto_adjust_X_axis": "no",
        "stacked": false,
        "X_axis": [],
        "Auto_adjust_X_axis": "yes",
        "elements": [],
        "speech_hint": "Here is your report"
    }
};

var ele = [];

for (var i = 0; i < elements.length; i++) {
    var element = {
        "title": elements[i].title,
        "values": elements[i].values,
        "displayValues": elements[i].displayValues
    };
    ele.push(element);
}

message.payload.elements = ele;
message.payload.X_axis = X_axis;
print(JSON.stringify(message));
