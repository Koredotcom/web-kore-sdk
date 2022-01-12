##  Tablelist template

###### Preview


![tableListTemplate](https://user-images.githubusercontent.com/58174664/148945268-7ba94674-73dd-43f6-8a55-ca06231196bd.PNG)



###### Message Payload

```js
var message={
	"type": "template",
	"payload": {
				"template_type": "tableList",
				"title":"Marvel Comics",
				"description":"Marvel Worldwide Inc.",
				"headerOptions":{
					"type":"text",
					"text":"Comics",
				},


	"elements":[
		{
			"sectionHeader":"Marvel Comics",
			"sectionHeaderDesc":"It is a story book",
			"rowItems":[
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://i1.pngguru.com/preview/277/841/159/captain-marvel-movie-folder-icon-v4-png-clipart.jpg",
							"radius":10,
							"size":"medium"
						},
						"type":"url",    //type=text | url
						"url":{			 // if type text use text, if type url use url
							"link":"https://www.facebook.com", // if type=url use link
							"title":"Captain Marvel",
							"subtitle":"Cosmic energy",
						},

						"rowColor":"blue" //text color to entire row
					},
					"value":{
						"type":"url",
						"url":{
							"link":"https://www.marvel.com/movies/captain-marvel",
							"title":"energy"
						},
						"layout":{
							"align":"top",
							"color":"blue",//apply color to value in row
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com", // if type =url use url
						"payload":"marvelmovies",
						"title":"Captain Marvel",
						"utterance":""
					},
					"bgcolor":"#F67159" // background color to entire row
				},
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://www.pinclipart.com/picdir/middle/44-444753_avengers-clipart-marvel-super-heroes-iron-man-logo.png",
							"radius":10,
							"size":"medium"
						},
						"type":"text",
						"text":{
							"title":"Iron Man",
							"subtitle":"Iron Sute",
						},
						"rowColor":"#4BA2F9"
					},
					"value":{
						"type":"text",
						"text":"$ 7,000,000",
						"layout":{
							"align":"center",
							"color":"blue",
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com/comics/characters/1009368/iron_man",
						"utterance":"",
					},
					"bgcolor":"#C9EEBB"
				},
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://img1.looper.com/img/gallery/rumor-report-is-marvel-really-making-captain-america-4/intro-1571140919.jpg",
							"radius":10,
							"size":"medium"
						},
						"type":"text",
						"text":{
							"title":"Captain America",
							"subtitle":"Vibranium Shield",
						},
						"rowColor":"#F5978A"
					},
					"value":{
						"type":"text",
						"text":"$ 10,000,000",
						"layout":{
							"align":"center",
							"color":"black",
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com/characters/captain-america-steve-rogers",
						"utterance":"",
					}
				},
				{
					"title":{
						"image":{
							"image_type":"image",
							"image_src":"https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/1/13/Thor-EndgameProfile.jpg/revision/latest/scale-to-width-down/620?cb=20190423174911",
							"radius":10,
							"size":"medium"
						},
						"type":"url",
						"url":{ 
							"link":"https://www.marvel.com/movies/captain-marvel",
							"title":"Captain Marvel",
							"subtitle":"bskjfkejf",
						},
						"rowColor":"#13F5E0"
					},
					"value":{
						"type":"text",
						"text":"$ 5,000,000",
						"layout":{
							"align":"center",
							"color":"#FF5733",
							"colSize":"25%",
						}
					},
					"default_action":{
						"type":"url",
						"url":"https://www.marvel.com/characters/thor-thor-odinson",
						"utterance":"",
					},
				}
			]
		}

	]
}
};
print(JSON.stringify(message));
```