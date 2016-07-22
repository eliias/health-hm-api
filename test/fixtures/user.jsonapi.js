import userFixture from './user'
import projectFixture from './project'

export default Object.freeze({
  data: {
    type: 'user',
    attributes: userFixture,
    relationships: {
      projects: {
        data: [
          {
            type: 'project',
            id: projectFixture.id
          }
        ]
      }
    }
  }
})
