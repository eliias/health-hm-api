import _ from 'lodash'

function order(str) {
  if (!_.isString(str) || str.length === 0) {
    return undefined
  }

  const parts = str.split(',')
  return parts.map(part => {
    if (part.charAt(0) === '-') {
      return {
        field: part.substring(1),
        sort: 'DESC'
      }
    }

    if (part.charAt(0) === '+') {
      return {
        field: part.substring(1),
        sort: 'ASC'
      }
    }

    return {
      field: part,
      sort: 'ASC'
    }
  })
}

function normalize(req) {
  return {
    limit: Number(req.query.limit) || 10,
    offset: Number(req.query.offset) || 0,
    order: order(req.query.order) || undefined
  }
}

export default function({
  db,
  query
}) {
  return (req, res) => {
    const parameters = normalize(req)
    const compose = query.clone()
    compose.limit(parameters.limit)
    compose.offset(parameters.offset)

    if (parameters.order) {
      parameters.order.forEach(order => {
        compose.order(order.field, order.sort !== 'DESC')
      })
    }

    return db
      .query(compose.toString(), {type: db.QueryTypes.SELECT})
      .then(values => res.body = values)
  }
}
