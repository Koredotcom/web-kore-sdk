##  Card Template

###### Preview

![cardTemplate](https://user-images.githubusercontent.com/53572776/180215673-4070a404-72c1-4de0-907e-df342633dad1.png)


###### Message Payload

```javascript
{
	"type": "template",
	"payload": {
		"template_type": "cardTemplate",
		'cards': [
			{
				'cardHeading': {
					title: 'It is a long established fact that a reading...',
					headerStyles: {
						'background-color': '#E7F1FF',
						'color': '#07377F',
						'border': '1px solid #85B7FE',
					}
				},
				cardDescription: [
					{
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
						title: 'Oct 9, 9:00am - 9:30am (Day 1/2)'
				
					},
					{
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
						title: 'WebEx'
					},
					{
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
						title: 'Santiago, Brian, Felix and 5 others'
					}
				],
				cardContentStyles: {
					'border': "1px solid #85B7FE;",
				},
					buttons: [
					{
						title: 'Show Transactions',
						type: 'postback',
						payload: 'USER_DEFINED_PAYLOAD',
						buttonStyles: {
							'background-color': '#5ce454',
							color: '#fff',
							border: '1px solid #0D6EFD'
						}
					}
				],
				type: 'action',
			},
			{
				'cardHeading': {
					title: 'It is a long established fact that a reading...',
					headerStyles: {
						'background-color': '#0D6EFD',
						'color': '#FFFFFF',
						'border': '1px solid #0D6EFD',
					}
				},
				cardDescription: [
					{
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
						title: 'Oct 9, 9:00am - 9:30am (Day 1/2)'
				
					},
					{
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
						title: 'WebEx'
					},
					{
						icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=',
						title: 'Santiago, Brian, Felix and 5 others'
					}
				],
				cardContentStyles: {
					'border': "1px solid #0D6EFD",
				},
				type: 'postback',
				default_action: {
					'title': 'Card One submitted successfully',
					payload: 'USER_DEFINED_PAYLOAD'
				}
			},
					{
				"cardHeading": {
					"title": "It is a long established action.",
					"description": "Description",
					"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL5SURBVHgB7ZhPSBRRHMe/762iJmt6SFii2oEOBR6Mog5dTDoFkXWySyodOihSl8DoUCB6LMJTILlC5Kk1hE6ueemwVrTQQtIKs2WxaAdLE8WYfb3fbDvsumPse03uHPrAMvPe22G/8/v33v4YXDDNlUarOtDBGAtjFxCWSASqrYQRakpvX2OFAzOzEgZqHslH2lAZxoCtu4VCHYEfMxtdWWbdh2CNqCQM37jg1w+F6iK5oSS1uNZWVcVfwFdkzxih4Kwt0Mysm/IShr9IY3PrWGAh86Obg3XDfzRmA3yJB4Au+BTO+AVpPNYKv8JEK4dAZbP2T0htHD7H9wKr4BFflr8jOpO070+2HJCfg/ACzwS+N79iZOKlfX+xvcUzgdouJmutrW8641j8g3M/HU85a3TNW1YHJncRAUUGHjy3f3R/8150nT8hrbdUIoLWyNXT8QVbJFl1uP8cVFEWSLHWcSNSZL1yiT28ZgtXQdnFOasdhyoDV9uVxRFaMUiucyNYXyNFNLiuHTWaoYNWFkem3pTMkYUoHgkKgyu3n8jrqrNOiaOT2Uox2Dv8FHPJzyXx55YAc8lPUuRE0VywvlZach/GBy+jXJQsGJMZ6YabZdzm6MXmkotQwZOtjlxazpwOSgLnJ28ieq8bR7YFfGTqdYmgodGZojE9Mz7YiVeP+6GCVqGeN5dlLRwrmssX5gYZZ3EZf/SdQiZdXqwcPD4s7OzWVY3CTmjF4NBoDKrkDxKqaAks3BHIbTsVZyrcbs+ooOViqnlU086eOuyUk97hqCxDqd9iGjAycMnePaIz7+yj2C1ZyHXQShI36NTSJws5oXtyccOzJKEM7us87dx7hWcW/Ff8/1f3t3Bqd8GvUCsOQiTgVwRLUOvjGfyKlY0w6kejtuatlBuGr2BpI7TH4IbRJGPQ6oHvyGmys5hardKCPb5IGFuD6MlpKunyb4QFrDsMrEJNTTELBKS4unR+hrl9jYQi+7M1i91pbnIuZD86OGkYrMSDvwDabB9xyb55JAAAAABJRU5ErkJggg=="
				},
				"cardtype": "list",
				"cardDescription": [
						{
						"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=",
						"title": "1901 Thornridge Cir. Shiloh, Hawaii 81063"
					},
					{
						"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=",
						"title": "1902 Thornridge Cir. Shiloh, Hawaii 81063"
					},
					{
						"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFHSURBVHgBdZC/TgJBEMZnZk+PxOZ4Ax4Bow+ApSWdsYBFJGInb8BV2omVpyQw+gI8gpQWJpydJW8gjQGTux13+aOixyaT7M58M/ubD2HD0bpZEAV9ey3ZGIsAP/aiELPFjaIoekKkEBKfYeujIKkaGMAbL3M8eSUkaXH3lpeZWJ82ayQw+NdwZFHA+My9zmStkMxiULnAW8dQAxAJBKZQrZ8NMcUWczR2daP8quUf0hozQfjQu8u7QMRXINCuXqmfV1GgjSnUcOGGjJDstG7ElZNm22rEOfIjNh005oC5G3vOOufGakEywKLw2iK9z1lFJiuxe3pznxO/vNplyVzW+iKA3CzgaLHDt4F2xAS8WfF30mGk9Kn/iuc/oFAoIP1j3Shvw87YqKljbpPFgIyj4tHL8+7efp6ALoGSKwTMocFD5vu3rIYvr/CSUC3Azu4AAAAASUVORK5CYII=",
						"title": "1903 Thornridge Cir. Shiloh, Hawaii 81063"
					}
				],
				"buttons": [
					{
						"title": "Button",
						"type": "postback",
						"payload": "USER_DEFINED_payload",
						"buttonStyles": {
							"background-color": "#0D6EFD",
							"color": "#fff",
							"border": "1px solid #0D6EFD"
						}
					}
				],
				"type": "action"
			},
					{
				"cardHeading": {
					"title": "It is a long established postback",
					"description": "Description"
				},
				"cardContentStyles": {
					"border-left": "5px solid #0d6efd"
				},
				"type": "postback",
				"default_action": {
					"title": "Card 3 submitted successfully",
					"payload": "USER_DEFINED_payload"
				}
			},
		]
	}
}



