

export default function ImageView({ imagePath, ariaLabel, caption, displayType="none"}) {

        const image = imagePath ? imagePath : "https://via.placeholder.com/404";
        const alt = ariaLabel ? ariaLabel : (caption ? caption : "Image");
        const display = "object-" + displayType;
        return (
                <div>
                        <img className={display + " m-auto w-10/12"} src={image} aria-label={alt} />
                        {caption? <p style={{textAlign: 'center'}}>{caption}</p> : null}
                </div>
        )
}