import axios from "axios";

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

client.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem("refresh")
        ) {

            originalRequest._retry = true;

            try {

                const response = await axios.post(
                    "http://127.0.0.1:8000/token/refresh/",
                    {
                        refresh: localStorage.getItem("refresh"),
                    }
                );

                localStorage.setItem(
                    "access",
                    response.data.access
                );

                originalRequest.headers.Authorization =
                    `Bearer ${response.data.access}`;

                return client(originalRequest);

            } catch {

                localStorage.clear();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default client;