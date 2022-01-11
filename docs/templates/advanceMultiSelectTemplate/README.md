##  Advance multi select template

###### Preview


![advance-multi-select](https://user-images.githubusercontent.com/58174664/148904346-b262cc94-8cba-4371-bee0-d58c0fb4c51c.PNG)


###### Message Payload

```json
{
  "type": "template",
  "payload": {
    "template_type": "advanced_multi_select",
    "heading": "Please select items to proceed",
    "description": "Premium Brands",
    "sliderView": false,
    "showViewMore": true,
    "limit": 1,
    "elements": [
      {
        "collectionTitle": "Collection 1",
        "collection": [
          {
            "title": "Classic Adidas Collection",
            "description": "German Company",
            "value": "Adidas",
            "image_url": "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
          }, 
	  {
            "title": "Classic Puma Collection",
            "value": "Puma",
            "description": "German Company",
            "image_url": "https://www.myredqueen.com/45056-home_default/gucci-white-logo-t-shirt.jpg"
          },
          {
            "title": "Classic Nike Collection",
            "description": "American Company",
            "value": "Nike",
            "image_url": "https://miro.medium.com/max/1161/1*cJUVJJSWPj9WFIJlvf7dKg.jpeg"
          }
        ]
      },
      {
        "collectionTitle": "Collection 2",
        "collection": [
          {
            "title": "Classic Rolls Royce Collection",
            "value": "Roll Royce",
            "description": "London Company",
            "image_url": "https://i.pinimg.com/236x/bd/40/f6/bd40f62bad0e38dd46f9aeaa6a95d80e.jpg"
          }, 
	  {
            "title": "Classic Audi Collection",
            "value": "Audi",
            "description": "German Company",
            "image_url": "https://www.car-logos.org/wp-content/uploads/2011/09/audi.png"
          },
          {
            "title": "Classic lamborghini Collection",
            "value": "lamborghini",
            "description": "Italy Company",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBeoerEQ7F5Mlh4S7u0uvEcPAlQ-J0s6V-__tBJ7JPc6KCZo9&usqp=CAU"
          }
        ]
      },
	{
        "collectionTitle": "Collection 3",
        "collection": [
          {
            "title": "Classic Rolex Collection",
            "value": "Rolex",
            "description": "Switzerland Company",
            "image_url": "https://image.shutterstock.com/image-photo/kiev-ukraine-may-13-2015-260nw-278633477.jpg"
          }
        ]
      },
      {
        "collectionTitle": "Collection 4",
        "collection": [
          {
            "title": "Classic Fossil Collection",
            "value": "Fossil",
            "description": "American Company ",
            "image_url": "https://www.pngitem.com/pimgs/m/247-2470775_fossil-logo-png-free-download-fossil-transparent-png.png"
          }
        ]
      },
      {
        "collectionTitle": "Collection 5",
        "collection": [
          {
            "title": "Classic Fastrack Collection",
            "value": "FastTrack",
            "description": "Indian Company",
            "image_url": "https://logodix.com/logo/2153855.jpg"
          }
        ]
      }
    ],
    "buttons": [
      {
        "title": "Done",
        "type": "postback",
        "payload": "payload"
      }
    ]
  }
}

```


