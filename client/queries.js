import { gql } from "apollo-boost";

export const GET_TASKS = gql`
  {
    tasks {
      id
      description
      done
    }
  }
`;

export const ADD_TASK = gql`
  mutation ($description: String!) {
    addTask(description: $description) {
      id
      description
      done
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation ($id: ID!) {
    removeTask(id: $id)
  }
`;

export const TOGGLE_TASK = gql`
  mutation ($id: ID!) {
    toggleTask(id: $id) {
      id
      done
    }
  }
`;
