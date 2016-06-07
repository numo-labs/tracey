export const SEARCH = `
query tracing($searchId: String) {
  tracing {
    search(searchId: $searchId) {
      id
      queries
      results {
        type
        main {
          id
          labels
          properties {
            id
            name
            nodeType
            nodeSubType
          }
        }
        nodes {
          id
          labels
          properties {
            id
            name
            nodeType
            nodeSubType
          }
        }
        relationships {
          id
          type
          properties {
            active
            type
          }
          source
          target
        }
      }
    }
  }
}
`;
