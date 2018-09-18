import { WebApp } from "meteor/webapp";
import { Random } from "meteor/random";

import {
  ApolloError,
  ApolloServer,
  gql
} from "apollo-server-express";

const tasks = new Map;

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      tasks: [Task]
    }

    type Mutation {
      addTask(description: String): Task
      removeTask(id: ID!): Boolean
      toggleTask(id: ID!): Task
    }

    type Task {
      id: ID!
      description: String
      done: Boolean
    }
  `,

  resolvers: {
    Query: {
      tasks() {
        return tasks.values();
      }
    },

    Mutation: {
      addTask(root, args) {
        const id = Random.id();
        const task = { id, ...args, done: false };

        tasks.set(id, task);
        return task;
      },

      removeTask(root, args) {
        return tasks.delete(args.id);
      },

      toggleTask(root, args) {
        const task = tasks.get(args.id);

        if (!task) {
          throw new ApolloError("Task not found");
        }

        task.done = !task.done;
        return task;
      }
    }
  }
});

server.applyMiddleware({
  app: WebApp.connectHandlers
});
