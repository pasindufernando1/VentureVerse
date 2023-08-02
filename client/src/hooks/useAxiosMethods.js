import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useAxiosMethods = () => {

    const axiosPrivate = useAxiosPrivate();

    const get = (url, setResponse) => {

        let isMounted = true;
        const controller = new AbortController();

        const getRecord = async () => {
            try {
                const response = await axiosPrivate.get(url, {
                    signal: controller.signal,
                });
                isMounted && setResponse(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        getRecord().then();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }

    const post = (url, data, setResponse) => {

            let isMounted = true;
            const controller = new AbortController();

            const postRecord = async () => {
                try {
                    const response = await axiosPrivate.post(url, data, {
                        signal: controller.signal,
                    });
                    isMounted && setResponse(response.data);
                } catch (err) {
                    console.log(err);
                }
            }

            postRecord().then();

            return () => {
                isMounted = false;
                controller.abort();
            }

    }

    const put = (url, data, setResponse) => {

        let isMounted = true;
        const controller = new AbortController();

        const putRecord = async () => {
            try {
                const response = await axiosPrivate.put(url, data, {
                    signal: controller.signal,
                });
                isMounted && setResponse(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        putRecord().then();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }

    const del = (url, setResponse) => {

            let isMounted = true;
            const controller = new AbortController();

            const deleteRecord = async () => {
                try {
                    const response = await axiosPrivate.delete(url, {
                        signal: controller.signal,
                    });
                    isMounted && setResponse(response.data);
                } catch (err) {
                    console.log(err);
                }
            }

            deleteRecord().then();

            return () => {
                isMounted = false;
                controller.abort();
            }
    }

    return { get, post, put, del };

}

export default useAxiosMethods;