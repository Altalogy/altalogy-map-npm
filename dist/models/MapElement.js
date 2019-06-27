/*
 *
 */
import uuid from 'uuidv4';
export default class MapElement {
  constructor(params) {
    const properties = Object.assign({
      // these are the defaults
      id: uuid(),
      type: null,
      tags: null,
      options: null,
      data: null
    }, params);
    this.id = properties.id;
    this.type = properties.type;
    this.tags = properties.tags;
    this.options = properties.options;
    this.data = properties.data;
  }

}