export const typeDefs = `
type Query {
  say: String
}
`;

export const resolvers = {
    Query: {
        say(root, args, context) {
            return 'hello world';
        }
    }
}