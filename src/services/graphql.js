import fetch from 'isomorphic-fetch';

/**
* Express-graphql accepts request with the parameters
* @{query} - A valid GraphQL query or mutation
* @{variables} - runtime values to use for any GraphQL query variables as a JSON object
* Need to specify the content-type as 'application/json' in the request header.
**/

export const query = (query, variables, env) => {
  return fetch(`https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com/${env}/graphql`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('userToken')
    },
    body: JSON.stringify({ 'query': query, 'variables': JSON.stringify(variables) })
  })
  .then(res => res.json());
};
