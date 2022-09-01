import React from "react";
import { Thread } from "../features/thread/Thread";
import { HomePage } from "../features/homepage/HomePage"

function Home() {
    return (
        <div>
            <h1>Reddit Homepage</h1>
            <HomePage/>
        </div>
    );
}

export default Home;