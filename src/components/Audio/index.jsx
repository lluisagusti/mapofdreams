import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const Audio = ({ imPlaying, imPausing }) => {
  
    return (<>
        <AudioPlayer
        autoPlay
        src="https://github.com/lluisagusti/files/raw/5e9deffbe3be974ca9dc3eb69acaa72cecaf54de/torroella-montgri-history.mp3"
        onPlay={imPlaying}
        onPause={imPausing}
      />
      </>
    );
  };
  
  export default Audio;