# hsms

A simple Hardware Security Module ([HSM](https://en.wikipedia.org/wiki/Hardware_security_module)) simulator. 
The list of supported commands is:

Only the double-length key 3DES operations are supported.


## To use:
```javascript
const hsm = new HSM()

```

## To customize:

```bash
git clone https://github.com/timgabets/hsms.git
cd hsms
# Install all the dependencies
npm install
# Init ava test framework
ava --init
# Check the tests
npm test
```
