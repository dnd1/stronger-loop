Hook them up
----------------------------------------------------------------------

Now that you have your first models, we need a way for them to store their creation date when they are created. Also,
we want to hide some fields whenever a user is retrieved.

1. Add a "createdAt" property to each model.
2. Create an "operation hook" in each model that sets the "createdAt" attribute to the current date. Keep in mind that
    the "createdAt" attribute should no change after it has been set, so updating a user should not change the value of
    the "createdAt" property.
3. Create a "remote hook" in the "DndUser" model to hide the "password" when a specific user in fetched. Also, hide
    the "fullName" property, since we want to keep our user's privacy, you know.

----------------------------------------------------------------------

## HINTS

Keep in mind the docs when trying to create an operation hook:  (Operation hooks)[https://docs.strongloop.com/display/public/LB/Operation+hooks]

```js
MyModel.observe('before delete', function(ctx, next) {
  console.log('Going to delete %s matching %j',
    ctx.Model.pluralModelName,
    ctx.where);
  next();
});
```

Also keep in mind the docs when creating a remote hook: (Remote hooks)[https://docs.strongloop.com/display/public/LB/Remote+hooks]

```js
Customer.afterRemote('*.save', function(ctx, user, next) {
  console.log('user has been saved', user);
  next();
});
```

Finally, check out the "unsetAttribute" instance function.

When you are done, you must run (Assuming you're in you project's root):

```sh
$ {appname} verify ./server/server.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked `[COMPLETED]` if you are successful.

----------------------------------------------------------------------
