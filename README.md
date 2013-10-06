Gödel.js
========

An attempt to build a model of computation (arithmetic, for now) from a minimal 
set of primitives and applications of recursion and composition. 

This is a loose implementation of the *S* language of Computability, Complexity, and Languages by Davis et al.

### What is this?

The whole premise is that **you can build arithmetic from 
just 3 simple operations**: increment, decrement, and conditional jumps.

Of course, in practice, this assumes that you also have a means of testing equality. 
Hence, there's more like 4 core operations:
increment (`incr`), decrement (`decr`, conditional branch (`cond`), and equality (`eq`).

### Caveats

#### Negative numbers

Interestingly enough, negative numbers are not supported in the algebra - thus making it toy. 
This is mainly the result of needing a lower bound (or stopping point) for our recursion.

Implementing `lt` (less than) for positive numbers is easy. Our definition of `lt` would state 
that *x is less than y if (through repeated decrements) x hits zero before y*. For negative numbers, 
you'd be able to just increment x or y and see if x hits zero first. However, to determine whether you
should decrement or increment, you need to determine if the inputs are negative. 

How do we determine if the inputs are negative? Well, a negative number is one that is *less than* zero...
Hence, to implement `lt` for negative numbers, you'd need `lt` to determine if a number was negative. 

This is why the algebra only supports positive numbers.

### The computational model, thus far:

#### Core operations:

`incr`: increment
```javascript
incr(4) => 5
```

`decr`: decrement (stops at zero)
```javascript
decr(1) => 0
decr(0) => 0
```

`cond`: conditional branch
```javascript
cond(some_condition, then_callback_or_value, else_callback_or_value)

cond(lt(1, 2), function () {
    return true;
},
function () {
    return false;
})

// OR simply

cond(lt(1, 2), true, false)
```

`eq`: equality
```javascript
eq(1, 1) => true
```

#### Supported arithmetic operations:

`neq`: not equal to
```javascript
neq(2, 1) => true
```

`lt`: less than
```javascript
lt(2, 1) => false
```

`gt`: greater than
```javascript
gt(2, 1) => true
```

`lte`: less than or equal to
```javascript
lte(1, 1) => true
```

`gte`: greater than or equal to
```javascript
gte(1, 2) => false
```

`add`: addition
```javascript
add(1, 3) => 4
```

`sub`: subtraction (stops at zero)
```javascript
sub(2, 1) => 1
sub(2, 3) => 0 // no negatives
```

`mult`: multiplication
```javascript
mult(2, 2) => 4
```

`exp`: exponentiation
```javascript
exp(2, 2) => 4
exp(2, 0) => 1
```

Boolean operations:

`or`
```javascript
or(lt(1, 2), gt(1, 2)) => true
```

`and`
```javascript
and(lt(1, 2), gt(1, 2)) => false
and(lt(1, 2), gt(2, 1)) => true
```

`not`
```javascript
not(lt(2, 1)) => true
```