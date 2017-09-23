import { Meteor } from 'meteor/meteor'
import { Categories, Tasks } from '../../collections';
import { buildRegExp } from '../../utils/regex';

export const typeDefs = `
                type Category {
                  _id: String!
                  name: String!
                  created_at: Date
                  taskList: [Task] # the list of Task by this category
                }
                type Query {
                  categories : [Category]
                  category (
                    title: String!
                  ): Category
                }
                type Mutation {
                    createCategory (
                      name: String!
                    ): Category
                }`;

export const resolvers = {
    Query: {
        categories(root, args, context) {
            return Categories.find({ created_by: 'admin' })
                .fetch();
        },
        category(root, { title }, context) {
            return Categories.findOne({ name: buildRegExp(title), created_by: 'admin' });
        }
    },
    Mutation: {
        async createCategory(root, { name }, context) {
            const data = { name, created_by: 'admin', created_at: new Date, updated_at: new Date };
            const _id = Categories.insert(data);
            return { _id, ...data };
        },
    },
    Category: {
        taskList({ _id }) {
            return Tasks.find({ cat_id: _id })
                .fetch();
        }
    }
};