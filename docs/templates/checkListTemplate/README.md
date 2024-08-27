##  CheckList Template

###### Preview





###### Message Payload

```javascript
var message = {
  "type": "template",
  "payload": {
    "template_type": "checkListTemplate",
    "title": "Here are checklist templates", // optional
    "displayLimit": 1,
    "showMore": true,
    "elements": [
      {
        title: 'Manager Onboarding Tasks',
        taskProgress: '70%',
        subInformation: [
          {
            title: 'Total tasks:',
            value: '3'
          },
          {
            title: 'Total tasks:',
            value: '3'
          },
          {
            title: 'Total tasks:',
            value: '3'
          }
        ],
      'default_action': { // action to be performed
            payload: 'payload1manager', // payload that need to send to bot when it is a postback
            title: 'Manager Onboarding ',// message to be displayed after postback
            type: 'postback', // specifies whether it is a postback or url
          },
        subElements: [
          {
            title: 'Books',
            rightContent: { // it is enabled when nudge function is enabled
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgBpVTRUcMwDH0UBggbeARG8AbAF5/NCNkgZQKODdiAbJAwQWGClgnSTtBKtZyqqnuN03f3zj7ben6WfLrHOTyxIr4RH4kbYTZq4s5wRXTIRJkQimyRica4+TKCDhloVWAla1rMXxOYqfmfmqcSPie+EBdjXPKBXlyUxlmH8zzW4tZdEvQJsUbmSxwr2xrhQ1pmRuw5cUEvIz/9n7iWkfEqrj+IxYMKqnFMfAQHbdW8MMKNrHm1N3zWxjxzDEqJcfxMh1Ch34SzLEQxxjtuBOcsvpXHNfEOE8HOOoSEzjENhRZjoU+EinjkQ1d4WFhhWruJcSfwCCVeqtuuocJpY0hufo9wGM8OrlKVWyB8YkaHUGEL7h7s/gfh06bODHhCaI6xi2j2cklpg/aYNmd3Mc8T1wAAAABJRU5ErkJggg==',
              'default_action': { // action to be performed
                payload: 'payload1', // payload that need to send to bot when it is a postback
                title: 'Books ',// message to be displayed after postback
                type: 'postback', // specifies whether it is a postback or url
              }
            },
            values: [
              {
                title: 'Status: ',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVHgBpZRNTttQEMfn/5JA2PkIWVV0ZbiBUVHVXbNsukE+QcMNyA3oCVKpEnRXd1cBEuEEhBVhZ27gHd9vmPHLI45JiCNmZb8383vzTVRR1vtRq6ou5kJ+b0dsuA1jvspvy58z0xCgIdFDb9QZpJWgrX4UrK2t9JkFCMrY0j8QDxnIwBwQTMREoeBborN79f1kv8yoT3l3qCE2TsUgkPd6Nzf3+2k8yEo2OeTjwXb39u7xl3ekqIfXQD0yW6PO/5QqiLcDkFx+O9qd9pQbezAUMJvNZYHqiNj99Of1ySXtWKs5Wh5Yjsx4L+UynZX0ZYBj5xxUwg7Z2ov3AD8cfGq78zFUem9DdAZFQ/9qFaBKjaD6ztP1wy/5B9gWWqfRV+MieFF3MCPzesZfMkwwUanFztiBq7QbwLm9Ttm4UHwtfRZ6BWdktjy4Sv9aUATW8fWFIiSS17ZOxmzw4oEQRsgoQBmcyJwHzZV6t6g4Ab8N1JGlvEi1nnvAX/z5/FeaPwIeNudtn1mi+QYa5xJpMuocxy+eqqyu3seS16xc9UVA1XeVd15OeeqUtL2sKGkluTdvwjT3zWb9hzjRdcDp9OD16wLmpz252ZHfVB4YSjhnaqxtI/kPAdOWcAPdTLIe4/J6nL/5J/ANypfyWJiumW0CA8nhyYDeI1XzrPIMNe8RyvbVze8AAAAASUVORK5CYII=',//optional
                value: 'Completed',
              },
              {
                title: 'Completed on ',
                icon: '',
                value: 'August 30 2023',
              },
            ],
            default_action: {
              payload: 'payload1',
              title: 'Books ',
              type: 'postback',
            }
          },
          {
            title: 'Books',
            rightContent: {
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgBpVTRUcMwDH0UBggbeARG8AbAF5/NCNkgZQKODdiAbJAwQWGClgnSTtBKtZyqqnuN03f3zj7ben6WfLrHOTyxIr4RH4kbYTZq4s5wRXTIRJkQimyRica4+TKCDhloVWAla1rMXxOYqfmfmqcSPie+EBdjXPKBXlyUxlmH8zzW4tZdEvQJsUbmSxwr2xrhQ1pmRuw5cUEvIz/9n7iWkfEqrj+IxYMKqnFMfAQHbdW8MMKNrHm1N3zWxjxzDEqJcfxMh1Ch34SzLEQxxjtuBOcsvpXHNfEOE8HOOoSEzjENhRZjoU+EinjkQ1d4WFhhWruJcSfwCCVeqtuuocJpY0hufo9wGM8OrlKVWyB8YkaHUGEL7h7s/gfh06bODHhCaI6xi2j2cklpg/aYNmd3Mc8T1wAAAABJRU5ErkJggg==',
              'default_action': {
                payload: 'payload1',
                title: 'Books ',
                type: 'postback',
              }
            },
            values: [
              {
                title: 'Status',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVHgBpZRNTttQEMfn/5JA2PkIWVV0ZbiBUVHVXbNsukE+QcMNyA3oCVKpEnRXd1cBEuEEhBVhZ27gHd9vmPHLI45JiCNmZb8383vzTVRR1vtRq6ou5kJ+b0dsuA1jvspvy58z0xCgIdFDb9QZpJWgrX4UrK2t9JkFCMrY0j8QDxnIwBwQTMREoeBborN79f1kv8yoT3l3qCE2TsUgkPd6Nzf3+2k8yEo2OeTjwXb39u7xl3ekqIfXQD0yW6PO/5QqiLcDkFx+O9qd9pQbezAUMJvNZYHqiNj99Of1ySXtWKs5Wh5Yjsx4L+UynZX0ZYBj5xxUwg7Z2ov3AD8cfGq78zFUem9DdAZFQ/9qFaBKjaD6ztP1wy/5B9gWWqfRV+MieFF3MCPzesZfMkwwUanFztiBq7QbwLm9Ttm4UHwtfRZ6BWdktjy4Sv9aUATW8fWFIiSS17ZOxmzw4oEQRsgoQBmcyJwHzZV6t6g4Ab8N1JGlvEi1nnvAX/z5/FeaPwIeNudtn1mi+QYa5xJpMuocxy+eqqyu3seS16xc9UVA1XeVd15OeeqUtL2sKGkluTdvwjT3zWb9hzjRdcDp9OD16wLmpz252ZHfVB4YSjhnaqxtI/kPAdOWcAPdTLIe4/J6nL/5J/ANypfyWJiumW0CA8nhyYDeI1XzrPIMNe8RyvbVze8AAAAASUVORK5CYII=',
                value: 'Completed',
              },
              {
                title: 'Completed on ',
                icon: '',
                value: 'August 30 2023',
              },
            ],
            default_action: {
              payload: 'payload1',
              title: 'Books ',
              type: 'postback',
            }
          },
          {
            title: 'URL',
            rightContent: {
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgBpVTRUcMwDH0UBggbeARG8AbAF5/NCNkgZQKODdiAbJAwQWGClgnSTtBKtZyqqnuN03f3zj7ben6WfLrHOTyxIr4RH4kbYTZq4s5wRXTIRJkQimyRica4+TKCDhloVWAla1rMXxOYqfmfmqcSPie+EBdjXPKBXlyUxlmH8zzW4tZdEvQJsUbmSxwr2xrhQ1pmRuw5cUEvIz/9n7iWkfEqrj+IxYMKqnFMfAQHbdW8MMKNrHm1N3zWxjxzDEqJcfxMh1Ch34SzLEQxxjtuBOcsvpXHNfEOE8HOOoSEzjENhRZjoU+EinjkQ1d4WFhhWruJcSfwCCVeqtuuocJpY0hufo9wGM8OrlKVWyB8YkaHUGEL7h7s/gfh06bODHhCaI6xi2j2cklpg/aYNmd3Mc8T1wAAAABJRU5ErkJggg==',
              'default_action': {
                url: 'https://itassist-dev.kore.ai/workbench/',
                title: 'Books ',
                type: 'url',
              }
            },
            values: [
              {
                title: 'Status',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVHgBpZRNTttQEMfn/5JA2PkIWVV0ZbiBUVHVXbNsukE+QcMNyA3oCVKpEnRXd1cBEuEEhBVhZ27gHd9vmPHLI45JiCNmZb8383vzTVRR1vtRq6ou5kJ+b0dsuA1jvspvy58z0xCgIdFDb9QZpJWgrX4UrK2t9JkFCMrY0j8QDxnIwBwQTMREoeBborN79f1kv8yoT3l3qCE2TsUgkPd6Nzf3+2k8yEo2OeTjwXb39u7xl3ekqIfXQD0yW6PO/5QqiLcDkFx+O9qd9pQbezAUMJvNZYHqiNj99Of1ySXtWKs5Wh5Yjsx4L+UynZX0ZYBj5xxUwg7Z2ov3AD8cfGq78zFUem9DdAZFQ/9qFaBKjaD6ztP1wy/5B9gWWqfRV+MieFF3MCPzesZfMkwwUanFztiBq7QbwLm9Ttm4UHwtfRZ6BWdktjy4Sv9aUATW8fWFIiSS17ZOxmzw4oEQRsgoQBmcyJwHzZV6t6g4Ab8N1JGlvEi1nnvAX/z5/FeaPwIeNudtn1mi+QYa5xJpMuocxy+eqqyu3seS16xc9UVA1XeVd15OeeqUtL2sKGkluTdvwjT3zWb9hzjRdcDp9OD16wLmpz252ZHfVB4YSjhnaqxtI/kPAdOWcAPdTLIe4/J6nL/5J/ANypfyWJiumW0CA8nhyYDeI1XzrPIMNe8RyvbVze8AAAAASUVORK5CYII=',
                value: 'Completed',
              },
              {
                title: 'Completed on ',
                icon: '',
                value: 'August 30 2023',
              },
            ],
            default_action: {
               url: 'https://itassist-dev.kore.ai/workbench/',
                title: 'Books ',
                type: 'url',
            }
          }
        ]
      },
        {
        title: 'Manager Onboarding Tasks',
        taskProgress: '89%',
        elementStyles:{
          'border':'1px solid #0D6EFD',  
          'box-shadow':'-5px 0px 0px #0D6EFD'
        },
        progressStyles:{
            'fillColor':'#ff0000',
            'background':'#ec7777',
            'textcolor':'ff0000',
        },
        subInformation: [
          {
            title: 'Total tasks:',
            value: '3'
          },
          {
            title: 'Total tasks:',
            value: '3'
          },
          {
            title: 'Total tasks:',
            value: '3'
          }
        ],
    'default_action': { // action to be performed
            payload: 'payload1manager', // payload that need to send to bot when it is a postback
            title: 'Manager Onboarding ',// message to be displayed after postback
            type: 'postback', // specifies whether it is a postback or url
          },
        subElements: [
          {
            title: 'Books',
            rightContent: {
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgBpVTRUcMwDH0UBggbeARG8AbAF5/NCNkgZQKODdiAbJAwQWGClgnSTtBKtZyqqnuN03f3zj7ben6WfLrHOTyxIr4RH4kbYTZq4s5wRXTIRJkQimyRica4+TKCDhloVWAla1rMXxOYqfmfmqcSPie+EBdjXPKBXlyUxlmH8zzW4tZdEvQJsUbmSxwr2xrhQ1pmRuw5cUEvIz/9n7iWkfEqrj+IxYMKqnFMfAQHbdW8MMKNrHm1N3zWxjxzDEqJcfxMh1Ch34SzLEQxxjtuBOcsvpXHNfEOE8HOOoSEzjENhRZjoU+EinjkQ1d4WFhhWruJcSfwCCVeqtuuocJpY0hufo9wGM8OrlKVWyB8YkaHUGEL7h7s/gfh06bODHhCaI6xi2j2cklpg/aYNmd3Mc8T1wAAAABJRU5ErkJggg==',
              'default_action': {
                payload: 'payload1',
                title: 'Books ',
                type: 'postback',
              }
            },
            values: [
              {
                title: 'Status',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVHgBpZRNTttQEMfn/5JA2PkIWVV0ZbiBUVHVXbNsukE+QcMNyA3oCVKpEnRXd1cBEuEEhBVhZ27gHd9vmPHLI45JiCNmZb8383vzTVRR1vtRq6ou5kJ+b0dsuA1jvspvy58z0xCgIdFDb9QZpJWgrX4UrK2t9JkFCMrY0j8QDxnIwBwQTMREoeBborN79f1kv8yoT3l3qCE2TsUgkPd6Nzf3+2k8yEo2OeTjwXb39u7xl3ekqIfXQD0yW6PO/5QqiLcDkFx+O9qd9pQbezAUMJvNZYHqiNj99Of1ySXtWKs5Wh5Yjsx4L+UynZX0ZYBj5xxUwg7Z2ov3AD8cfGq78zFUem9DdAZFQ/9qFaBKjaD6ztP1wy/5B9gWWqfRV+MieFF3MCPzesZfMkwwUanFztiBq7QbwLm9Ttm4UHwtfRZ6BWdktjy4Sv9aUATW8fWFIiSS17ZOxmzw4oEQRsgoQBmcyJwHzZV6t6g4Ab8N1JGlvEi1nnvAX/z5/FeaPwIeNudtn1mi+QYa5xJpMuocxy+eqqyu3seS16xc9UVA1XeVd15OeeqUtL2sKGkluTdvwjT3zWb9hzjRdcDp9OD16wLmpz252ZHfVB4YSjhnaqxtI/kPAdOWcAPdTLIe4/J6nL/5J/ANypfyWJiumW0CA8nhyYDeI1XzrPIMNe8RyvbVze8AAAAASUVORK5CYII=',
                value: 'Completed',
              },
              {
                title: 'Completed on ',
                icon: '',
                value: 'August 30 2023',
              },
            ],
            default_action: {
              payload: 'payload1',
              title: 'Books ',
              type: 'postback',
            }
          },
          {
            title: 'Books',
            rightContent: {
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgBpVTRUcMwDH0UBggbeARG8AbAF5/NCNkgZQKODdiAbJAwQWGClgnSTtBKtZyqqnuN03f3zj7ben6WfLrHOTyxIr4RH4kbYTZq4s5wRXTIRJkQimyRica4+TKCDhloVWAla1rMXxOYqfmfmqcSPie+EBdjXPKBXlyUxlmH8zzW4tZdEvQJsUbmSxwr2xrhQ1pmRuw5cUEvIz/9n7iWkfEqrj+IxYMKqnFMfAQHbdW8MMKNrHm1N3zWxjxzDEqJcfxMh1Ch34SzLEQxxjtuBOcsvpXHNfEOE8HOOoSEzjENhRZjoU+EinjkQ1d4WFhhWruJcSfwCCVeqtuuocJpY0hufo9wGM8OrlKVWyB8YkaHUGEL7h7s/gfh06bODHhCaI6xi2j2cklpg/aYNmd3Mc8T1wAAAABJRU5ErkJggg==',
              'default_action': {
                payload: 'payload1',
                title: 'Books ',
                type: 'postback',
              }
            },
            values: [
              {
                title: 'Status',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVHgBpZRNTttQEMfn/5JA2PkIWVV0ZbiBUVHVXbNsukE+QcMNyA3oCVKpEnRXd1cBEuEEhBVhZ27gHd9vmPHLI45JiCNmZb8383vzTVRR1vtRq6ou5kJ+b0dsuA1jvspvy58z0xCgIdFDb9QZpJWgrX4UrK2t9JkFCMrY0j8QDxnIwBwQTMREoeBborN79f1kv8yoT3l3qCE2TsUgkPd6Nzf3+2k8yEo2OeTjwXb39u7xl3ekqIfXQD0yW6PO/5QqiLcDkFx+O9qd9pQbezAUMJvNZYHqiNj99Of1ySXtWKs5Wh5Yjsx4L+UynZX0ZYBj5xxUwg7Z2ov3AD8cfGq78zFUem9DdAZFQ/9qFaBKjaD6ztP1wy/5B9gWWqfRV+MieFF3MCPzesZfMkwwUanFztiBq7QbwLm9Ttm4UHwtfRZ6BWdktjy4Sv9aUATW8fWFIiSS17ZOxmzw4oEQRsgoQBmcyJwHzZV6t6g4Ab8N1JGlvEi1nnvAX/z5/FeaPwIeNudtn1mi+QYa5xJpMuocxy+eqqyu3seS16xc9UVA1XeVd15OeeqUtL2sKGkluTdvwjT3zWb9hzjRdcDp9OD16wLmpz252ZHfVB4YSjhnaqxtI/kPAdOWcAPdTLIe4/J6nL/5J/ANypfyWJiumW0CA8nhyYDeI1XzrPIMNe8RyvbVze8AAAAASUVORK5CYII=',
                value: 'Completed',
              },
              {
                title: 'Completed on ',
                icon: '',
                value: 'August 30 2023',
              },
            ],
            default_action: {
              payload: 'payload1',
              title: 'Books ',
              type: 'postback',
            }
          },
          {
            title: 'URL',
            rightContent: {
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEuSURBVHgBpVTRUcMwDH0UBggbeARG8AbAF5/NCNkgZQKODdiAbJAwQWGClgnSTtBKtZyqqnuN03f3zj7ben6WfLrHOTyxIr4RH4kbYTZq4s5wRXTIRJkQimyRica4+TKCDhloVWAla1rMXxOYqfmfmqcSPie+EBdjXPKBXlyUxlmH8zzW4tZdEvQJsUbmSxwr2xrhQ1pmRuw5cUEvIz/9n7iWkfEqrj+IxYMKqnFMfAQHbdW8MMKNrHm1N3zWxjxzDEqJcfxMh1Ch34SzLEQxxjtuBOcsvpXHNfEOE8HOOoSEzjENhRZjoU+EinjkQ1d4WFhhWruJcSfwCCVeqtuuocJpY0hufo9wGM8OrlKVWyB8YkaHUGEL7h7s/gfh06bODHhCaI6xi2j2cklpg/aYNmd3Mc8T1wAAAABJRU5ErkJggg==',
              'default_action': {
                url: 'https://itassist-dev.kore.ai/workbench/',
                title: 'Books ',
                type: 'url',
              }
            },
            values: [
              {
                title: 'Status',
                icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVHgBpZRNTttQEMfn/5JA2PkIWVV0ZbiBUVHVXbNsukE+QcMNyA3oCVKpEnRXd1cBEuEEhBVhZ27gHd9vmPHLI45JiCNmZb8383vzTVRR1vtRq6ou5kJ+b0dsuA1jvspvy58z0xCgIdFDb9QZpJWgrX4UrK2t9JkFCMrY0j8QDxnIwBwQTMREoeBborN79f1kv8yoT3l3qCE2TsUgkPd6Nzf3+2k8yEo2OeTjwXb39u7xl3ekqIfXQD0yW6PO/5QqiLcDkFx+O9qd9pQbezAUMJvNZYHqiNj99Of1ySXtWKs5Wh5Yjsx4L+UynZX0ZYBj5xxUwg7Z2ov3AD8cfGq78zFUem9DdAZFQ/9qFaBKjaD6ztP1wy/5B9gWWqfRV+MieFF3MCPzesZfMkwwUanFztiBq7QbwLm9Ttm4UHwtfRZ6BWdktjy4Sv9aUATW8fWFIiSS17ZOxmzw4oEQRsgoQBmcyJwHzZV6t6g4Ab8N1JGlvEi1nnvAX/z5/FeaPwIeNudtn1mi+QYa5xJpMuocxy+eqqyu3seS16xc9UVA1XeVd15OeeqUtL2sKGkluTdvwjT3zWb9hzjRdcDp9OD16wLmpz252ZHfVB4YSjhnaqxtI/kPAdOWcAPdTLIe4/J6nL/5J/ANypfyWJiumW0CA8nhyYDeI1XzrPIMNe8RyvbVze8AAAAASUVORK5CYII=',
                value: 'Completed',
              },
              {
                title: 'Completed on ',
                icon: '',
                value: 'August 30 2023',
              },
            ],
            default_action: {
               url: 'https://itassist-dev.kore.ai/workbench/',
                title: 'Books ',
                type: 'url',
            }
          }
        ]
      }
    ]
  }
};


if(message && message.payload && message.payload.elements){
    for(var i=0;i<message.payload.elements.length;i++){
        message.payload.elements[i].id = i
    }
}
print(JSON.stringify(message));
```