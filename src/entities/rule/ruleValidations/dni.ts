import { InternalError } from "../../internalError";
import { InputValue, Validate } from "../interface";

/**
 * Validate a Chilean RUT (Rol Único Tributario) number.
 * 
 * @param rut - The RUT number to validate.
 * @returns True if the RUT number is valid, false otherwise.
 */
export const dni: Validate = (rut: InputValue, ruleValue?: string): boolean | InternalError => {
    
    // Check if the RUT number is a string
    if (typeof rut !== "string") {
        return false;
    }
    
    // Remove formatting 
    const cleanRUT = rut.replace(/[^0-9kK]/gi, '');
  
    // Extract RUT number and check digit
    const rutNumber = parseInt(cleanRUT.slice(0, -1), 10);
    const checkDigit = cleanRUT.slice(-1).toUpperCase();
  
    // Calculate the expected check digit
    let sum = 0;
    let multiplier = 2;
    for (let i = rutNumber.toString().length - 1; i >= 0; i--) {
      sum += parseInt(rutNumber.toString()[i], 10) * multiplier;
      multiplier = (multiplier === 7) ? 2 : multiplier + 1; 
    }
    const calculatedCheckDigit = (11 - sum % 11).toString();
  
    // Handle special case for check digit 'K'
    const validCheckDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'K'];
  
    // Compare and return validation result
    return validCheckDigits.includes(calculatedCheckDigit) && calculatedCheckDigit === checkDigit;
  }