/*
 *
 */
import uuid from 'uuidv4'

export default class MapElements {
  constructor(params) {
    const properties = Object.assign({
      // these are the defaults
      elements: [],
    }, params)

    this.elements = properties.elements
  }

  addElements(elements) {
    this.elements = this.elements.concat(elements)
  }
}
