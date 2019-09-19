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

To sync application's state, Redux store etc., you can use `onChange` to get its current state.

Check **Options** section to see advanced configuration.


### Options

##### A) Properties

| Property                | Values                    | Description                                      |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| controlPanel            | [Boolean] true / false    | Display the control Panel on the Map             |
| onChange                | [Function]                | Callback triggered on AltaMap state change       |


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
  this.altaRef.setViewport()
  # 2. add element:
  this.altaRef.addElements([{...}])
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
| addMapElements(elements)| elements - JSON           | Add elements to the map                          |

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

**MapElements API**

* `add` - adds **MapElement** object or object of the class extending **MapElement** to the collection
* `delete(tags)`
* `deleteById(id)`
* `hide(tags)`
* `hideById`
* `getAll`
* `get(tags)`
* `getById(id)`



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

General approach is to:
1. create a model(s). It should extend `MapElement` class if it is an element displayed right on the map.
2. create new component in `src/components/AltaMap/components`
3. import component in `AltaMap.jsx`

Below is more detailed instructions how to develop specific type of components.

Remember to add comments to the models and components which describes:
* input
* what it does
* API

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
