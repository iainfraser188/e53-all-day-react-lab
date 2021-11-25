import React from "react";
import Story from "./Story";

const StoryList = ({stories}) => {

    const storyNodes = stories.map((story,index) => {
        return(
            <Story story={story} key={index}/>
        )
    })
    return(
        <ol>
            {storyNodes}
        </ol>
    )
}

export default StoryList;