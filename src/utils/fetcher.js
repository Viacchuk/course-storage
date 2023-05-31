module.exports = async function fetcher(to, method = "GET", props = {}) {
    const fetch = (await import("node-fetch")).default;
    class HTTPError extends Error {
        constructor(message, status) {
            super(message);
            this.status = status;
        }
    }

    const res = await fetch(to, {
        method,
        ...props,
    });

    if (!res.ok) {
        let errorMessage;
        try {
            errorMessage = await res.text();
            try {
                errorMessage = JSON.parse(errorMessage);
            } catch (e) {
                //    ignore
            }
        } catch (e) {
            errorMessage = "Unknown";
        }
        throw new HTTPError(JSON.stringify(errorMessage), res.status || 500);
    }

    let parsed;

    if (props.responseType === "blob") {
        parsed = await res.blob();
    } else {
        parsed = await res.text();
        try {
            parsed = JSON.parse(parsed);
        } catch (e) {
            //    ignore
        }
    }
    return parsed;
};
