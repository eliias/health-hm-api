[![Build Status](https://jenkins.dovigo.org/buildStatus/icon?job=health-api)](https://jenkins.dovigo.org/job/health-api/)

> A RESTful API for health tracking

## Introduction

This API follows the [JSON API](http://jsonapi.org/) specification. In order to
use the API, please make yourself comfortable with the conventions of this spec.

## Sort

You can sort a response by attribute field(s).

```
GET /users?sort=name
```

Invert order.

```
GET /users?sort=-name
```

Multiple fields.

```
GET /users?sort=name,-createdAt
```

## Pagination

Page-based, offset-based and cursor-based pagination is available.

```
GET /users?page[number]=2&page[size]=10
```

```
GET /users?page[limit]=10&page[offset]=10
```

```
GET /users?page[before]=abc123&page[after]=aaa111
```

## Compound Documents

To reduce the number of HTTP requests, you can *embed* related documents within
the response object. You can do so, by utilizing the `include` parameter.

```
GET /users?include=campaigns
```

Youc an also include more than one document at the same time.

```
GET /users?include=campaigns,projects
```

There is also support for deeply nested documents and documents on the same branch.

```
GET /users?include=campaigns.nodes.components,campaigns.nodes.transitions
```
