import React, {useEffect, useState} from 'react';
import StoryList from '../components/StoryList';

const StoriesContainer =()=>{
    const [storyIDs, setStoryIDs] = useState ([]);
    const [storyItems, setStoryItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);



    const getStoryIDs = function() {
        fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
            .then(values => values.json())
            .then(res => res.slice(0,10))
            .then(data => {
                Promise.all(data.map((id) => {
                    return(
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                        .then(res => res.json())
                    )

                }))
                .then(values => setStoryItems(values));
            })
    }

    const search = (event) => {
        for (const items of storyItems) {
            if (items.title.includes(event.target.value)) {
                setSearchItems([...searchItems, items])
            }
        }
    }



    useEffect(() => {
        getStoryIDs();
    }, []);

    return(
        <>
            <h1>Hacker News</h1>
            <StoryList stories={storyItems}/>
            <form onSubmit = {search}><input type = "text" placeholder = "Search..."></input>    
            <button type = "submit">search</button>
            </form>
            <div>
            <StoryList stories={searchItems}/>
            </div>
        </>
    )
}

export default StoriesContainer;