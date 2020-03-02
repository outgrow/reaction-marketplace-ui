import gql from "graphql-tag";

export default gql`
  query shops($first: ConnectionLimitInt, $last: ConnectionLimitInt, $offset: Int) {
    shops(first: $first, last: $last, offset: $offset) {
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      nodes {
        _id
        createdAt
        name
        owner
        productCount
      }
    }
  }
`;
