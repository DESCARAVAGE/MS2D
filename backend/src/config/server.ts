import { ApolloServer } from "apollo-server";
import { dataSource } from "./db";
import { buildSchema } from "type-graphql";
import { GroupResolver } from "../resolvers/groupResolver";
import { StudentResolver } from "../resolvers/studentResolver";
async function createServer(): Promise<ApolloServer> {
    const port: number = 3001;
    await dataSource.initialize();

    const schema = await buildSchema({
        resolvers: [
            GroupResolver,
            StudentResolver,
        ],
        validate: { forbidUnknownValues: false }
    });

    return new ApolloServer({
        schema,
    });
}

export default createServer;
