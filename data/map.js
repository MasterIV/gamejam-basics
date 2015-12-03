(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("map",
{ "height":10,
 "layers":[
        {
         "height":10,
         "image":"..\/img\/bg.png",
         "name":"bg",
         "opacity":1,
         "type":"imagelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 67, 0, 0, 0, 0, 0, 0, 67, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 68, 0, 0, 68, 0, 0, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 68, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 67, 0, 0, 0, 0, 0, 0, 67, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
         "height":10,
         "name":"Below",
         "opacity":1,
         "properties":
            {
             "z":"1"
            },
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 0, 0, 47, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "name":"More",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "properties":
    {

    },
 "renderorder":"right-down",
 "tileheight":40,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/img\/tileset.png",
         "imageheight":440,
         "imagewidth":240,
         "margin":0,
         "name":"Base",
         "properties":
            {

            },
         "spacing":0,
         "terrains":[
                {
                 "name":"Test",
                 "tile":-1
                }],
         "tilecount":66,
         "tileheight":40,
         "tiles":
            {
             "42":
                {
                 "terrain":[-1, -1, -1, 0]
                },
             "44":
                {
                 "terrain":[-1, -1, 0, -1]
                },
             "46":
                {
                 "terrain":[0, -1, -1, -1]
                },
             "49":
                {
                 "terrain":[-1, -1, 0, 0]
                },
             "51":
                {
                 "terrain":[0, 0, 0, -1]
                },
             "53":
                {
                 "terrain":[0, 0, -1, 0]
                },
             "54":
                {
                 "terrain":[-1, 0, -1, 0]
                },
             "55":
                {
                 "terrain":[0, 0, 0, 0]
                },
             "56":
                {
                 "terrain":[0, -1, 0, -1]
                },
             "58":
                {
                 "terrain":[-1, 0, 0, 0]
                },
             "61":
                {
                 "terrain":[0, 0, -1, -1]
                },
             "63":
                {
                 "terrain":[0, -1, 0, 0]
                },
             "65":
                {
                 "terrain":[-1, 0, -1, -1]
                }
            },
         "tilewidth":40
        }, 
        {
         "firstgid":67,
         "image":"..\/img\/tileset2.png",
         "imageheight":80,
         "imagewidth":80,
         "margin":0,
         "name":"klein",
         "properties":
            {

            },
         "spacing":0,
         "tilecount":4,
         "tileheight":40,
         "tilewidth":40
        }],
 "tilewidth":40,
 "version":1,
 "width":10
});