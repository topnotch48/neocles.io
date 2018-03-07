
export const fetchMessageFromError = (error: any) => {
    if (error && error.status && error.statusText)
        return `${error.status} ${error.statusText}`;
    if (error && error.message)
        return error.message;

    const body = JSON.stringify(error);
    return body;
}