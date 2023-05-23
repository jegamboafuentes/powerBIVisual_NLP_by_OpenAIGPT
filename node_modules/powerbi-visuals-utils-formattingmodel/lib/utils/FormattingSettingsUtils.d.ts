import powerbi from "powerbi-visuals-api";
import { SimpleSlice } from "../FormattingSettingsComponents";
import visuals = powerbi.visuals;
/**
 * Build and return formatting descriptor for simple slice
 *
 * @param objectName Object name from capabilities
 * @param slice formatting simple slice
 * @returns simple slice formatting descriptor
 */
export declare function getDescriptor(objectName: string, slice: SimpleSlice): visuals.FormattingDescriptor;
/**
 * Get property value from dataview objects if exists
 * Else return the default value from formatting settings object
 *
 * @param value dataview object value
 * @param defaultValue formatting settings default value
 * @returns formatting property value
 */
export declare function getPropertyValue(slice: SimpleSlice, value: any, defaultValue: any): any;
