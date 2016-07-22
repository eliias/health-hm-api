import acl from 'netiam-contrib-acl'
import auth from 'netiam-contrib-auth'
import json from 'netiam-contrib-json'
import oauth from 'netiam-contrib-oauth'
import rest from 'netiam-contrib-rest'
import transform from 'netiam-contrib-transform'
import report from './lib/report'
import meta from './lib/meta'

export const plugins = {
  acl,
  auth,
  json,
  meta,
  oauth,
  report,
  rest,
  transform
}
