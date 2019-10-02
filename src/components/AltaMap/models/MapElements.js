/*
 *
 */
import MapElement from './MapElement'

export default class MapElements {
  constructor(params) {
    const properties = Object.assign({
      // these are the defaults
      elements: [],
    }, params)

    this.elements = properties.elements
  }

  getElements() { return this.elements }

  getElementsById(id) {
    let element
    let elementsArray = this.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.id === id) {
          element = elements
        }
        return element
      })
    }
    return element
  }

  getElementsByTag(tag) {
    let element
    let elementsArray = this.elements
    if(elementsArray.length > 0) {
      elementsArray.map((elements) => {
        if(elements.tags && elements.tags.indexOf(tag) > -1) {
          element = elements
        }
        return element
      })
    }
    return element
  }

  addElements(elements) {
    this.elements = this.elements.concat(elements.map((me) => {
      return new MapElement(me)
    }))
  }

  deleteElement(tag) {
    let deleteItem
    let element
    let elementsArray = this.elements
    if(elementsArray.length > 0) {
      elementsArray.map((el) => {
        if(el.tags && el.tags.indexOf(tag) > -1) {
          element = window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup._layers[el.id]
          deleteItem = elementsArray.indexOf(el)
          elementsArray.splice(deleteItem,1)
          window.react_map._mapDrawerRef.leafletElement._map.removeLayer(element)
          window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup.removeLayer(element)
        }
        return elementsArray
      })
    }
    this.elements = elementsArray
  }

  deleteElementById(id) {
    let deleteItem
    let elementsArray = this.elements
    let element
    if(elementsArray.length > 0) {
      elementsArray.map((el) => {
        if(el.id === id) {
          element = window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup._layers[el.id]
          deleteItem = elementsArray.indexOf(el)
          elementsArray.splice(deleteItem,1)
          window.react_map._mapDrawerRef.leafletElement._map.removeLayer(element)
          window.react_map._mapDrawerRef.leafletElement.options.edit.featureGroup.removeLayer(element)
        }
        return elementsArray
      })
    }
    this.elements = elementsArray
  }

  hideElements(tag) {
    if(this.elements.length > 0) {
      let elementsArray = this.elements.map((el) => {
        if(el.tags && el.tags.indexOf(tag) > -1) { el.hidden = el.hidden ? false : true }
        return el
      })
      this.elements = elementsArray
    }
  }

  hideElementById(id) {
    if(this.elements.length > 0) {
      let elementsArray = this.elements.map((el) => {
        if(el.id === id) { el.hidden = el.hidden ? false : true }
        return el
      })
      this.elements = elementsArray
    }
  }
}
