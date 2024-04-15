import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import Button from '../ButtonPanel/Button';

export default function ExhibitTitle({ title, bodyText }) {
  const handleTextToSpeech = () => {
    const { speechSynthesis } = window;
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }
    const speech = new SpeechSynthesisUtterance(title + " . . . " + bodyText);
    speechSynthesis.speak(speech);
  };

  return (
    <div className="shadow-lg">
      <h1 className="font-exo2 font-bold text-6xl text-black text-center drop-shadow-[1px_2px_3px_rgba(0,0,0,0.25)]">{title}</h1>
      <Button
        onClick={handleTextToSpeech}
        icon={SpeakerWaveIcon}
        iconProps={{ className: "speakerIcon" }}
        className="speakerbtn"
        ariaLabel="Read text aloud"
      />
    </div>
  );
}
