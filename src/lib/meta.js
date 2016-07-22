import _ from 'lodash'
import assert from 'assert'

export default function({type, meta}) {
  assert.ok(type)
  assert.ok(meta)

  return function(req, res) {
    const list = []

    if (_.isArray(res.body.data)) {
      res.body.data.forEach(document => {
        if (document.type === type) {
          list.push(document)
        }
      })
    } else if (_.isObject(res.body.data) && res.body.data.type === type) {
      list.push(res.body.data)
    }

    if (_.isArray(res.body.included)) {
      res.body.included.forEach(document => {
        if (document.type === type) {
          list.push(document)
        }
      })
    }

    return Promise.all(list.map(meta))
  }
}
