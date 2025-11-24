declare module 'amadeus' {
    export default class Amadeus {
        constructor(config: { clientId: string; clientSecret: string });
        referenceData: any;
        shopping: any;
    }
}
