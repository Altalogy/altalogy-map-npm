export default class DataTimeSerie extends MapElement {
  constructor(params) {
    const properties = Object.assign({
      // these are the defaults
      type: 'DataTimeSerie',
      data: [],
      current_timestamp: null,
      active: false,
    }, params)

    this.type = this.properties.type
    this.data = this.properties.data
    this.current_timestamp = this.properties.current_timestamp
    this.active = this.properties.active
  }

  getCurrentTimestamp() { return this.current_timestamp }

  setCurrentTimestamp(timestamp) {
    let new_timestamp = new_timestamp
    this.current_timestamp = new_timestamp
    return this.current_timestamp
  }
}
