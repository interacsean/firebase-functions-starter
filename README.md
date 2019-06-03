# firebase-functions starter

Starter for Firebase functions with routing essentials setup.

This is architected to be able to separate endpoints by path namespace

```
firebase login
firebase use --add
```

Follow the instructions to add your firebase project.  Then:

```
cd functions
npm i
npm serve
```

Then visit the demo endpoint provided.

To extend, create more folders under the `functions/src/` directory, using the createApi helper function.  Add routes as needed.
