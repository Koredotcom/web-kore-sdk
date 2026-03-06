##  Table template

###### Preview

<img width="222" alt="table" src="https://github.com/Koredotcom/web-kore-sdk/assets/131746603/e317b8e9-3b42-41e0-af5a-3a33873b9ea9">


###### Message Payload

```js
var elements = [
    {id: "1", name: "Peter", designation: "Producer", salary: 1000},
    {id: "2", name: "Sam", designation: "Director", salary: 2000},
    {id: "3", name: "Nick", designation: "DoP", salary: 1500}
];
var message = {
    "type": "template",
    "payload": {
        "template_type": "table",
        "text": "Account details",
        "columns": [
            ["Sl", "center"], ["Name"], ["Designation"], ["Salary", "right"]
        ],
        "table_design": "regular", // regular, responsive
        speech_hint: "Here is your account details",
        elements: []
    }
};
var ele = [];
for (var i = 0; i < elements.length; i++) {
    var elementArr = [elements[i].id, elements[i].name, elements[i].designation, elements[i].salary];
    ele.push({'Values': elementArr});
}
message.payload.elements = ele;
print(JSON.stringify(message));
```



##  Kore Custom Table template

Table template with postback and clickable urls

###### Preview

<img width="417" height="897" alt="image" src="https://github.com/user-attachments/assets/e9a64b23-537d-483e-a107-65501aa81d98" />

###### Message Payload

```js
let elements = [
  { id: "1", name: "Peter", designation: "Producer", salary: 1000 },
  { id: "2", name: "Sam", designation: "Director", salary: 2000 },
  { id: "3", name: "Nick", designation: "DoP", salary: 1500 },
  { id: "4", name: "Peter", designation: "Producer", salary: 1000 },
  { id: "5", name: "Sam", designation: "Director", salary: 2000 },
  { id: "6", name: "Nick", designation: "DoP", salary: 1500 }
];
let message = {
  "type": "template",
  "payload": {
    "template_type": "custom_table",
    "text": "Account details",
    "columns": [["Sl", "center"], ["Name"], ["Designation"], ["Salary", "right"]],
    "table_design": "regular", // regular only
    speech_hint: "Here is your account details",
    elements: []
  }
};
let ele = [];
for (let i = 0; i < elements.length; i++) {
  let elementArr = [
    [elements[i].id, "text"],
    [elements[i].name, "text"],
    [elements[i].designation, "button", { "type": "web_url", "title": "click", "url": "https://www.kore.ai" }],
    [elements[i].salary, "button", { "type": "postback", "title": "click", "payload": "id1" }]];
  ele.push({ 'Values': elementArr });
}
message.payload.elements = ele;
print(JSON.stringify(message));
```
