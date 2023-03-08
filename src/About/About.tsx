import React, { Suspense, useEffect, useState } from "react";
import ErrorBoundary from '../shared/ErrorBoundary';
const PLPComp = React.lazy(() => import("plphost/PLP"));

const About = () => {
    const [textList, setTextList] = useState([]);
    useEffect(() => {
        fetch('https://baconipsum.com/api/?type=all')
        .then(x => x.json())
        .then(y => {
            setTextList(y)
        });
    }, [])
    return (<div className="host-about">
        <p className="heading-text">About Page Data</p>
        <h2>Sample api data host api call</h2>
        {
         textList.map((item: string, index: number) => <p key={index}>{item}</p>)  
        }
        <h2>Sample api data host microfrontend call</h2>
        <p></p>
            <Suspense fallback={<div>Loading PLP ...</div>}>
                <ErrorBoundary>
                    <PLPComp />
                </ErrorBoundary>
            </Suspense>
    </div>);
};

export default About;
