##  AdvancedList Template

###### Preview

![advancedList](https://user-images.githubusercontent.com/53572776/180221954-4140d108-180b-452a-abc3-187f22e88924.png)


###### Message Payload

```javascript
var message = {
	"type": "template",
	"payload": {
		"template_type": "advancedListTemplate",
		'title': 'Main Title',
		'isSortEnabled': true,
		'isSearchEnabled': false,
		'isButtonAvailable': false,
		'description': 'Main title description',
// 		'seeMore': true,
// 		'seeMoreAction': 'modal',
// 		'listItemDisplayCount': 6,
		'listViewType': 'default', // can specify template View it can be Nav list , normal, table list,
		'listItems': [
			{
				'title': 'Title',
				'description': 'Description',
				'descriptionIcon':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFzSURBVHgBjVJBTgJBEKzu2cS9KT/gB+4T9AXCzYPKiiHCCXiB+ANukhBx1g/ID/AH7g/kCdzcAzttz27WIEKkk8n09HTNdHcVYcPieHDiOOuTuiDUyyilgKSU49HaybLK5cq5ueu1xHx9KqBGjFvKw1qxSIaiaDH0cd3uDap8KkH3fRIakMub1k7TItbujvz+OpuMymq6dWEsmGj08vyUsA8oekQO5xVol/kyyeRNB4x9SywGD/rxfLP+veDpNBUnic5hoD1KRIQEBxobzDW/FehvEdbhzhKJ6fhSW6nOIcIV1qsUJqzz3peBJZw0jnQg1YKWWN0HEE0Iskj991/9zCbWb9sPXsXdM6O8snKUuBwNHGjGoOVFweyyMbG04k4n+g/kqYNIw6uIrbUrJX8ozrzFG4P4C+pESt2CmAvp0c+FyknIFZzmOZIA5aTXyCIT0AWci8nQ0E6L3kHbpTijKoKcFjR50+GpdhOlbGzteFXlfgNFTZhUpiJhVAAAAABJRU5ErkJggg==',
				// 'descriptionIconAlignment':'right',// icon alignment whether right or left by default it will be on left
				'descriptionStyles': {
					'font-size': '10px',
				// 	'color': '#10f4f4'
				},
				'titleStyles': {
					'font-size': '14px',
				// 	'color': '#9bf410'
				},
				'elementStyles':{ // styles for ListItem
		          //   'background':'#fef100'
		        },
			},
			{
				'title': 'Title text[title and description,icon]',
				'description': 'Description',
				'icon': 'https://kore.ai/wp-content/uploads/2021/09/kore.ai_logo.svg'
			},
			{
				'title': 'Title text',
				'description': 'List item with button',
				'iconShape': "circle-img",
				'icon': 'https://kore.ai/wp-content/uploads/2021/09/kore.ai_logo.svg',
				'headerOptions': [
					{
						'contenttype': 'button',
						'title': 'Button',
						'type': 'postback',
						"payload": "USER_DEFINED_PAYLOAD",
						'buttonStyles': {
							'color': '#10f4f4'
						}
					}
				],

			},
			{
				'title': 'Title text [with dropdown]',
				'description': 'title 1 description',
				'headerOptions': [{
					'type': 'dropdown',
					'dropdownOptions': [
						{
							'title': 'option1',
							'type': 'postback',
							'payload': 'USER_DEFINED_payload'
						},
						{
							'title': 'option2',
							'type': 'postback',
							'payload': 'USER_DEFINED_payload'
						}
					]
				},
				]
			},
			{
				'title': 'Title text [with default view]',
				'description': 'See more action dropdown and display limit 3',
				'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg==',
				'isCollapsed': true,
				'imageSize': 'small',
				'iconShape': "circle-img",
				'view': 'default',
				'iconSize': 'small',
				'isAccordian': true,
				'textInformation': [
					{
						'title': 'Oct 9, 9:00am - 9:30am (Day 1/2)',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFzSURBVHgBjVJBTgJBEKzu2cS9KT/gB+4T9AXCzYPKiiHCCXiB+ANukhBx1g/ID/AH7g/kCdzcAzttz27WIEKkk8n09HTNdHcVYcPieHDiOOuTuiDUyyilgKSU49HaybLK5cq5ueu1xHx9KqBGjFvKw1qxSIaiaDH0cd3uDap8KkH3fRIakMub1k7TItbujvz+OpuMymq6dWEsmGj08vyUsA8oekQO5xVol/kyyeRNB4x9SywGD/rxfLP+veDpNBUnic5hoD1KRIQEBxobzDW/FehvEdbhzhKJ6fhSW6nOIcIV1qsUJqzz3peBJZw0jnQg1YKWWN0HEE0Iskj991/9zCbWb9sPXsXdM6O8snKUuBwNHGjGoOVFweyyMbG04k4n+g/kqYNIw6uIrbUrJX8ozrzFG4P4C+pESt2CmAvp0c+FyknIFZzmOZIA5aTXyCIT0AWci8nQ0E6L3kHbpTijKoKcFjR50+GpdhOlbGzteFXlfgNFTZhUpiJhVAAAAABJRU5ErkJggg==',
					},
					{
						'title': 'WebEx',
						"type": "web_url",
						"url": "https://petersapparel.parseapp.com",
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
					},
					{
						'title': 'Text Info Title',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGbSURBVHgBdVJNTgJRDG77iBpXHAFPICTuxRu4cydPNHFc6dIdegLZMQt+Bj2AcAJgbwKeALgBbogY5tV2zEMY9CWTee18/fr16yCkjrV32SUsikSc19g5HGVgtx9F1dk6zqwH55fXt0DLDhHkJJxqTu5nkrs/LBxl34dvA49FfymVg5ZEOYzhIorCyaaKIMcGWnKdtBvhxarwvBxUEKEoyRMvN6a5TSQ56nii0mXQc4zdl2atStbarBRZ7fTL/jkkpENEykunnhIlXQRDCBWNaWl2iirBs8bkTuXVV0nPjdAywCCmRdL9B8MjMPNihlhY5SP8c2QW5rVYggED5TNpoHFfEZvdsczjS0+N48c0jhy6kcx47E1hs/cq4JF0+dBHWszY8NNqTsGS1qg52gFjLIgR6u40qocPG+u4Ch5E4rGawwQ9dHuFZB22fHPH6CrAOGs3wwP448iexzqwELeVmBK3ZC8M2JXsTNeRLkpymBg18GpwS5KDkmQn6p6fSebMI9FjVK9V19xOs4sJsicna0rcEyMg3t/6yb8BlCK9m52XgX8AAAAASUVORK5CYII=',
					},
				],
				'seeMoreAction': 'dropdown',
				'buttonsLayout': {
					"displayLimit": {
						"count": "3"
					},
					"buttonAligment": "fullwidth"
				},
				'buttons': [
	{
						'type': 'url',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgBnZGxTsMwEIZ9tlCDuoS5QuQRGAsSonmEPkH7BvQBkOIgdsrIVDIx8ghNGVCBoRnpFiS6w1IFkvj4LQGqqpRI/JId3ymf/7uzEpDTDgPVOo6xRLmYTESNlAWYTZ+Iuog1QLcOlBYwhrrZVMcAfSztHJ7v1UDCbTZFagNmPsEnye5PX/6EiESyXJqBDeDyzoBEjchpa88YnjGTn+cibTR4RiR1Ng2ijZDdAPZRWmB7KkvhSslj9OnnT7rSVdmteI2TrV1/B+CFlHQFeE7EN6p1NC8Xd89uR7uO13GyNM5+nX4ERw2wZx0RejiP0GOMn/YxMA+jGn4+noW0br0GCmOMllKmOF4jP0bmkqpqXgXxfulKvoP8bSVktX0QDDCUwJYEp6goCk8pNQIUbYS+b/ZseXDsoac3vGn48RAOxX/0BeH9oUngtmx1AAAAAElFTkSuQmCC',
						'title': 'Button 1 url',
						"url": "https://bankingassistant-qa-bots.kore.ai/botbuilder"
					},

					{
						'type': 'postback',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgBnZGxTsMwEIZ9tlCDuoS5QuQRGAsSonmEPkH7BvQBkOIgdsrIVDIx8ghNGVCBoRnpFiS6w1IFkvj4LQGqqpRI/JId3ymf/7uzEpDTDgPVOo6xRLmYTESNlAWYTZ+Iuog1QLcOlBYwhrrZVMcAfSztHJ7v1UDCbTZFagNmPsEnye5PX/6EiESyXJqBDeDyzoBEjchpa88YnjGTn+cibTR4RiR1Ng2ijZDdAPZRWmB7KkvhSslj9OnnT7rSVdmteI2TrV1/B+CFlHQFeE7EN6p1NC8Xd89uR7uO13GyNM5+nX4ERw2wZx0RejiP0GOMn/YxMA+jGn4+noW0br0GCmOMllKmOF4jP0bmkqpqXgXxfulKvoP8bSVktX0QDDCUwJYEp6goCk8pNQIUbYS+b/ZseXDsoac3vGn48RAOxX/0BeH9oUngtmx1AAAAAElFTkSuQmCC',
						'title': 'Button 1',
						"payload": "USER_DEFINED_PAYLOAD"
					},
					{
						'type': 'postback',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgBnZGxTsMwEIZ9tlCDuoS5QuQRGAsSonmEPkH7BvQBkOIgdsrIVDIx8ghNGVCBoRnpFiS6w1IFkvj4LQGqqpRI/JId3ymf/7uzEpDTDgPVOo6xRLmYTESNlAWYTZ+Iuog1QLcOlBYwhrrZVMcAfSztHJ7v1UDCbTZFagNmPsEnye5PX/6EiESyXJqBDeDyzoBEjchpa88YnjGTn+cibTR4RiR1Ng2ijZDdAPZRWmB7KkvhSslj9OnnT7rSVdmteI2TrV1/B+CFlHQFeE7EN6p1NC8Xd89uR7uO13GyNM5+nX4ERw2wZx0RejiP0GOMn/YxMA+jGn4+noW0br0GCmOMllKmOF4jP0bmkqpqXgXxfulKvoP8bSVktX0QDDCUwJYEp6goCk8pNQIUbYS+b/ZseXDsoac3vGn48RAOxX/0BeH9oUngtmx1AAAAAElFTkSuQmCC',
						'title': 'Button 2',
						"payload": "USER_DEFINED_PAYLOAD"
					},
					{
						'type': 'postback',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgBnZGxTsMwEIZ9tlCDuoS5QuQRGAsSonmEPkH7BvQBkOIgdsrIVDIx8ghNGVCBoRnpFiS6w1IFkvj4LQGqqpRI/JId3ymf/7uzEpDTDgPVOo6xRLmYTESNlAWYTZ+Iuog1QLcOlBYwhrrZVMcAfSztHJ7v1UDCbTZFagNmPsEnye5PX/6EiESyXJqBDeDyzoBEjchpa88YnjGTn+cibTR4RiR1Ng2ijZDdAPZRWmB7KkvhSslj9OnnT7rSVdmteI2TrV1/B+CFlHQFeE7EN6p1NC8Xd89uR7uO13GyNM5+nX4ERw2wZx0RejiP0GOMn/YxMA+jGn4+noW0br0GCmOMllKmOF4jP0bmkqpqXgXxfulKvoP8bSVktX0QDDCUwJYEp6goCk8pNQIUbYS+b/ZseXDsoac3vGn48RAOxX/0BeH9oUngtmx1AAAAAElFTkSuQmCC',
						'title': 'Button 2',
						"payload": "USER_DEFINED_PAYLOAD"
					},
					{
						'type': 'postback',
						'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFFSURBVHgBnZGxTsMwEIZ9tlCDuoS5QuQRGAsSonmEPkH7BvQBkOIgdsrIVDIx8ghNGVCBoRnpFiS6w1IFkvj4LQGqqpRI/JId3ymf/7uzEpDTDgPVOo6xRLmYTESNlAWYTZ+Iuog1QLcOlBYwhrrZVMcAfSztHJ7v1UDCbTZFagNmPsEnye5PX/6EiESyXJqBDeDyzoBEjchpa88YnjGTn+cibTR4RiR1Ng2ijZDdAPZRWmB7KkvhSslj9OnnT7rSVdmteI2TrV1/B+CFlHQFeE7EN6p1NC8Xd89uR7uO13GyNM5+nX4ERw2wZx0RejiP0GOMn/YxMA+jGn4+noW0br0GCmOMllKmOF4jP0bmkqpqXgXxfulKvoP8bSVktX0QDDCUwJYEp6goCk8pNQIUbYS+b/ZseXDsoac3vGn48RAOxX/0BeH9oUngtmx1AAAAAElFTkSuQmCC',
						'title': 'Button 2',
						"payload": "USER_DEFINED_PAYLOAD"
					}
				],
				'headerOptions': [
					{
						'type': 'icon',
						'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAHCAYAAAA8sqwkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABdSURBVHgBjctNDYAwDIbhNkUAoKAZCOCIHBwhASzgCAfDQelhh2Xrfr5Tkz4vgDF2y8VuPa0fWRgEDz33cZ748/4pBhEOwy2NqIztiOo4j7CN407uQTGDyNsVqP0BaHUk0IS2sYcAAAAASUVORK5CYII="
					}
				]

			},
			{
				'title': 'Title text [view options] ',
				'description': 'List item with check box options',
				'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg==',
				'isCollapsed': true,
				'iconSize': 'small',
				'imageSize': 'large',
				'isAccordian': true,
				'view': 'options', // it can be either radio or check boxes
				'optionsData': [
					{
						'id': '1',
						'type': 'checkbox',
						'label': '1 Lorem ipsum doller ammen',
						'value': '1'
					},
					{
						'id': '2',
						'type': 'checkbox',
						'label': '2 Lorem ipsum doller ammen',
						'value': '2'
					}
				],
				'buttons': [
					{
						'type': 'postback',
						'btnType': 'confirm',
						'title': 'Confirm',
						"payload": "USER_DEFINED_PAYLOAD"
					},
					{
						'btnType': 'cancel',
						'title': 'Cancel',
						'type': 'postback',
						"payload": "USER_DEFINED_PAYLOAD"
					}
				],
				"buttonAligment": 'right',
				'headerOptions': [{
					'type': 'text',
					'value': "20$",
					'styles': {
				// 		'color': '#105bf4',
						'font-size': '10px'
					}
				}
				]
			},
			{
				'title': 'Title text [view options]',
				'description': 'List item with radio options',
				'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg==',
				'isCollapsed': false,
				'iconSize': 'small',
				'imageSize': 'medium',
				'iconShape': "circle-img",
				'isAccordian': true,
				'view': 'options', // it can be either radio or check boxes
				'optionsData': [
					{
						'id': '1',
						'type': 'radio',
						'label': '1 Lorem ipsum doller ammen',
						'value': '1'
					},
					{
						'id': '2',
						'type': 'radio',
						'label': '2 Lorem ipsum doller ammen',
						'value': '2'
					}
				],
				'buttons': [
					{
						'type': 'postback',
						'btnType': 'confirm',
						'title': 'Confirm',
						"payload": "USER_DEFINED_PAYLOAD"
					},
					{
						'btnType': 'cancel',
						'title': 'Cancel',
						'type': 'postback',
						"payload": "USER_DEFINED_PAYLOAD"
					}
				],
				'headerOptions': [{
					'type': 'text',
					'value': "20$",
					'styles': {
				// 		'color': '#105bf4',
						'font-size': '10px'
					}
				},
				{
					'type': 'icon',
					'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAYAAACulacQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB7SURBVHgBpY7BDUZAEIVnfr+zEQ2M4K4ESlABpehAK3SgEbEVsA3IGhIOa+PiS+ZdvjfJA3iDOS04TmYWbOdpvSiiKATEjigYtHDLI6Qwugre1XIV0LGhBTQ1mK38PSdiL8cAPllfWc5xujInzWchuITwP9NApdQ02nIHzFIyUM1lTqwAAAAASUVORK5CYII="
				}
				]
			},
			{
				'title': 'list item [view = "table"]',
				'description': 'list item [view = "table"]',
				'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg==',
				'isCollapsed': false,
				'iconSize': 'small',
				'isAccordian': true,
				'view': 'table',
				'headerOptions': [
					{
						'contenttype': 'button',
						'title': 'confirm',
						'isStatus': true,
						'buttonStyles': {
				// 			'background': "#00f3fe",
				// 			'color': '#fe0000',
							'border': '1px solid #fe0000'
						}
					},
					{
						'type': 'icon',
						'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMCAYAAACulacQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB7SURBVHgBpY7BDUZAEIVnfr+zEQ2M4K4ESlABpehAK3SgEbEVsA3IGhIOa+PiS+ZdvjfJA3iDOS04TmYWbOdpvSiiKATEjigYtHDLI6Qwugre1XIV0LGhBTQ1mK38PSdiL8cAPllfWc5xujInzWchuITwP9NApdQ02nIHzFIyUM1lTqwAAAAASUVORK5CYII="
					}
				],
				'type': 'column',
				'tableListData': [
					{
						'rowData': [
							{
								'title': 'Text 1',
								'description': 'Value',
								'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=='
							},
							{
								'title': 'Text1',
								'description': 'Value',
								'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=='
							},
							{
								'title': 'Text1',
								'description': 'Value',
								'iconSize': 'small',
								'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=='
							},
							{
								'title': 'Text1',
								'description': 'Value',
								'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=='
							},
							{
								'title': 'Text1',
								'description': 'Value',
								'iconSize': 'large',
								'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=='
							},
							{
								'title': 'Text1',
								'description': 'Value',
								'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=='
							}
						]
					}

				]
			},
		],
// 		'seeMoreTitle':'test', // see more title
// 		'previewModalTitle':'Preview title', // when see more action is modal title // by default it shows upcoming meetings

// 		'seeMoreIcon':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFzSURBVHgBjVJBTgJBEKzu2cS9KT/gB+4T9AXCzYPKiiHCCXiB+ANukhBx1g/ID/AH7g/kCdzcAzttz27WIEKkk8n09HTNdHcVYcPieHDiOOuTuiDUyyilgKSU49HaybLK5cq5ueu1xHx9KqBGjFvKw1qxSIaiaDH0cd3uDap8KkH3fRIakMub1k7TItbujvz+OpuMymq6dWEsmGj08vyUsA8oekQO5xVol/kyyeRNB4x9SywGD/rxfLP+veDpNBUnic5hoD1KRIQEBxobzDW/FehvEdbhzhKJ6fhSW6nOIcIV1qsUJqzz3peBJZw0jnQg1YKWWN0HEE0Iskj991/9zCbWb9sPXsXdM6O8snKUuBwNHGjGoOVFweyyMbG04k4n+g/kqYNIw6uIrbUrJX8ozrzFG4P4C+pESt2CmAvp0c+FyknIFZzmOZIA5aTXyCIT0AWci8nQ0E6L3kHbpTijKoKcFjR50+GpdhOlbGzteFXlfgNFTZhUpiJhVAAAAABJRU5ErkJggg==',// icon for see more
	},
};




