import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any) {
        console.error(error);
        // now behaves the same as default error handler
        // todo provide additional logic of general error handling if needed
    }
}