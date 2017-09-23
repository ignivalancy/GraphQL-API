import { Categories, Tasks } from '../../collections';

export const typeDefs = `
                type Task {
                  _id: String
                  title: String
                  complete: Boolean
                  created_at: Date
                  updated_at: Date
                }
                type Query {
                  tasks : [Task]
                }
                type Mutation {
                  createTask (
                    title: String
                    cId: String
                  ): Task
                  toggleTask (
                    tId: String!
                  ): Task
                }
              `;

export const resolvers = {
    Query: {
        tasks(root, args, context) {
            return Tasks.find({ created_by: 'admin' })
                .fetch();
        }
    },
    Mutation: {
        async createTask(root, { title, cId }, context) {
            if (Categories.findOne(cId)) {
                const data = { title, cat_id: cId, complete: false, created_by: 'admin', created_at: new Date, updated_at: new Date };
                const _id = Tasks.insert(data);
                return { _id, ...data };
            }
            throw new Meteor.Error("mutation-denied", `category - not found`);
        },
        async toggleTask(root, { tId }, context) {
            const task = Tasks.findOne({ _id: tId, created_by: 'admin' });
            if (task) {
                const mods = { complete: !task.complete, updated_at: new Date };
                Tasks.update({ _id: tId }, { $set: mods });
                return { ...task, ...mods };
            }
            throw new Meteor.Error("mutation-denied", `task - not found`);
        }
    }
};