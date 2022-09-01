# installation
## requirements
- node js 16+
- yarn

## installation
- run ```yarn```

# Debug
- run ```yarn android``` or ```yarn ios```

# Deploy
depending on which stage and device you use you can deploy a new version of the app by one command
before you update the app you should consider these rules:
## codepush versions rely on the native versions
codepush version: c
native version: n
- n1.0 deployed you deploy c1.1 tester installed native version n1.0 and gets c1.1
- native version needs to be updated to n1.1 due to some swift or kotlin changes
- deploy c1.2 -> tester only gets version c1.1 because he/she has not installed the newer n1.1
- after tester installed n1.1 tester also gets c1.2

before you deploy update package.json version
then execute this command
device either android or ios
stage either int or prod
```yarn [device]:deploy-[stage]```

the user should now gets the updates automatically
