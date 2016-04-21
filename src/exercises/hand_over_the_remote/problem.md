Hand over the remote
----------------------------------------------------------------------

Great, you've made it this far, that's nice! Now that you have your hooks set up, add a method to the "DndUser" model
that lets people get the user's nickname.

The nickname for a user should comply with the following conditions:

    1. It should be the user's "fullName" with hyphens ("-") instead of spaces.
    2. It should be in lowercase.
    3. It should end with "-" + the user's Id.

For example:

        * John Doe => john-doe-3
        * Daniel Rodriguez del Villar => daniel-rodriguez-del-villar-1
        * Juan => juan4

The endpoint for this should be:

        GET /api/dndusers/:id

And it should return something like this:

```json
{
    "nickname": "martin-fowler-1"
}
```

----------------------------------------------------------------------

## HINTS

So you're stuck, that's bad. Go and check out the (Remote Methods)[https://docs.strongloop.com/display/public/LB/Remote+methods]
docs.

Take this example into account:

```js
module.exports = function(Person){

    Person.greet = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }

    Person.remoteMethod(
        'greet',
        {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'greeting', type: 'string'}
        }
    );
};
```

Keep in mind, that all User's methods will be protected, so you'll need to add some ACL's to your model in order to be
able to access your remote method. Check this docs: (ACL)[https://docs.strongloop.com/display/public/LB/Controlling+data+access].

When you are done, you must run (Assuming you're in you project's root):

```sh
$ {appname} verify ./server/server.js
```

to proceed. Your program will be tested, a report will be generated, and the lesson will be marked `[COMPLETED]` if you are successful.

----------------------------------------------------------------------
