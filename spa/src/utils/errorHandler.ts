export function handleError(error: unknown, context?: string): void {
    const errorMessage = extractErrorMessage(error);

    console.error(`[${context || 'App'} Error]:`, errorMessage);

    alert(`Error occurred: ${context ? ' in ' + context : ''}: ${errorMessage}`);
}

function extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Unknown error occurred.';
}