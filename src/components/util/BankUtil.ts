/*
 * This is a util to verify bank inputs to a certain accuracy.
 * It's not guaranteed that the IBAN or BIC really exists.
 * Currently the checks are commented out in TicketForm.jsx (line 109-117),
 * because it's easier to test without having to copy-paste valid inputs
 * into the form.
 */

// test iban: DE89 3704 0044 0532 0130 00
export function isValidIBAN(iban: string): boolean {
    const ibanRegex = /^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/;

    if (!ibanRegex.test(iban)) {
        return false;
    }

    // checksum calculation

    const ibanStripped = iban.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
    const m = ibanStripped.match(/^([A-Z]{2})([0-9]{2})([A-Z0-9]{11,30})$/);
    
    if (!m) {
        return false;
    }
  
    const numberized: string = (m[3] + m[1] + m[2]).toString().replace(/[A-Z]/g, (s: any) => {
        return (s.charCodeAt(0) - 55).toString(); 
    });

    const regexResult: RegExpMatchArray | null = numberized.match(/\d{1,7}/g);

    if (!regexResult) {
        return false;
    }

    const mod97: string = regexResult.reduce((total: any, curr: any) => {
        return (Number(total + curr) % 97).toString()
    }, "");

    return Number(mod97) === 1;
}

// test bic: UCJAES2MXXX
export function isValidBIC(bic: string): boolean {
    const bicRegex = /([a-zA-Z]{4})([a-zA-Z]{2})(([2-9a-zA-Z]{1})([0-9a-np-zA-NP-Z]{1}))((([0-9a-wy-zA-WY-Z]{1})([0-9a-zA-Z]{2}))|([xX]{3})|)/g;
    return bicRegex.test(bic);
}