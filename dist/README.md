# Altalogy Map

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installing

In the project directory, you must run:

```
npm i altalogy-map-npm
```

### Getting Started

After installation package you will need to import it to your project:

```
import AltaMap from 'altalogy-map-npm';

class App extends Component {
  constructor(props) {
    super(props)

    this.altaRef = React.createRef()
  }
  ...
  render() {
    return (
      ...
      <AltaMap ref={this.altaRef} />
    )
  }
}
```

### List of functions

setMaps(array) - allows to add map json and type to project
setCustomDraw - allows to draw on map by select one of the avaiable options like: polygon, polyline, circle, rectangle..
editCustomDraw - allows to edit any of drawing elements
removeCustomDraw - allows to remove some drawing elements
cancelCustomDraw - allows to cancel of draw action
addMarker - allows to add single marker to map with send lat lng and popup text if needed
setDraw - activate a default leaflet toolbar and set position of it
setViewport - allows to set a default viewport and zoom level

### To do

To do lists

## Authors

* **Altalogy** - *Initial work* - [PurpleBooth](https://github.com/Altalogy)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
