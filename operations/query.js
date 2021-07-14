import { gql } from "@apollo/client";


export function readState(fields) {
  return gql`query {
    readState @client {
      ${fields}
    }
  }
`;
}
