export function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                resolve(result.split(',')[1]);
            } else {
                reject(new Error("Unexpected result type"));
            }
        };

        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
    });
}