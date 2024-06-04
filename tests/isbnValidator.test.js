 const  { isbn10CheckSum, isbnVaild, isbn13CheckSum}  = require('../utils/isbnValidator');

test('Makes sure only isbn length 10 or 13 is valid ', async () => {
    expect(isbnVaild("0716703440")).toBe(true);

    expect(isbnVaild("0596520689")).toBe(true);

    expect(isbnVaild("059048348x")).toBe(true);

    expect(isbnVaild("059045370x")).toBe(true);

    expect(isbnVaild("9780596520687")).toBe(true);

    expect(isbnVaild("97805965206875")).toBe(false);
    
    expect(isbnVaild("978059652068")).toBe(false);

    expect(isbnVaild("97")).toBe(false);

    expect(isbnVaild("")).toBe(false);
});

test('testing isbn input that are not all digits or x in last spot for 10', async () => { 
    expect(isbnVaild("071670344g")).toBe(false);

    expect(isbnVaild("hasrhfuaox")).toBe(false);

    expect(isbnVaild("978059652068x")).toBe(false);

    expect(isbnVaild("978059652*687")).toBe(false);
});

test('testing checksum of isbn 10 ', async () => {
    expect(isbn10CheckSum("0716703440")).toBe(true);

    expect(isbn10CheckSum("0596520689")).toBe(true);

    expect(isbn10CheckSum("059048348x")).toBe(true);

    expect(isbn10CheckSum("059045370x")).toBe(true);

    expect(isbn10CheckSum("071670344x")).toBe(false);

    expect(isbn10CheckSum("0596520682")).toBe(false);

    expect(isbn10CheckSum("0590483485")).toBe(false);

    expect(isbn10CheckSum("0590453700")).toBe(false);
})

test('testing checksum of isbn 13 ', async () => {
    expect(isbn13CheckSum("9780140328721")).toBe(true);

    expect(isbn13CheckSum("9780679805274")).toBe(true);

    expect(isbn13CheckSum("9780735211292")).toBe(true);

    expect(isbn13CheckSum("9781558585362")).toBe(true);

    expect(isbn13CheckSum("9780140328726")).toBe(false);

    expect(isbn13CheckSum("9780679805277")).toBe(false);

    expect(isbn13CheckSum("9780735211293")).toBe(false);

    expect(isbn13CheckSum("9781558585369")).toBe(false);

})