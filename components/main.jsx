import React from 'react';
import Banner from "@/components/home/banner/banner";
import Header from "@/components/layout/header";
import Performance from "@/components/home/performance/performance";
import Tour from "../components/home/tour/tour";
import Gallery from "../components/gallery/gallery";
import News from "./news/news";

const Main = () => {
    return (
        <>
            <Banner/>
            <Performance/>
            <Tour/>
            <Gallery/>
        </>
    );
};

export default Main;