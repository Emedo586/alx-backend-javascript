const assert = require('assert').strict;
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function () {
  describe('SUM no Round', function () {
    it('should return 5', function () {
      assert.equal(calculateNumber('SUM', 1, 4), 5);
    });
  });

  describe('SUM first round', function () {
    it('should return 6', function () {
      assert.equal(calculateNumber('SUM', 2.4, 4), 6);
    });
  });

  describe('SUM second round ', function () {
    it('should return 6', function () {
      assert.equal(calculateNumber('SUM', 4, 2.4), 6);
    });
  });

  describe('SUM both round', function () {
    it('should return 6', function () {
      assert.equal(calculateNumber('SUM', 1.4, 4.5), 6);
    });
  });

  describe('SUBTRACT no round', function () {
    it('should return 2', function () {
      assert.equal(calculateNumber('SUBTRACT', 5, 3), 2);
    });
  });

  describe('SUBTRACT first round', function () {
    it('should return -3', function () {
      assert.equal(calculateNumber('SUBTRACT', 2, 4.5), -3);
    });
  });
