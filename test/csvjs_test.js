/*global module,test,same,equal,ok,CSV*/
module('CSV.js');

test('usage example', function() {
  var headers = 'name,email,room'.split(/,/);
  var csv = new CSV(headers);

  csv.push('bob', 'bob@example.com', 'room 1');
  csv.push('alice', 'alice@example.com', 'room 3');
  csv.push(['charly', 'charly@example.com', 'room 42']);

  var expected = [
    'name,email,room',
    'bob,bob@example.com,room 1',
    'alice,alice@example.com,room 3',
    'charly,charly@example.com,room 42'
  ].join("\r\n");

  same(csv.render(), expected);
});

test('escaping a field with special chars', function() {
  var csv = new CSV();
  csv.push('foo"bar', 'bar');
  csv.push('foo\r\nbar', 'bar');
  csv.push('foo,bar', 'bar');

  var expected = [
    '"foo""bar",bar',
    '"foo',
    'bar",bar',
    '"foo,bar",bar'
  ].join("\r\n");

  equal(csv.render(), expected);
});
