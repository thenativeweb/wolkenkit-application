# wolkenkit-application

wolkenkit-application manages wolkenkit applications on disk.

## Installation

```bash
$ npm install wolkenkit-application
```

## Quick start

First you need to add a reference to wolkenkit-application in your application.

```javascript
const WolkenkitApplication = require('wolkenkit-application');
```

Then call the `WolkenkitApplication` constructor function and specify the fully qualified directory name of a wolkenkit application.

```javascript
const app = new WolkenkitApplication(path.join(__dirname, '...'));
```

Now you can get the application's configuration by using the `configuration.readModel`, `configuration.writeModel` and `configuration.flows` properties.

```javascript
console.log(app.configuration.readModel);
// => {
//      lists: {
//        peerGroups: {}
//      }
//    }
```

Alternatively, if you need access to the source code of the application, use the `readModel`, `writeModel` and `flows` properties instead.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```

## License

Copyright (c) 2015-2017 the native web.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see [GNU Licenses](http://www.gnu.org/licenses/).
