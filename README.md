![tracey](http://logos.textgiraffe.com/logos/logo-name/Tracey-designstyle-kiddo-m.png)

A simple ui for tracing searches in inspirational search.

Tracey takes the search-result-id from a graphql query and displays useful information on how a certain result-set has been derived.

## Example

For example a user searches for `Spanien`, we grab the search result id and place it into Tracey for the desired environment:

![screenshot from 2016-07-01 10-56-55](https://cloud.githubusercontent.com/assets/524382/16518427/a03df116-3f7a-11e6-981d-3cac35a863b5.png)

This allows us to view the general overview of what has happened during our search as well as the queries that have been executed, providing an easy way to debug general query problems.

Sometimes though, the problem is due to specific hotels showing up incorrectly, tracey can assist in debugging these issues as well by providing the hotel pane as well as the tile pane:

![screenshot from 2016-07-01 10-59-56](https://cloud.githubusercontent.com/assets/524382/16518498/07c648a6-3f7b-11e6-8dea-ca63afd78e4f.png)
