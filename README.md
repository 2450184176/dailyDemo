# node_web

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

##webstorm plugins
```
AngularJS (181.4203.535)
ASP (0.1)
CoffeeScript (181.4203.535)
Copyright (8.1)
Create Jira Ticket (1.2.2)
CSS Support (181.4203.535)
Cucumber.js (0.1)
CVS Integration (11)
Dart (181.4203.535)
Docker integration (181.4203.535)
EditorConfig (181.4203.535)
EJS (181.4203.535)
element (2.0)
File Watchers (181.4203.535)
Gherkin (999.999)
Git Integration (8.1)
GitHub (181.4203.535)
Haml (181.4203.535)
Handlebars/Mustache (181.4203.535)
HTML Tools (2.0)
HTTP Client (181.4203.535)
IDE Settings Sync (181.4203.535)
IntelliLang (8.0)
Java Server Pages (JSP) Integration (1.0)
JavaScript Debugger (1.0)
JavaScript Intention Power Pack (0.9.4)
JavaScript Support (1.0)
Karma (181.4203.535)
Less support (181.4203.535)
LiveEdit (181.4203.535)
Markdown support (181.2668)
Material Theme UI (2.1.5.3)
Mercurial Integration (10.0)
Meteor (181.4203.535)
Node.js Remote Interpreter (181.4203.535)
NodeJS (181.4203.535)
Perforce Integration (2.0)
Performance Testing (181.4203.535)
PhoneGap/Cordova Plugin (181.4203.535)
Polymer & Web Components (999.999)
Power Mode II (48.84)
Prettier (181.4203.535)
Pug (ex-Jade) (181.4203.535)
QuirksMode (181.4203.535)
React snippets (1.0.0)
React-Templates (1.1.2)
Refactor-X (2.01)
Remote Hosts Access (0.1)
Sass support (181.4203.535)
Settings Repository (181.4203.535)
Spy-js (181.4203.535)
SSH Remote Run (0.1)
Stylus support (999.999)
Subversion Integration (1.1)
Task Management (1.0)
Terminal (0.1)
TextMate bundles support (181.4203.535)
Time Tracking (1.0)
tslint (181.4203.535)
UML Support (1.0)
Vagrant (181.4203.535)
Vue Component Creator (0.6.2)
Vue.js (181.4203.535)
W3C Validators (2.0)
XPathView + XSLT Support (4)
YAML (181.4203.535)
Yeoman (181.4203.535)
```

###图片压缩
```javascript
compressImg(imgBase64, size, callback) { //图片压缩
      let compressScale = 3 * 1024 * 1024 / size * 0.7;
      let img = new Image();
      img.src = imgBase64;
      img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.display = "none";
        document.body.appendChild(canvas);
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        var compressionResult = canvas.toDataURL("image/jpeg", compressScale);
        document.body.removeChild(canvas);
        img = null;
        callback(compressionResult);
      };
      img.onerror = function () {
        callback(false);
        img = null;
        smyToast({text: '图片压缩失败'});
      }
    },
    ```
