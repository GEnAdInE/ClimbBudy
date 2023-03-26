export abstract class AbstractData {
    keysToIgnore: string[] = [];


    /**
     * Constructor. Does nothing except add the "keysToIgnore" to the keysToIgnore array.
     * @protected
     */
    protected constructor() {
        this.keysToIgnore.push('keysToIgnore');
    }


    /**
     * Returns a copy of the object without the keysToIgnore keys.
     * Used to send data to the database.
     */
    getCleanDataObject(): any {

        // Create a copy of the object without the keysToIgnore
        const copy = {};

        // Iterate over the keys of the object
        for (const key in this) {
            // If the key is not in the keysToIgnore
            if (this[key] !== null && this[key] !== undefined && this[key] !== '' && !this.keysToIgnore.includes(key)) {
                // Add it to the copy
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                copy[key] = this[key];
            }
        }

        return copy;
    }
}