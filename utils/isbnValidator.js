const  { isbn10_len, isbn10CheckSumMod, isbnX_Value, asciiDiff, isbn13_len, isbn13CheckSumFirst, isbn13CheckSumSecond, isbn13CheckSumMod }  = require('../config/constants');

  // last char is a check sum digit 
  // isbn of 10 can have x, 13 will not 
  // apparently isbn 13 uses mod 10 to checksum so x as a 10 is not needed 0-9
  // but since isbn 10 uses mod 11 to checksum it needs x since 10 is needed 0-10
  function isbnVaild(isbn){
    let i = 0
    for (; i < isbn.length; i++) {
        const e = isbn[i];
        if ( !( (isbn[i] >= '0' && isbn[i] <= '9') || (i == isbn.length-1 && i+1 == isbn10_len && (isbn[i] == 'x' || isbn == 'X')) ) ){
            return false;
        }
    }

    if ( (i == isbn10_len && isbn10CheckSum(isbn)) || (i == isbn13_len && isbn13CheckSum(isbn)) ){
        return true;
    }
    return false;
  }

    // check sum for isbn 10 is last digit, 0-10, 10 is an x
  // sum all the digits of the isbn multipled by 10-1, descesding 1 each time
  // ex isbn 0716703440, 0 * 10 + 7 * 9 + 1 * 8 ...
  // divide sum by 11
  // sum % 11 should give remainder of 0
  // returns true for valid and false for invalid
  function isbn10CheckSum(lcIsbn){
    let sum = 0;

    let check = isbn10_len;
    for (let i = 0; i < lcIsbn.length; i++) {
        if (i == lcIsbn.length-1 && (lcIsbn[i] == 'x' || lcIsbn[i] == 'X') ){
            sum += isbnX_Value * check;
        }else{
            sum += (lcIsbn.charCodeAt(i) - asciiDiff) * check--; // 48 = char 0 to dec 0 difference
        }
    }
    
    return sum % isbn10CheckSumMod == 0; // no remaninder, valid isbn
  }

  // check sum for isbn 13 is last digit, 0-9
  // sum all the digits of the isbn multipled by  1 or 3 alternating,
  // ex isbn 9780596520687, 9 * 1 + 7 * 3 + 8 * 1 ...
  // divide sum by 10 and remainder should be 0
  // sum % 10 should give remainder of 0
  // returns true for valid and false for invalid
  function isbn13CheckSum(lcIsbn){
    let sum = 0;

    let multiplier = isbn13CheckSumFirst;
    for (let i = 0; i < lcIsbn.length; i++) {
        multiplier = i % 2 == 0 ? isbn13CheckSumFirst : isbn13CheckSumSecond;
        sum += (lcIsbn.charCodeAt(i) - asciiDiff) * multiplier; 
    }
    
    return sum % isbn13CheckSumMod == 0; // no remaninder, valid isbn
  }

module.exports = {
    isbnVaild: isbnVaild,
    isbn10CheckSum: isbn10CheckSum,
    isbn13CheckSum: isbn13CheckSum
};