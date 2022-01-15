
## ⚙️ Enter watch mode
```bash
tsc some-file.ts --watch # --watch is equivalent to -w
```

## ⚙️ Enable watch mode for entire project
```bash
tsc --init  # this will create a tsconfig.json file
tsc --watch
```

## 🌶 Interface vs Type
https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript


## 🥰 Utility types
https://www.typescriptlang.org/docs/handbook/utility-types.html

## 🐞 Misc
### 🍽 Ignore `noUnusedParameters` error
```js
// Use underscore (_) as the start of the parameter's name
function someFunction(_1: string, _something: number) {
    console.log('Calling someFunction() without a parameter');
}
```