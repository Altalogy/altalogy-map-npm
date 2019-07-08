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

### list of props

AltaMap components need to have updateAltaMapState props if ref state must be refreshable.
To achieve self refrhesh refs you'll need add this function with setState:

```
updateAltaMapState() {
  let elements = this.altaRef.current.getElements()
  this.setState({
    elements: elements
  })
}
...

<AltaMap ref={this.altaRef} updateAltaMapState={this.updateAltaMapState} />

```
### List of functions

addElements(array) - allows to add map json and type to project
here is example of array:
```
const data = [{
  id: '12345',
  type: 'heatmap',
  tags: ['heatmap'],
  data: ADDRESS_POINTS,
},
{
  type: 'group_markers',
  tags: ['group'],
  data: [
    {lat:'50.270908',lng: '19.039993',popup: 'qqqq '},
    {lat:'50.170908',lng: '18.939993',popup: 'xxxx '},
    {lat:'49.270908',lng: '18.039993',popup: 'aaaa '},
    {lat:'50.250908',lng: '19.029993',popup: 'zzzz '},
  ]
}]
```
hideElement(tag) - allows to hide/show element on map by tag
hideElementById(id) - allows to hide/show element on map by id
deleteElement(tag) - allows to delete element from map data by tag
deleteElementById(id) - allows to delete element from map data by id
getElements - allows to get all elements assigned to map
getElementsById(id) - allows to get elements by id assigned to map
setMapDrawer(option) - allows to draw on map by select one of the avaiable options like: polygon, polyline, circle, rectangle..
setMapDrawerSettings - allows to set options like color of draw elements
editMapDrawer - allows to edit any of drawing elements
removeMapDrawer - allows to remove some drawing elements
cancelMapDrawer - allows to cancel of draw action
addMarker - allows to add single marker to map with send lat lng and popup text if needed
setMapLeafletDrawer - activate a default leaflet toolbar and set position of it
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
