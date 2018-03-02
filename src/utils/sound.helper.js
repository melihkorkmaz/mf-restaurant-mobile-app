import Sound from 'react-native-sound';
import { Vibration } from 'react-native'

const SoundHelper = {
    tone : {},
    init : () => {
        SoundHelper.tone = new Sound('tone.mp3', Sound.MAIN_BUNDLE, (error) => { });
    },

    play : (callback) => {
        // Vibration.vibrate([1000, 500], true);
        SoundHelper.tone.setNumberOfLoops(-1);
        SoundHelper.tone.play((success) => {
            if (!success) 
                SoundHelper.reset();
            if(callback)
                callback();
        });
    },

    stop : (callback) => {
        SoundHelper.tone.stop(() => {
            // Vibration.cancel();

            if(callback)
                callback();
        });
    },

    reset : () => {
        SoundHelper.tone.reset();
    }
}

export default SoundHelper;