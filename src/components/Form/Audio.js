import { useState } from "react";

const Audio = ({ handleClosePopup }) => {
  const [AudioType, setAudioType] = useState("no");
  const [audio, setAudio] = useState("no");
  const [voice, setVoice] = useState("no");
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null); // URL for the audio preview

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioURL(URL.createObjectURL(file)); // Create a URL for the uploaded file
  };

  const handleListen = () => {
    // Logic to generate TTS audio or use the uploaded file
    if (AudioType === "yes") {
      // Generate the TTS audio (this is just a placeholder)
      // In a real application, you'd generate or fetch the TTS audio file here
      setAudioURL("path/to/generated/tts-audio.mp3");
    } else if (audioFile) {
      setAudioURL(URL.createObjectURL(audioFile));
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Create Audio</h3>
        <form>
          <label style={{ maxWidth: "90px" }}>
            Audio Type:<span className="star">*</span>
          </label>
          <div className="flow-radio">
            <input
              type="radio"
              className="blue-radio"
              name="flowType"
              value="yes"
              checked={AudioType === "yes"}
              onChange={(e) => setAudioType(e.target.value)}
            />
            <div
              style={{
                width: "180px",
                position: "relative",
              }}
            >
              <span>Text to speech</span>
            </div>
            <input
              type="radio"
              className="blue-radio"
              name="flowType"
              value="no"
              checked={AudioType === "no"}
              onChange={(e) => setAudioType(e.target.value)}
            />
            <div
              style={{
                width: "180px",
                position: "relative",
              }}
            >
              <span>upload</span>
            </div>
          </div>
          {AudioType === "yes" ? (
            <>
              <label>
                Audio name:<span className="star">*</span>
              </label>
              <input type="text" placeholder="Enter new name" />
              <label>
                Audio Type:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                value={audio}
                onChange={(e) => setAudio(e.target.value)}
              >
                <option value="">Select ...</option>
                {[...Array(10)]
                  .map((_, i) => i + 1)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
              </select>

              <label>
                Voice:<span className="star">*</span>
              </label>
              <select
                className="input-select"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
              >
                <option value="">select...</option>
                {[...Array(10)]
                  .map((_, i) => i + 1)
                  .map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
              </select>
              <label>
                Message Text:<span className="star">*</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter description"
                rows="5"
                cols="40"
              />
            </>
          ) : (
            <div>
              <label>
                Audio name:<span className="star">*</span>
              </label>
              <input type="text" placeholder="Enter new name" />
              <label>
                Upload Audio File:<span className="star">*</span>
              </label>
              <input type="file" accept="audio/*" onChange={handleFileChange} />
              {audioFile && <p>Selected file: {audioFile.name}</p>}
            </div>
          )}
          <div style={{ display: "flex" }}>
            <button type="button" onClick={handleListen} className="add-popup-btn">
              Listen
            </button>
            {audioURL && (
              <audio controls src={audioURL}>
                Your browser does not support the audio element.
              </audio>
            )}
            <button type="submit" className="add-popup-btn">
              Save
            </button>
            <button
              type="button"
              onClick={handleClosePopup}
              className="close-popup-btn"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Audio;
