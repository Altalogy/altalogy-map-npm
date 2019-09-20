# Getting started

#### 1) Install:

```
$ yarn add altalogy-map-npm
```

#### 2) Import:

```
import AltaMap from 'altalogy-map-npm'

class MyComponent extends Component {

  constructor(props) {
    super(props)
    this.altaRef = React.createRef()
  }

  onAltaMapChange() {
    let elements = this.altaRef.current.getElements()
  }

  render() {
    return (
      <div>
        <AltaMap
          ref={this.altaRef}
          onChange={this.onAltaMapChange}
          />
      </div>
    )
  }
}
```

#### 3) Use

The `AltaMap` stores own internal state and contains functions to manipulate this state. To get its state or to use its functions (let's call it library's API), you need to use `ref`. In above code it is shown how to initialize `ref` in constructor and assign it to `<AltaMap ref={} />`.

To sync application's state, Redux store etc., you can use `onChange` to get AltaMap current state.

Check **Options** section to see advanced configuration.


### Options

##### A) Properties

```
<AltaMap
  ref={this.altaRef}
  onChange={this.updateState}
  controlPanel={{
    enabled: true,
    title: 'AltaMap',
  }}
  searchAddress={{
    enabled: true,
    position: 'top',
  }}
  googleAPI='PUT_KEY_HERE'
/>
```

| Property                | Values                    | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| controlPanel            | [Map]                     | Display the control Panel on the Map             |
| onChange                | [Function]                | Callback triggered on AltaMap state change       |
| controlPanel                | [Map]                | Enables and customizes the control panel       |
| searchAddress                | [Map]                | Enables and customizes the Google autocomplete search address input       |
| googleAPI                | [String]                | Google API Key       |


##### `ref`

React reference. Create it in constructor and assign to component.
```
constructor(props) {
  super(props)
  this.altaRef = React.createRef()
}

<AltaMap
  ref={this.altaRef} />
```

Then, you access the `AltaMap` state and API:
```
this.altaRef.current.addMarker('50.270908', '19.039993','Some label')
```

##### `onChange`

Function triggered every time that `AltaMap` state being changed.

```
updateState() {
  let elements = this.altaRef.current.getElements()
  this.setState({
    elements: elements
  })
}

<AltaMap
  ref={this.altaRef}
  onChange={this.updateState}
/>
```

##### `controlPanel`

```
<AltaMap
  controlPanel={{
    enabled: true,
    title: 'AltaMap',
  }}
/>
```

##### `searchAddress`

Input with address autocomplete.

```
<AltaMap
  searchAddress={{
    enabled: true,  // skip or set to false if you don't want to display searchAddress
    position: 'top', // set position.
  }}
  googleAPI='PUT_GOOGLE_API_KEY_HERE'
/>
```

* *enabled* - [Boolean]
* *controlPanel* - [String] displays address search input in the control panel

##### `googleAPI`

Add Google API key if you use Address Search or Google map layers.




##### B) Ref API

Usage:

```
(...)

constructor(props) {
  super(props)
  this.altaRef = React.createRef()
}

(...)

doSomething() {
  # Examples:
  # 1. change viewport:
  this.altaRef.current.setViewport()
  # 2. add element:
  this.altaRef.current.addElements([{...}])
}

(...)

<AltaMap
  ref={this.altaRef}
  />

(...)
```

| API                     | Params                    | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| setViewport(lat,lng,zoom)| lat,lng,zoom             | Set mapCenter and zoom                           |
| addElements(elements)   | elements - JSON           | Add elements to the map                          |
| deleteElements(tags)    | array of strings          | Delete elements with specific tags               |

---

# Development

### Getting started

1. Clone repository with `git clone`

2. Install:
```
$ yarn install
```

3. Run:
```
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Generate docs

```
$ yarn docs
```

Script builds application to the `build` folder and then moves entire folder to `docs` folder. It is required to use `docs` folder to publish page on GitHub pages.

### Build & publish NPM

```
$ yarn publish:npm
$ npm login
$ npm publish
```

### Available Scripts

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Project's structure

Project contains:
```
dist      # 1. NPM distribution
docs      # 2. GitHub Pages documentation
public    # 3. Public assets
src       # 4. Application's source code to present the functionalities of the Altalogy Maps library
  |- ...
  |- components
      |- AltaMap    # 5. The implementation of Altalogy Maps library
  |- ...
README.md
package.json

```

The folder: `src/components/AltaMap` contains the library source code and its structure is:

```
AltaMap
  |- components     # 4.1. Contains components
  |- models         # 4.2. Models
        |- ...
        |- MapElements  # 4.3. Groups objects of MapElement as a one set
        |- MapElement   # 4.4. Anything displayed on the map should extends this class
        |- ...
  |- AltaMap.jsx    # 4.5. Entrypoint for the library. Displays map, MapElements and other components
```

### Models

#### MapElement

**Fields:**
| Field                   | Type                      | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| id                      | UUIDv4                    | ID. If not set, random UUIDv4 is generated       |
| type                    | string                    | Type of the MapElement, e.g. Marker, Heatmap     |
| tags                    | array of strings          | Tags help to group MapElements so then we can delete group of elements with the same tags  |
| options                 | map                       | contains options specific for the type, for example: icon of the marker |
| data                    | map                       | contains data specific for the type, e.g. Marker may contain: lat, lng |


**Methods:**
| Method                  | Params                    | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| -      | - | -     |


#### MapElements

**Fields:**
| Field                   | Type                      | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| elements                | array []                  | List of mapElements                              |

**Methods:**
| Method                  | Params                    | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| getElements()           |                            | Returns all mapElements                         |
| getElementsById(id)        | string - tag              | Returns all mapElements with specific id       |
| getElementsByTag(tag)        | string - id              | Returns all mapElements with specific tags       |
| addElements(elements)   | elements - JSON           | Add elements to the map                          |
| deleteElement(tag)     | string - tag              | Delete element with specific tags               |
| deleteElementById(id)     | string - id              | Delete element with specific id               |
| hideElements(tag)     | string - tag              | Toggle element with specific tags               |
| hideElementById(id)     | string - id              | Toggle element with specific id               |




### Architecture

Project contains:

* **AltaMap.jsx** - initialize the Leaflet map and imports components.
* **models** - models should define the fields and methods to manipulate object.
  * **MapElements** - it is a collection of MapElement objects and should contain methods to manipulate that set.
  * **MapElement** - basic class / model for elements displayed on the map. It means that every new model of the element displayed on the map should extend this class.
* **components** - the recommended approach is to make one folder (component) per feature.

AltaMap stores own independent state which can be read and write via `ref`. It's required to provide solution compatible with this approach.
The property `onChange` can be used as callback to any event changing the AltaMap internal state.


#### MapElements

Every element displayed on the map, like markers and shapes, should be an object of class extending **MapElement** model or just a **MapElement**.
All of these elements (**MapElement**) are grouped in a collection **MapElements**.


#### Handlers

The `AltaMap.jsx` contains the section **Handlers** and then `const handlers = { ... }` in the render.

```
constructor(props) {
  super(props)

  (...)

  /***   HANDLERS BINDS    ***/
  // >>> HERE BIND HANDLERS

  this.setViewport = this.setViewport.bind(this)
  this.addElements = this.addElements.bind(this)
  this.addMarker   = this.addMarker.bind(this)

  /*** END: HANDLERS BINDS ***/
}

/*****************  HANDLERS   *********************/
// >>> HERE PUT HANDLERS

setViewport(lat,lng,zoom) { ... }
addElements(elements) { ... }
addMarker(lat,lng,popup) { ... }

/* =================  END HANDLERS ===================== */

render() {
  const handlers = {
    // >>> HERE ADD HANDLERS TO VARIABLE PASSED TO CHILDREN
    addElements: this.addElements,
    (...)
  }
(...)
}
```

Handlers are just a functions doing mostly two things:
* running model's function, e.g. `mapElements.addElements()`,
* using `setState` to change AltaMap state and force re-render.

It's important to use handlers to get the re-render effect.


#### onChange

The `onChange` property is a function that is triggered every time that the AltaMap internal state is changed.

Usage:

```
(...)

constructor(props) {
  super(props)
  this.state = {
    elements: []
  }
  this.onAltaMapChange = this.onAltaMapChange.bind(this)
  this.altaRef = React.createRef()
}

(...)

onAltaMapChange(mapState) {
  # `mapState` gives the current state of the AltaMap
  # ... but we can access state also via ref
  let elements = this.altaRef.current.getElements()
  this.setState({
    elements: elements
  })
}

(...)

<AltaMap
  ref={this.altaRef}
  onChange={this.onAltaMapChange}
  />

(...)
```


### Development guidelines


#### Principles

1. Each element placed on the Map should extend `MapElement` model.
2. `MapElements` model is a set of `MapElement` objects.
3. Add to `MapElements` methods which are the operations on a set of `MapElement`
4. To `MapElement` model, add methods common for each `MapElement` object
5. Only one feature per a new branch.
6. Try to make each commit as a new record in the Changelog. (see **Git** section)
7. AltaMap contains state so it should be able to use all functionalities without syncing its state with the parent project's state.

#### Process

1. Download and fetch `develop` branch on local machine
2. Create a new branch from `develop`. You can create:
  * `feature/<feature-name>` - for new feature
  * `fix/<what-is-fixed>` - to add fix
  * `org/<what-is-changed` - to make some organizational works, like update README, update `package.json`, fix vulnerabilities in dependencies
3. Implement feature (check **New features** sections)
4. Lint & clean code
5. Make tests / add tests (?)
6. Update README.md:
  * **Options** - add here a new props and API's functions
  * **Features** - add here a newly implemented feature
  * **Changelog** - add to the list a name of the feature, fix or anything what will be released in a new version.
7. Create pull request to `develop` branch
8. Ask for review & merge


To release a new version:
1. Create pull request: `develop` to `master`
2. Test `master` branch
3. Merge pull request
4. Generate `docs`
5. Increment version in `package.json`
6. Update Changelog and others
7. Commit changes with `release` text
8. Run script to publish library to NPM


#### Git

Use `master` branch only to store production versions, to generate docs and publish on NPM. Tag each version. Only `develop` and `hotfix/` branches can be merged to the `master`.

The `develop` is used to sync works of developers and start working on new features, make fixes and organizational works. Each branch should have one out of the following prefixes:
* `feature/<feature-name>` - for new feature
* `fix/<what-is-fixed>` - to add fix
* `org/<what-is-changed` - to make some organizational works, like update README, update `package.json`, fix vulnerabilities in dependencies

##### Commits convention

Try to make that each commit in any `feature/` or `fix/` branch can be expressed in the *Changelog*.

**Example 1:**

Feature: `feature/markers`
Commits:
* *Marker model and component initialization*
* *Adding markers*
* *Removing and hiding markers*

Changelog:
```
[Feature] Markers - adding, removing and hiding
```
**Example 2:**

Feature: `fix/hiding-markers`
Commits:
* *Fix problem of not showing back hidden markers*

Changelog:
```
[Fix] Markers - fix of not showing back hidden markers
```


#### New features

The general approach:
1. create a model(s). It should extend `MapElement` class if it is an element displayed right on the map.
2. add to model methods
3. if needed, add in `AltaMap.jsx` handlers to the model methods (only to setters). Using model methods through `AltaMap.jsx` handlers is important when we want force re-render, because in handler we can do two things:
  1. run model's method: `const myModelTemp = this.state.myModel.method1()`
  2. refresh state: `this.setState({ myModel: myModelTemp })`
  [More about handlers](#handlers) - here you find alos instructions to bind handler and add to `handlers` variable in the render function.

4. create new component in `src/components/AltaMap/components` and its sub-components
3. import and use component in `AltaMap.jsx` or in any other proper component

Remember to add comments to the models and components which describes:
* what is the expected input with **PropTypes**
* what it does - comment at the beginning of the file

Remember about README.md. Update **Options** section with props and/or other sections if is it related.

---

# Changelog

Format:
```
* [Type] <component/feature name> - <description>

[Type] - e.g.: [Feature], [Fix]
<component/feature name> - name of the component or feature that was implemented or fixed
<description> - what was implemented or fixed
```

#### 1.0.3 [in progress]

* [Feature] AddressSearchBar - integration with Google Services, searching an address and adding as MapElement
* [Admin] README - add instructions how to use and develop. Added Changelog.

#### 1.0.2 [latest & published]

* [Feature] ControlPanel - panel with controls to add fake data or user input, delete elements, hide elements

#### 1.0.1 & 1.0.0

* Project base architecture setup, docs, NPM configuration etc.
* [Feature] Leaflet Map - using leaflet map
* [Feature] Heatmaps
* [Feature] Drawer
* [Feature] Markers
