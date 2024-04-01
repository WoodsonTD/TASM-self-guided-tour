

export default function ImageView({ imagePath, ariaLabel, caption}) {

        const image = imagePath ? imagePath : "https://via.placeholder.com/404";
        const alt = ariaLabel ? ariaLabel : (caption ? caption : "Image");

        return (
                <div>
                        <img className= "object-none m-auto" src={image} aria-label={alt} />
                        {caption? <p style={{textAlign: 'center'}}>{caption}</p> : null}
                </div>
        )
}