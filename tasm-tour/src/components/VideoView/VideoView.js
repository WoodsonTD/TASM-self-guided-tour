import ImageView from "../ImageView/ImageView";

export default function VideoView({ videoPath, ariaLabel, caption, displayType = "none" }) {

  if (!videoPath) return ImageView({ imagePath: "https://via.placeholder.com/404", ariaLabel, caption, displayType });

  const alt = ariaLabel ? ariaLabel : (caption ? caption : "Image");
  const display = "object-" + displayType;
  return (
    <div>
      <iframe
        className={display + " md:w-2/3  m-auto"}
        style={{ height: '500px' }}
        allowfullscreen="true"
        src={videoPath}
        aria-label={alt}
        title={alt} />
      {caption ? <p style={{ textAlign: 'center' }}>{caption}</p> : null}
    </div>
  );
}