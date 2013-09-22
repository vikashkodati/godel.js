/*global describe: true, g: true, it: true, expect: true */
/*jslint sloppy: true*/

describe('base operations', function () {

  describe('incr', function() {
    it('increments a value by 1', function() {
      expect(g.incr(4)).toBe(5);
      expect(g.incr(-1)).toBe(0);
    });

    it('supports a function argument that resolves to a number', function() {
      expect(g.incr(function () {
        return 4;
      })).toBe(5);
    });
  });

  describe('decr', function () {
    it('decrements a value by 1', function() {
      expect(g.decr(4)).toBe(3);
    });

    it('stops decrementing at zero', function() {
      expect(g.decr(0)).toBe(0);
    });

    it('supports a function argument that resolves to a number', function() {
      expect(g.decr(function () {
        return 4;
      })).toBe(3);
    });
  });

  describe('eq', function() {
    it('returns true if two values are equal', function() {
      expect(g.eq(2, 2)).toBeTruthy;
    });

    it('returns false if two values are not equal', function() {
      expect(g.eq(2, 0)).toBeFalsy();
    });

    it('supports function arguments', function() {
      expect(g.eq(function () { return 2; }, function () { return 2; })).toBeTruthy;
    });
  });

  describe('neq', function() {
    it('returns true if two values are not equal', function () {
      expect(g.neq(2, 0)).toBeTruthy();
    });

    it('supports function arguments', function() {
      expect(g.neq(function () { return 2; }, function () { return 0; })).toBeTruthy;
    });
  });

  describe('cond', function() {
    it('returns the evaluation of the second argument if the condition is true', function() {
      expect(g.cond(g.eq(1, 1), 1, 2)).toBe(1);
      expect(g.cond(g.eq(1, 1), function () { return 1; }, function () { return 2; })).toBe(1);
    });

    it('returns the evaluation of the third argument if the condition is false', function() {
      expect(g.cond(g.eq(1, 0), 1, 2)).toBe(2);
      expect(g.cond(g.eq(1, 0), function () { return 1; }, function () { return 2; })).toBe(2);
    });

    it('returns a falsy value if the condition is false and the else callback is missing', function () {
      expect(g.cond(g.eq(1, 0), function () { return 1; })).toBeFalsy();
    });

    it('handles first class functions as conditions', function() {
      expect(g.cond(function () { return g.eq(1, 0); }, 1, 2)).toBe(2);
    });
  });
});

describe('derived operations', function() {
  describe('and', function() {
    it('returns a truthy value if both arguments resolve to true', function() {
      expect(g.and(g.eq(2, 2), g.eq(1, 1))).toBeTruthy();
      expect(g.and(g.eq(2, 2), g.neq(1, 0))).toBeTruthy();
      expect(g.and(function () { return g.eq(2, 2); }, function () { return g.eq(1, 1); })).toBeTruthy();
    });

    it('returns a falsy value if at least one of the arguments is false', function() {
      expect(g.and(g.eq(2, 0), g.eq(1, 1))).toBeFalsy();
      expect(g.and(g.eq(2, 0), g.eq(1, 0))).toBeFalsy();
      expect(g.and(g.eq(2, 0), undefined)).toBeFalsy();
      expect(g.and(function () { return g.eq(2, 2); }, function () { return g.eq(1, 1); })).toBeTruthy();
    });
  });

  describe('or', function() {
    it('returns a truthy value if at least one of the arguments resolve to true', function() {
      expect(g.or(g.eq(2, 2), g.eq(1, 0))).toBeTruthy();
      expect(g.or(g.eq(2, 2), g.neq(1, 1))).toBeTruthy();
      expect(g.or(function () { return g.eq(2, 2); }, function () { return g.eq(1, 1); })).toBeTruthy();
    });

    it('returns a falsy value if both of the arguments are false', function() {
      expect(g.or(g.eq(2, 0), g.eq(1, 0))).toBeFalsy();
      expect(g.or(g.eq(2, 0), g.eq(1, 0))).toBeFalsy();
      expect(g.or(g.eq(2, 0), undefined)).toBeFalsy();
    });
  });

  describe('not', function() {
    it('returns a falsy value if the argument resolves to true', function () {
      expect(g.not(g.eq(1,1))).toBeFalsy();
      expect(g.not(1)).toBeFalsy();
    });

    it('returns a truthy value if the argument resolves to false', function() {
      expect(g.not(g.eq(0, 1))).toBeTruthy();
      expect(g.not(0)).toBeTruthy();
    });
  });

  describe('add', function () {
    it('computes the sum of two numbers', function() {
      expect(g.add(2, 2)).toBe(4);
    });
  });
});