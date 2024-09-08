import React from "react";
import Landing from "../components/Landing";
import Featured from "../components/Featured";
import Highlights from "../components/Highlights";
import Discounted from "../components/Discounted";
import Explore from "../components/Explore";

const Home = () => {
    return (
        <>
            <Landing />
            <Highlights />
            <Featured />
            <Discounted />
            <Explore />
        </>
    );
};

export default Home;
