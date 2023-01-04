import React, { useEffect, useState } from "react";

const useForceUpdate = () => {
    const [value, setValue] = useState(false)
    return () => setValue(!value)
}

const ImageList = (props) => {

    const [refresh, setRefresh] = useState(false)
    const [images, setImages] = useState([])
    
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        // console.log(props.files)
        forceUpdate()
        setImages(props.files)
    }, [props]) 
    return (
        <div>
            <label className="font-weight-bold w-100 text-dark rounded">Image</label>
            {
                images.map((file, index) => {
                    return <img key={index} alt={file.name} role="presentation" src={file.objectURL} width={250} />
                })
            } 
        </div>
    )
}

export default ImageList