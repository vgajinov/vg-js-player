# vg-js-player

Welcome!

**vg-js-player** is a simple html5 player based on pure javascript.  
Currently it only supports following controls:
* Play/Pause
* Seek bar
* Mute
* Volume slider
* Play rate control
* Full screen

  
![Player Screenshot](/example.jpeg?raw=true)


## Usage ##

Simply include vg-js-player.js into your html file and add *vg-js-player* attribute to your *video* tag.
For example,

```html
<!doctype html>
<html>
  <head>
    <title>Video Player</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="vg-js-player/vg-js-player.js"></script>
  </head>
  
  <body>
    <div id="video-container">
        <!-- Video -->
        <video id="video" width="800" height="600" vg-js-player>
            <source src="example.mp4" type="video/mp4">
        </video>
    </div>
  
  </body>
</html>
```
