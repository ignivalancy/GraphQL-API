import { createApolloServer } from 'meteor/apollo';

import schema from '/imports/api/schema';

// console.log(schema);

createApolloServer({
    schema,
});
