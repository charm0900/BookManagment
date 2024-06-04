const isbn10_len = 10; // length of isbn 10

const isbn13_len = 13; // length of 13

const isbnX_Value = 10; // X in isbn 10 is the value 10 for check sum

const asciiDiff = 48; // the number you need to subtract from a char (ex: '0') dec value to get its true decimal value

const isbn10CheckSumMultipler = 10; // starting number to multiple first digit of isbn by before subtracting 

const isbn10CheckSumMod = 11; // number to mod sum of multipler-- *  digit at index in isbn to 10

const isbn13CheckSumMod = 10; // number to mod sum of multipler *  digit at index in isbn

const isbn13CheckSumFirst = 1; // first number to multiple every other digit in isbn for check sum

const isbn13CheckSumSecond = 3; // second number to multiple every other digit in isbn for check sum

const coversUrl = "https://covers.openlibrary.org/b/isbn/"; // pre fix url for displaying cover images from open books 

const coversFileType = ".jpg"; // file type of cover images, appened to end after isbn

module.exports = {
    isbn10_len: isbn10_len,
    isbn13_len: isbn13_len,
    isbnX_Value: isbnX_Value,
    asciiDiff: asciiDiff,
    isbn10CheckSumMultipler: isbn10CheckSumMultipler,
    isbn10CheckSumMod: isbn10CheckSumMod,
    isbn13CheckSumMod: isbn13CheckSumMod,
    isbn13CheckSumFirst: isbn13CheckSumFirst,
    isbn13CheckSumSecond: isbn13CheckSumSecond,
    coversUrl: coversUrl,
    coversFileType: coversFileType,
};