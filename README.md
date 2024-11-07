# Text-to-Speech Chrome Extension

A Chrome extension that converts selected text on web pages into natural-sounding speech using OpenAI's Text-to-Speech API.

## Features

- Extract selected text from any webpage
- Convert text to speech using OpenAI's TTS-1 model with the "Nova" voice
- Playback controls:
  - Start reading
  - Pause/Resume
  - Stop
- Visual feedback on button states
- Debug mode for development

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/dynamikapps/blog-reader-extension.git
   ```
2. Add your OpenAI API key in `background.js`:

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the extension directory

## Usage

1. Navigate to any webpage
2. Select the text you want to hear
3. Click the extension icon in your browser toolbar
4. Click "Extract Text" to process the selected text
5. Use the playback controls:
   - "Start Reading" to begin playback
   - "Pause" to temporarily stop
   - "Stop" to end playback completely

## Technical Details

### Project Structure

```

├── background.js # Handles API calls and audio processing
├── content.js # Manages text selection and audio playback
├── popup.js # Controls UI interactions
├── popup.html # Extension popup interface
├── manifest.json # Extension configuration
└── .gitignore # Git ignore rules

```

### Components

- **Background Script**: Manages OpenAI API communication and audio processing
- **Content Script**: Handles webpage interaction and audio playback
- **Popup**: Provides user interface and controls

### API Integration

Uses OpenAI's Text-to-Speech API with:

- Model: TTS-1
- Voice: Nova
- Response format: Audio blob converted to base64

## Development

### Prerequisites

- Chrome browser
- OpenAI API key
- Basic understanding of Chrome extension development

### Debug Mode

The extension includes debug logging that can be enabled/disabled by setting:

```javascript
const DEBUG = true;
```

in the respective JavaScript files.

### Security Notes

- Never commit your API key to version control
- Use environment variables for sensitive data
- Follow the `.gitignore` configuration provided

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

## Support

For issues and feature requests, please:

- Create an issue in the [GitHub repository](https://github.com/dynamikapps/blog-reader-extension)
- Contact us at handy@dynamikapps.com
