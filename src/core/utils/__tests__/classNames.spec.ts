import {classNames} from '../classNames.js';

describe('classNames', () => {
  describe('simple classes', () => {
    test('return empty string if called without args', () => {
      expect(classNames()).toEqual('');
    });

    test('one string arg', () => {
      expect(classNames('foo')).toEqual('foo');
    });

    test('multiple string arg', () => {
      expect(classNames('foo', 'bar', 'baz')).toEqual('foo bar baz');
    });

    test('ignore empty string', () => {
      expect(classNames('foo', '', '   ', 'bar', '   ', '')).toEqual('foo bar');
    });
  });

  describe('object classes', () => {
    test('return empty string if called with empty object', () => {
      expect(classNames({})).toEqual('');
      expect(classNames({}, {}, {})).toEqual('');
    });

    test('all classes exist', () => {
      expect(classNames({foo: true, bar: true})).toEqual('foo bar');
    });

    test('all classes not exist', () => {
      expect(classNames({foo: false, bar: false})).toEqual('');
    });

    test('some classes exist', () => {
      expect(classNames({foo: false, bar: true, baz: true})).toEqual('bar baz');
    });

    test('multiple objects', () => {
      const classes = classNames({foo: true}, {bar: false}, {a: true, b: false, c: true});
      expect(classes).toEqual('foo a c');
    });

    test('dynamic class names', () => {
      const prefix = 'avatar';
      const classes = classNames({[`${prefix}_show`]: true});
      expect(classes).toEqual('avatar_show');
    });
  });

  describe('array classes', () => {
    test('return empty string if called with empty arrays', () => {
      expect(classNames([])).toEqual('');
      expect(classNames([], [], [])).toEqual('');
    });

    test('one array arg', () => {
      expect(classNames(['foo', 'bar'])).toEqual('foo bar');
    });

    test('multiple array arg', () => {
      const classes = classNames(['foo', 'bar'], ['baz'], ['a', 'b']);
      expect(classes).toEqual('foo bar baz a b');
    });

    test('nested arrays', () => {
      const classes = classNames(['foo', ['bar', ['a', 'b']]]);
      expect(classes).toEqual('foo bar a b');
    });
  });

  describe('ignore others values', () => {
    test('ignore invalid args', () => {
      const classes = classNames('foo', false, true, null, 'bar', () => {}, new Date());
      expect(classes).toEqual('foo bar');
    });

    test('ignore nested invalid values', () => {
      const classes = classNames(['  ', null, true], {'': true}, [[[() => {}]]]);
      expect(classes).toEqual('');
    });
  });

  describe('combo classes', () => {
    test('row combo', () => {
      const classes = classNames('foo', {hidden: true}, ['a', 'b'], 'special');
      expect(classes).toEqual('foo hidden a b special');
    });

    test('nested combo', () => {
      const classes = classNames(['foo', {hidden: false, active: true}, ['a', 'b', {special: true}]]);
      expect(classes).toEqual('foo active a b special');
    });
  });
});