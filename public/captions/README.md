# Video Captions Directory

This directory contains WebVTT (.vtt) caption files for the Welcome Video Overlay.

## Caption File Requirements

### Format
- **File Extension**: `.vtt` (WebVTT format)
- **Encoding**: UTF-8
- **Language Code**: Include language code in filename (e.g., `welcome-video-en.vtt`)

### WebVTT Structure
```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to PDL Rentals, where quality affordable housing meets fresh starts.

00:00:05.000 --> 00:00:10.000
For over 11 years, we've been serving families in Wichita and Augusta.

00:00:10.000 --> 00:00:15.000
Our communities provide safe, comfortable homes where residents can thrive.
```

## Accessibility Guidelines

### Content Requirements
- Provide accurate transcription of all spoken content
- Include speaker identification when multiple speakers
- Describe important non-speech audio (music, sound effects)
- Use proper punctuation and formatting
- Maintain reading speed of approximately 160-180 words per minute

### Timing Guidelines
- Ensure captions appear with sufficient duration for reading
- Avoid captions shorter than 1 second or longer than 6 seconds
- Provide adequate time between caption changes
- Sync accurately with audio content

### Formatting Standards
- Use title case for proper nouns
- Include punctuation for clarity
- Use brackets for sound descriptions: [upbeat music]
- Use parentheses for speaker identification: (Narrator)
- Use italics for emphasis or off-screen speech

## Multi-Language Support

### File Naming Convention
```
welcome-video-en.vtt    # English
welcome-video-es.vtt    # Spanish
welcome-video-fr.vtt    # French
```

### Language Detection
The component automatically detects the user's preferred language and loads the appropriate caption file.

## Quality Assurance

### Testing Checklist
- [ ] Captions sync accurately with audio
- [ ] Text is readable and appropriately timed
- [ ] All speech content is transcribed
- [ ] Important audio cues are described
- [ ] File loads correctly in all major browsers
- [ ] Character encoding is UTF-8
- [ ] File size is optimized (typically under 5KB)

## Sample Caption File

```vtt
WEBVTT

NOTE
Welcome video captions for PDL Rentals
Duration: 45 seconds

00:00:00.000 --> 00:00:03.500
Welcome to PDL Rentals.

00:00:03.500 --> 00:00:07.000
Where quality affordable housing meets fresh starts.

00:00:07.000 --> 00:00:11.000
For over 11 years, we've been proudly serving families

00:00:11.000 --> 00:00:14.000
in Wichita and Augusta, Kansas.

00:00:14.500 --> 00:00:18.000
Our communities provide safe, comfortable homes

00:00:18.000 --> 00:00:21.500
where residents can thrive and build their futures.

00:00:22.000 --> 00:00:25.500
From historic districts to modern developments,

00:00:25.500 --> 00:00:29.000
we offer diverse housing options for every family.

00:00:29.500 --> 00:00:33.000
Experience the difference of family-owned property management

00:00:33.000 --> 00:00:36.500
with responsive maintenance and community support.

00:00:37.000 --> 00:00:40.500
Ready to find your new home? Explore our available properties

00:00:40.500 --> 00:00:43.000
or contact us to schedule a tour today.

00:00:43.500 --> 00:00:45.000
PDL Rentals. Your fresh start begins here.
```