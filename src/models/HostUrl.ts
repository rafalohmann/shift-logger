export const HOST_NAME_DEV: string = "https://jsonplaceholder.typicode.com";
export const HOST_PORT_DEV: number = 3000;
export const HOST_URL_DEV: string = `${HOST_NAME_DEV}:${HOST_PORT_DEV}`;

export const HOST_NAME_PROD: string = "https://jsonplaceholder.typicode.com";
export const HOST_PORT_PROD: number = 80;

let url: string;
if (HOST_PORT_PROD === 80) {
    url = HOST_NAME_PROD;
} else {
    url = `${HOST_NAME_PROD}:${HOST_PORT_PROD}`;
}
export const HOST_URL_PROD = url;