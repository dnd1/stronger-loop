Love relations
----------------------------------------------------------------------

Hi again! Now, we want you relate your models. Fulfill the following requirements using relations.

1. One "DndUser" has many "Tweets".
2. A "Tweet" belongs to one "DndUser".
3. One "DndUser" can link multiple "Tweet"s as favorites.

Name the previous relation "favorites", now remember:

1. A user's favorite Tweets can be obtain by any user.
2. To mark a Tweet as Favorite, the "Tweet" and "DndUser" objects must both exist.

----------------------------------------------------------------------

## HINTS

Check out this documentation for relations: https://docs.strongloop.com/display/public/LB/Creating+model+relations.

And check out this one: https://docs.strongloop.com/display/public/LB/Accessing+related+models, it may help you when
defining your ACLs.

When modeling your Favorite Tweets requirement, using a "hasAndBelongsToMany" Relation will make things easier.

Here is some more help:

```sh
$ slc loopback
$ slc loopback:relation
```

When you are done, you must run (Assuming you're in you project's root):

```sh
$ {appname} verify server/server.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked `[COMPLETED]` if you are successful.
----------------------------------------------------------------------
