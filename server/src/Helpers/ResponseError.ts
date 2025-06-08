export default class ResponseError {
    public status: number;
    public error: any;

    constructor(status: number, error: any) {
        this.status = status;
        this.error = error;
    }
}