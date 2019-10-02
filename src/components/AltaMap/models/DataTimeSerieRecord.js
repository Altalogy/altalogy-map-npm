export default class DataTimeSerieRecord extends MapElement {
  constructor(params) {
    const properties = Object.assign({
      // these are the defaults
      type: 'DataTimeSerieRecord',
      timestamp: '',
    }, params)

    this.type = this.properties.type
    this.timestamp = this.properties.timestamp
  }

  getDateFormat() { return '' }
}
