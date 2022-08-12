export interface HttpRequestOptions {
    method?: string;
    body?: any;
}

const API = "http://localhost:3004/";

export const httpClient = async (url: string, options?: HttpRequestOptions) => {
    const response = await fetch(API + url, {
        method: options?.method || "GET",
        headers: {
            "Content-Type": "application/json",
        },
        ...(options?.body && { body: JSON.stringify(options.body) }),
    });
    const data = await response.json();

    return data;

};


export const getTasks = async () => {
    const data = await httpClient("tasks");
    return data;
}
