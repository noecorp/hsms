import {des as des3} from 'node-cardcrypto'

class HSM{
  constructor(lmk, header) {
    lmk ? this.LMK = lmk : this.LMK = 'DEAFBEEDEAFBEEDEAFBEEDEAFBEEDEAF'
    header ? this.header = header : this.header = ''

    this.firmware_version = '0007-E000';
  }

  test(){
    return true
  }

  /**
   * [getKeyCheckValue description]
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  getKeyCheckValue(key, cv_length){
    var kcv = des3.ecb_encrypt(key, '00000000000000000000000000000000');
    if(kcv){
      if(cv_length)
        return kcv.substr(0, cv_length);
      else
        return kcv.substr(0, 6);
    }
    else
      return null;
  }

  /**
   * [getDiagnosticsData description]
   * @return {[type]} [description]
   */
  getDiagnosticsData(){
    var response = new Map()
    
    response.set('Response Code', 'ND');
    response.set('Error Code','00');
    response.set('LMK Check Value', this.getKeyCheckValue(this.LMK, 16));
    response.set('Firmware Version', this.firmware_version);

    return response;
  }

  getResponse(data){
    switch(data.substr(0,2)){
      case 'NC':
        return this.getDiagnosticsData()
    }
  }

  /**
   * [getOutgoingMessageLength description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  getOutgoingMessageLength(data){
    return String.fromCharCode(data.length / 256) + String.fromCharCode(data.length % 256);
  };

  /**
   * [build description]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  build(response){
    var message = this.header;
    for (var [key, value] of response)
      message += value

    return this.getOutgoingMessageLength(message) + message
  }
}

module.exports = HSM
