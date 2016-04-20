Model your way up
----------------------------------------------------------------------

First things first! We want to make sure that you're all set, let's start small.

1. Bootstrap a "loopback" project using the "slc" generator.
2. Create two models:
    1. "DndUser" model, which extends from the base "User" model. The plural for this model should be: "dndusers".
    2. "Tweet" model, which extends from the base "PersistedModel" model. The plural for this model should be: "tweets".

----------------------------------------------------------------------

## HINTS

Here is some help:

```sh
$ slc loopback
$ slc loopback:model
```

When you are done, you must run:

```sh
$ {appname} verify server/server.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked `[COMPLETED]` if you are successful.

----------------------------------------------------------------------
