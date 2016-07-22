import netiam from 'netiam'
import Role from '../models/role'
import Token from '../models/token'
import User from '../models/user'
import {plugins} from '../api'
import adapter from '../acl/adapter'

export default function(router) {

  /**
   * @api {post} /roles New role
   * @apiName CreateRole
   * @apiVersion 2.0.0
   * @apiGroup Roles
   */
  router.post(
    '/roles',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .acl.req({
        adapter,
        resource: 'role'
      })
      .rest({model: Role})
      .acl.res({
        adapter,
        resource: 'role'
      })
      .json()
  )

  /**
   * @api {get} /roles Fetch projects
   * @apiName GetRoles
   * @apiVersion 2.0.0
   * @apiGroup Roles
   */
  router.get(
    '/roles',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .rest({model: Role})
      .acl.res({
        adapter,
        resource: 'role'
      })
      .json()
  )

  /**
   * @api {get} /roles/:id Fetch single project
   * @apiName GetRole
   * @apiVersion 2.0.0
   * @apiGroup Roles
   */
  router.get(
    '/roles/:id',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .rest({model: Role})
      .acl.res({
        adapter,
        resource: 'role'
      })
      .json()
  )

  /**
   * @api {patch} /roles/:id Update project
   * @apiName UpdateRole
   * @apiVersion 2.0.0
   * @apiGroup Roles
   */
  router.patch(
    '/roles/:id',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .acl.req({
        adapter,
        resource: 'campaign'
      })
      .rest({model: Role})
      .acl.res({
        adapter,
        resource: 'role'
      })
      .json()
  )

  /**
   * @api {delete} /roles/:id Delete project
   * @apiName DeleteRole
   * @apiVersion 2.0.0
   * @apiGroup Roles
   */
  router.delete(
    '/roles/:id',
    netiam({plugins})
      .auth({
        userModel: User,
        tokenModel: Token,
        roleModel: Role
      })
      .acl.req({
        adapter,
        resource: 'campaign'
      })
      .rest({model: Role})
      .acl.res({
        adapter,
        resource: 'role'
      })
      .json()
  )

}
