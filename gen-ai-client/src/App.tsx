import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "./features/Header/header";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/reducers/user/userSlice";
import { getUser } from "./store/selectors";

// import "./App.css";

const queryClient = new QueryClient();

function App() {
    const dispatch = useAppDispatch();
    const userRedux = useAppSelector(getUser);

    useEffect(() => {
        setTimeout(() => {
            dispatch(
                setUser({
                    ...userRedux,
                    uname: "test",
                    email: "test@gmail.com",
                    role: "admin",
                })
            );
        }, 1000);
    }, []);

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Header />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
