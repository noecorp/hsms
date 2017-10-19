import test from 'ava';
import HSM from '../hsm'

var test_lmk = 'DEAFBEEDEAFBEEDEAFBEEDEAFBEEDEAF'
var hsm = new HSM(test_lmk)

test('should assign LMK', t => {
  t.is(hsm.LMK, test_lmk)
});

test('should get 6-digit LMK check value by default', t => {
  t.is(hsm.getKeyCheckValue(test_lmk), 'F4EDC8')
});

test('should get arbitrary-length LMK check value', t => {
  t.is(hsm.getKeyCheckValue(test_lmk, 16), 'F4EDC8DEB67F6E28')
});

test('should get diagnostics data', t => {
  var response = hsm.getDiagnosticsData()

  t.is(response.get('Response Code'), 'ND')
  t.is(response.get('Error Code'), '00')
  t.is(response.get('LMK Check Value'), 'F4EDC8DEB67F6E28')
  t.is(response.get('Firmware Version'), '0007-E000')
});

test('should be able to get proper empty message length', t => {
  t.is(hsm.getOutgoingMessageLength(''), '\x00\x00')  
});

test('should return the length for message.len === 10', t => {
  t.is(hsm.getOutgoingMessageLength('0123456789'), '\x00\x0a')  
});

test('should return the length for message.len === 16', t => {
  t.is(hsm.getOutgoingMessageLength('0123456789abcdef'), '\x00\x10')  
});

test('should return the length for message.len === 255', t => {
  t.is(hsm.getOutgoingMessageLength('123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'), '\x00\xff')  
});

test('should return the length for message.len === 256', t => {
  t.is(hsm.getOutgoingMessageLength('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'), '\x01\x00')  
});

test('should return the length for message.len === 2636', t => {
  t.is(hsm.getOutgoingMessageLength('0123456789abcdef012340123456789abcdef01234567889abcdef01289abcdef01289abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567893456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567893456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567899abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef567889abcdef01289abcdef01289abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567893456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567893456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01234567899abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'), '\x0a\x4c')  
});

test('should build data string from response object', t => {
  var response = new Map()
    
  response.set('Response Code', 'ND');
  response.set('Error Code','00');
  response.set('LMK Check Value', 'F4EDC8DEB67F6E28');
  response.set('Firmware Version', '0007-E000');

  t.is(hsm.build(response), '\x00\x1dND00F4EDC8DEB67F6E280007-E000')
});

test('should build data string from response object with header', t => {
  var response = new Map()
    
  response.set('Response Code', 'ND');
  response.set('Error Code','00');
  response.set('LMK Check Value', 'F4EDC8DEB67F6E28');
  response.set('Firmware Version', '0007-E000');

  hsm.header = 'SSSS'

  t.is(hsm.build(response), '\x00\x21SSSSND00F4EDC8DEB67F6E280007-E000')
});